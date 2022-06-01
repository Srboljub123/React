import * as constants from '@common/constants'
import { wallet_errors } from '@common/constants'
import { handleMintAllowedController } from '@controllers/EthereumController/Public/handleMintAllowed.controller'
import EthereumNetwork from '@providers/EthereumNetwork'

import { handleAssetInfoController } from '../Public/handleAssetInfoController'

const SAFE_MINT_GAS_MARGIN = 200000
const SAFE_BATCH_MINT_MARGIN = 400000

const handleMintController = async (
    contractAdress: string,
    mintPrice: string,
    contract: IContract,
    selectedOption: number,
    provider: EthereumNetwork,
    handleMetadataResults: (metadataResult: IMetadataProperties[]) => void,
    handleMintResults: (mintResult: Record<string, unknown>) => void,
    setOnMintGasFees: React.Dispatch<React.SetStateAction<string>>,
    setTransactionHash: React.Dispatch<React.SetStateAction<string>>,
    setShouldWarning: React.Dispatch<React.SetStateAction<boolean>>,
    setWarningMessage: React.Dispatch<React.SetStateAction<string>>,
): Promise<boolean> => {
    //await provider.getCurrentChainId((config.networks[network] as IEthereum)[blockchain])
    const web3 = provider.getCurrentProvider()
    const accounts = await provider.getCurrentAccount()
    const selectedAddress = accounts[0]

    const Ticket = new web3.eth.Contract(contract.abi as IAbiItem[], contractAdress)

    const gasPrice = await web3.eth.getGasPrice()
    let resultMint
    try {
        if (selectedOption === 1) {
            console.log('safeMint')

            const gasAmount = await Ticket.methods
                .safeMint(selectedAddress)
                .estimateGas({ from: accounts[0], value: web3.utils.toWei(`${mintPrice}`, 'ether') })

            setWarningMessage('Confirming payment...')
            console.log(
                'onMintGasFees',
                ((gasAmount + SAFE_MINT_GAS_MARGIN) * (Number(gasPrice) * __PLUS_TWENTY_PERCENT__)).toFixed(0),
            )
            setOnMintGasFees(
                web3.utils.fromWei(
                    ((gasAmount + SAFE_MINT_GAS_MARGIN) * (Number(gasPrice) * __PLUS_TWENTY_PERCENT__)).toFixed(0),
                    'ether',
                ),
            )
            let oneMinuteTimeout: NodeJS.Timeout
            //SM: safeMint
            resultMint = await Ticket.methods['safeMint'](selectedAddress)
                .send({
                    from: selectedAddress, // user wallet
                    value: web3.utils.toWei(`${mintPrice}`, 'ether'), // mint price (nft price)
                    gas: gasAmount + SAFE_MINT_GAS_MARGIN, // gas amount estimated to complete the transaction with a margin of 200000
                    gasPrice: (Number(gasPrice) * __PLUS_TWENTY_PERCENT__).toFixed(0), // current gas price
                    // nonce: 123,
                })
                .on('transactionHash', (hash: string) => {
                    console.log('Current transaction hash:', hash)
                    setTransactionHash(hash)
                    setWarningMessage('Transaction sent')
                    oneMinuteTimeout = setTimeout(() => {
                        setWarningMessage('Transaction pending')
                    }, __ONE_MINUTE__)
                })
                .on('receipt', async (receipt: Record<string, unknown>) => {
                    handleMintResults(receipt)
                    setWarningMessage('Transfering your NFTs...')
                    const assetInfo = await handleAssetInfoController(receipt, Ticket)
                    console.log('receipt', receipt)
                    console.log('resultMetadata', assetInfo)
                    handleMetadataResults(assetInfo)
                    setWarningMessage('Success...')
                    clearTimeout(oneMinuteTimeout)
                })
        } else {
            console.log('safeBatchMint')

            const gasAmount = await Ticket.methods.safeBatchMint(selectedAddress, selectedOption).estimateGas({
                from: accounts[0],
                value: web3.utils.toWei(
                    `${(Number.parseFloat(mintPrice) * selectedOption).toFixed(constants.fraction_digits.ETHEREUM)}`,
                    'ether',
                ),
            })

            setWarningMessage('Confirming payment...')
            setOnMintGasFees(
                ((gasAmount + SAFE_BATCH_MINT_MARGIN) * (Number(gasPrice) * __PLUS_TWENTY_PERCENT__)).toFixed(
                    __EIGHT_DIGITS__,
                ),
            )
            let oneMinuteTimeout: NodeJS.Timeout
            //SM: safeBatchMint
            resultMint = await Ticket.methods['safeBatchMint'](selectedAddress, selectedOption)
                .send({
                    from: selectedAddress,
                    value: web3.utils.toWei(
                        `${(Number.parseFloat(mintPrice) * selectedOption).toFixed(
                            constants.fraction_digits.ETHEREUM,
                        )}`,
                        'ether',
                    ),
                    gas: gasAmount + SAFE_BATCH_MINT_MARGIN * selectedOption,
                    gasPrice: (Number(gasPrice) * __PLUS_TWENTY_PERCENT__).toFixed(0),
                    // nonce: 123,
                })
                .on('transactionHash', (hash: string) => {
                    console.log('Current transaction hash:', hash)
                    setTransactionHash(hash)
                    oneMinuteTimeout = setTimeout(() => {
                        setWarningMessage('Transaction pending')
                    }, __ONE_MINUTE__)
                })
                .on('receipt', async (receipt: Record<string, unknown>) => {
                    handleMintResults(receipt)
                    setWarningMessage('Transfering your NFTs...')
                    const assetInfo = await handleAssetInfoController(receipt, Ticket)
                    console.log('receipt', receipt)
                    console.log('resultMetadata', assetInfo)
                    handleMetadataResults(assetInfo)
                    setWarningMessage('Success...')
                    clearTimeout(oneMinuteTimeout)
                })
        }
    } catch (error: any) {
        console.log('Error:', error)
        // specific error messages must be handled here and at Metamask.view and might be translated with i18n
        if (error.message.includes(wallet_errors.NOT_MINED)) {
            setWarningMessage('Not mined')
            setShouldWarning(true)
        } else if (error.message.includes(wallet_errors.TRANSACTION_REJECTED)) {
            setWarningMessage('Transaction rejected')
            setShouldWarning(true)
            // setOnMintGasFees('0')
        } else if (error.message.includes(wallet_errors.NOT_ENOUGH_BALANCE)) {
            setWarningMessage('Not enough balance')
            setShouldWarning(true)
            // setOnMintGasFees('0')
        } else if (error.message.includes(wallet_errors.MAX_MINT_ALLOWED)) {
            const { maxMintPerAddress, mintAllowed } = await handleMintAllowedController(
                contract,
                contractAdress,
                provider,
            )
            setWarningMessage(`You have minted ${mintAllowed} out of the maximum ${maxMintPerAddress} NFTs`)
            setShouldWarning(true)
            // setOnMintGasFees('0')
        } else {
            setWarningMessage(error.message)
            setShouldWarning(true)
            // setOnMintGasFees('0')
        }
        return false
    }
    return resultMint
}

export default handleMintController
