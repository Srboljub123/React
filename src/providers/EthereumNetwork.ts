import * as ls from 'local-storage'
import WalletLink, { WalletLinkProvider } from 'walletlink'
import Web3 from 'web3'
//import { HttpProvider } from 'web3-core'

import configs from '@common/configs'
import * as constants from '@common/constants'
import { local_storage_key } from '@common/constants'
import WalletConnectProvider from '@walletconnect/web3-provider'

const { general } = configs
class EthereumNetwork {
    private readonly provider: Web3
    //private readonly walletInjectedProvider: HttpProvider | undefined
    private readonly walletConnectProvider: WalletConnectProvider | undefined
    private readonly walletLinkProvider: WalletLinkProvider | undefined
    private readonly wallet: string
    private accounts: string[]

    public constructor(config: IEthereumNet, walletType?: string) {
        walletType ? (this.wallet = walletType) : (this.wallet = '')
        this.accounts = []
        switch (walletType) {
            case 'metamask': {
                if (window.ethereum && window.ethereum.isMetaMask) this.provider = new Web3(Web3.givenProvider)
                else {
                    this.provider = new Web3(new Web3.providers.HttpProvider(config.provider_param.url))
                    this.wallet = ''
                }
                console.log('this.wallet', this.wallet)
                console.log('Web3.givenProvider', Web3.providers)

                break
            }
            case 'walletconnect': {
                console.log('config.provider_param', config.provider_param)
                this.walletConnectProvider = new WalletConnectProvider({
                    infuraId: config.provider_param.infuraId,
                    rpc: config.provider_param.rpc,
                })

                this.walletConnectProvider.on('disconnect', (code: number, reason: string) => {
                    console.log(code, reason)
                    ls.set(constants.local_storage_key.KEY_CONNECTED, 0)
                })

                this.walletConnectProvider.on('error', (code: number, data: unknown) => {
                    console.log(code, data)
                })

                this.provider = new Web3(<any>this.walletConnectProvider)
                break
            }
            case 'coinbase': {
                // Initialize WalletLink
                const walletProvider = new WalletLink({
                    appName: general.appName,
                    appLogoUrl: general.appLogoUrl,
                    // eslint-disable-next-line @typescript-eslint/naming-convention
                    darkMode: false,
                })

                // Initialize a Web3 Provider object
                this.walletLinkProvider = walletProvider.makeWeb3Provider(config.provider_param.url, config.chain_id)
                this.provider = new Web3(<any>this.walletLinkProvider)
                break
            }
            default: {
                this.provider = new Web3(new Web3.providers.HttpProvider(config.provider_param.url))
                break
            }
        }
    }

    public getCurrentProvider(): Web3 {
        return this.provider
    }

    public getCurrentWallet(): string {
        return this.wallet
    }

    public async getCurrentAccount(): Promise<string[]> {
        const ls_wallet_type = this.getCurrentWallet()

        if (ls_wallet_type === null) return []

        switch (ls_wallet_type) {
            case 'metamask': {
                this.accounts = (await window.ethereum!.request({ method: 'eth_requestAccounts' })) as string[]
                return this.accounts
            }
            case 'walletconnect': {
                this.accounts = await this.provider.eth.getAccounts()
                return this.accounts
            }
            case 'coinbase': {
                this.accounts = await this.provider.eth.getAccounts()
                return this.accounts
            }
            default: {
                return []
            }
        }
    }

    public async connect(): Promise<boolean> {
        const ls_wallet_type = this.getCurrentWallet()
        switch (ls_wallet_type) {
            case 'metamask': {
                // eslint-disable-next-line no-constant-condition
                while (true) {
                    try {
                        const accounts = (await window.ethereum!.request({ method: 'eth_accounts' })) as string[]
                        // console.log('accounts', accounts)
                        if (accounts.length > 0) {
                            return accounts.length > 0
                        }
                    } catch (error: any) {
                        console.log('error.code:', error.code)
                    }
                }
            }
            case 'walletconnect': {
                if (this.walletConnectProvider instanceof WalletConnectProvider) {
                    const result = await this.walletConnectProvider.enable()
                    this.accounts = result
                    console.log('result:', result)
                    //await this.getCurrentChainId(result.chainId)

                    return result.length > 0
                }
                return false
            }
            case 'coinbase': {
                const result = await this.walletLinkProvider?.send('eth_requestAccounts')
                this.accounts = result
                console.log('result:', result)
                return result.length > 0
            }
            default: {
                return false
            }
        }
    }

    public async disconnect(): Promise<void> {
        ls.set(local_storage_key.KEY_CONNECTED, 0)
        const ls_wallet_type = this.getCurrentWallet()

        switch (ls_wallet_type) {
            case 'metamask': {
                //this.provider.eth.clearSubscriptions(_error => {})
                //await window.ethereum.close()
                break
            }
            case 'walletconnect': {
                if (this.walletConnectProvider instanceof WalletConnectProvider) {
                    await this.walletConnectProvider.disconnect()
                }
                break
            }
            case 'coinbase': {
                this.walletLinkProvider?.disconnect()
                break
            }
            default: {
                break
            }
        }
    }

    public async getCurrentChainId(chainId: number): Promise<void> {
        if (this.provider.givenProvider.chainId !== chainId) {
            await window.ethereum!.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: '0x' + chainId.toString(__RADIX_16__) }], // chainId must be in hexadecimal numbers
            })
        }
    }
}

export default EthereumNetwork
