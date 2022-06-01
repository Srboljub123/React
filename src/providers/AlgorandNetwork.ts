import QRCodeModal from 'algorand-walletconnect-qrcode-modal'
import algosdk from 'algosdk'
import * as ls from 'local-storage'

import * as constants from '@common/constants'
import { camelSentence } from '@controllers/AlgorandController'
import { formatJsonRpcRequest } from '@json-rpc-tools/utils'
import WalletConnectProvider from '@walletconnect/client'

class AlgorandNetwork {
    private readonly provider: algosdk.Algodv2
    private readonly walletConnectProvider: WalletConnectProvider | undefined
    private readonly blockchain: string
    private wallet: string
    private accounts: string[]

    public constructor(config: IAlgorandNet, walletType?: string) {
        this.blockchain = config.name
        this.accounts = []
        walletType ? (this.wallet = walletType) : (this.wallet = '')
        switch (walletType) {
            case 'algosigner': {
                if (window.AlgoSigner)
                    this.provider = new algosdk.Algodv2(
                        config.provider_param.token,
                        config.provider_param.url,
                        config.provider_param.port,
                    )
                else {
                    this.provider = new algosdk.Algodv2(
                        config.provider_param.token,
                        config.provider_param.url,
                        config.provider_param.port,
                    )
                    this.wallet = ''
                }

                break
            }
            case 'walletconnect': {
                this.walletConnectProvider = new WalletConnectProvider({
                    bridge: 'https://bridge.walletconnect.org', // Required
                    qrcodeModal: QRCodeModal,
                })

                this.walletConnectProvider.on('session_update', async (error, payload) => {
                    console.log(`connector.on("session_update")`)

                    if (error) {
                        throw error
                    }

                    this.accounts = payload.params
                })

                this.walletConnectProvider.on('disconnect', (error, payload) => {
                    console.log(error, payload)
                    ls.set(constants.local_storage_key.KEY_CONNECTED, 0)
                })

                this.walletConnectProvider.on('error', (error, payload) => {
                    console.log(error, payload)
                })
                this.provider = new algosdk.Algodv2(
                    config.provider_param.token,
                    config.provider_param.url,
                    config.provider_param.port,
                )
                break
            }
            default: {
                this.provider = new algosdk.Algodv2(
                    config.provider_param.token,
                    config.provider_param.url,
                    config.provider_param.port,
                )
                break
            }
        }
    }

    public getDefaultProvider(): algosdk.Algodv2 {
        return this.provider
    }

    public getCurrentProvider(): algosdk.Algodv2 | WalletConnectProvider {
        return this.walletConnectProvider ? this.walletConnectProvider : this.provider
    }

    public getCurrentWallet(): string {
        return this.wallet
    }

    public async getCurrentAccount(): Promise<string[]> {
        const ls_wallet_type = this.getCurrentWallet()
        console.log('ls_wallet_type', ls_wallet_type)
        if (!ls_wallet_type) return []

        if (ls_wallet_type === 'algosigner') {
            const blockchain_ = camelSentence(this.blockchain)
            const accounts = await window.AlgoSigner.accounts({
                ledger: blockchain_,
            })
            return [accounts[0].address]
        } else if (ls_wallet_type === 'walletconnect') {
            return this.accounts
        }
        return []
    }

    public async connect(): Promise<boolean> {
        const ls_wallet_type = await this.getCurrentWallet()

        switch (ls_wallet_type) {
            case 'algosigner': {
                const blockchain_ = camelSentence(this.blockchain)
                return await window.AlgoSigner.connect({
                    ledger: blockchain_,
                })
            }
            case 'walletconnect': {
                if (this.walletConnectProvider instanceof WalletConnectProvider) {
                    const result = await this.walletConnectProvider.connect()
                    this.accounts = result.accounts
                    return result.accounts.length > 0
                }
                return false
            }
            default: {
                return false
            }
        }
    }

    public async signTransaction(appTxn: algosdk.Transaction[]): Promise<Uint8Array[]> {
        const ls_wallet_type = await this.getCurrentWallet()

        switch (ls_wallet_type) {
            case 'algosigner': {
                const temporaryTxn = []
                const signedTemporaryTxn = []
                for (const element of appTxn) {
                    temporaryTxn.push({ txn: window.AlgoSigner.encoding.msgpackToBase64(element.toByte()) })
                }
                const signedFundTxn = await window.AlgoSigner.signTxn(temporaryTxn)
                for (const element of signedFundTxn) {
                    signedTemporaryTxn.push(window.AlgoSigner.encoding.base64ToMsgpack(element.blob))
                }
                return signedTemporaryTxn
            }
            case 'walletconnect': {
                const txnsToSign: any[] = []
                for (const element of appTxn) {
                    txnsToSign.push({ txn: element, signers: undefined })
                }
                const flatTxns = [txnsToSign].flat()

                const walletTxns: IWalletTransaction[] = flatTxns.map(({ txn }) => ({
                    txn: Buffer.from(algosdk.encodeUnsignedTransaction(txn)).toString('base64'),
                }))
                const requestParameters: SignTxnParameters = [walletTxns]
                const request = formatJsonRpcRequest('algo_signTxn', requestParameters)
                console.log('Raw request:', request)
                const result: Array<string | null> = await (
                    this.getCurrentProvider() as WalletConnectProvider
                ).sendCustomRequest(request)
                console.log('Raw response:', result)
                const indexToGroup = (index: number) => {
                    for (let group = 0; group < [txnsToSign].length; group++) {
                        const groupLength = [txnsToSign][group].length
                        if (index < groupLength) {
                            return [group, index]
                        }

                        index -= groupLength
                    }

                    throw new Error(`Index too large for groups: ${index}`)
                }

                const signedPartialTxns: Array<Array<Uint8Array | null>> = [txnsToSign].map(() => [])
                for (const [index, r] of result.entries()) {
                    const [group, groupIndex] = indexToGroup(index)
                    const toSign = [txnsToSign][group][groupIndex]

                    if (r == null) {
                        if (toSign.signers !== undefined) {
                            signedPartialTxns[group].push(null)
                            continue
                        }
                        throw new Error(`Transaction at index ${index}: was not signed when it should have been`)
                    }

                    if (toSign.signers !== undefined) {
                        throw new Error(`Transaction at index ${index} was signed when it should not have been`)
                    }

                    const rawSignedTxn = Buffer.from(r, 'base64')
                    signedPartialTxns[group].push(new Uint8Array(rawSignedTxn))
                }

                return signedPartialTxns.map((signedPartialTxnsInternal, group) => {
                    return signedPartialTxnsInternal.map((stxn, groupIndex) => {
                        if (stxn) {
                            return stxn
                        }

                        return [txnsToSign][group][groupIndex].txn.signTxn(
                            algosdk.mnemonicToSecretKey(
                                'person congress dragon morning road sweet horror famous bomb engine eager silent home slam civil type melt field dry daring wheel monitor custom above term',
                            ).sk,
                        )
                    })
                })[0]
            }
            default: {
                return []
            }
        }
    }

    public async disconnect(): Promise<void> {
        const ls_wallet_type = this.getCurrentWallet()

        switch (ls_wallet_type) {
            case 'algosigner': {
                break
            }
            case 'walletconnect': {
                if (
                    this.walletConnectProvider instanceof WalletConnectProvider &&
                    this.walletConnectProvider.session.connected
                )
                    await this.walletConnectProvider.killSession()
                break
            }
            default: {
                break
            }
        }
    }
}

export default AlgorandNetwork
