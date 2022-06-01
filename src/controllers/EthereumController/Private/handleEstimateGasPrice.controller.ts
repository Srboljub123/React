import { wallet_errors } from '@common/constants'
import * as constants from '@common/constants'
import EthereumNetwork from '@providers/EthereumNetwork'
import { handleMintAllowedController } from '@controllers/EthereumController/Public/handleMintAllowed.controller'

const SINGLE_TICKET_GAS_MARGIN = 200000
const MULTIPLE_TICKETS_GAS_MARGIN = 400000

const handleEstimateGasPriceController = async (
    contractAdress: string,
    contract: IContract,
    initMintPrice: string,
    provider: EthereumNetwork,
    setSuggestedGasFees: React.Dispatch<React.SetStateAction<string>>,
    selectedOption: number,
    setLoadingMessage: React.Dispatch<React.SetStateAction<string>>,
    setShouldWarning: React.Dispatch<React.SetStateAction<boolean>>,
    setWarningMessage: React.Dispatch<React.SetStateAction<string>>,
): Promise<void> => {
    const web3 = provider.getCurrentProvider()
    const accounts = await provider.getCurrentAccount()
    const selectedAddress = accounts[0]
    const Ticket = new web3.eth.Contract(contract.abi as IAbiItem[], contractAdress)
    const gasPrice = await web3.eth.getGasPrice()
    console.log('gasPrice', gasPrice)

    try {
        if (selectedOption === 1) {
            const gasAmount = await Ticket.methods.safeMint(selectedAddress).estimateGas({
                from: selectedAddress,
                value: web3.utils.toWei(`${initMintPrice}`, 'ether'),
            })
            setSuggestedGasFees(
                (
                    (gasAmount + SINGLE_TICKET_GAS_MARGIN) *
                    (Number.parseFloat(web3.utils.fromWei(gasPrice, 'ether')) * __PLUS_TWENTY_PERCENT__)
                ).toFixed(__EIGHT_DIGITS__),
            )
        } else {
            const gasAmount = await Ticket.methods['safeBatchMint'](selectedAddress, selectedOption).estimateGas({
                from: selectedAddress,
                value: web3.utils.toWei(
                    `${(Number.parseFloat(initMintPrice) * selectedOption).toFixed(
                        constants.fraction_digits.ETHEREUM,
                    )}`,
                    'ether',
                ),
            })
            setSuggestedGasFees(
                (
                    (gasAmount + MULTIPLE_TICKETS_GAS_MARGIN * selectedOption) *
                    Number.parseFloat(web3.utils.fromWei(gasPrice, 'ether')) *
                    __PLUS_TWENTY_PERCENT__
                ).toFixed(__EIGHT_DIGITS__),
            )
        }
    } catch (error: any) {
        console.log('Error:', error)
        // specific error messages must be handled here and at Metamask.view and might be translated with i18n
        if (error.message.includes(wallet_errors.NOT_MINED)) {
            setLoadingMessage('Not mined')
        } else if (error.message.includes(wallet_errors.TRANSACTION_REJECTED)) {
            setLoadingMessage('Transaction rejected')
            // setOnMintGasFees('0')
        } else if (error.message.includes(wallet_errors.NOT_ENOUGH_BALANCE)) {
            setLoadingMessage('Not enough balance')
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
        }
    }
}

export default handleEstimateGasPriceController
