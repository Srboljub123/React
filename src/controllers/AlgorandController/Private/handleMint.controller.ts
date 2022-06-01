import { wallet_errors } from '@common/constants'
import { handleAssetInfoController } from '@controllers/AlgorandController'
import { safeBatchMint, safeMint } from '@controllers/AlgorandController/Public/handleInteractApplication'
import AlgorandNetwork from '@providers/AlgorandNetwork'

const SINGLE_TICKET_GAS_MARGIN = 1000000
const hasEnoughBalance = (balance: string, mintPrice: string, suggestedGasFees: string) => {
    return Number(balance) > Number(mintPrice) / SINGLE_TICKET_GAS_MARGIN + Number(suggestedGasFees)
}

const handleMintController = async (
    balance: string,
    mintPrice: string,
    suggestedGasFees: string,
    contractAddress: string,
    selectedOption: number,
    provider: AlgorandNetwork,
    handleMintResults: (mintResult: Record<string, unknown>[]) => void,
    handleMetadataResults: (metadataResult: IMetadataProperties[]) => void,
    setLoadingMessage: React.Dispatch<React.SetStateAction<string>>,
    setShouldWarning: React.Dispatch<React.SetStateAction<boolean>>,
    setWarningMessage: React.Dispatch<React.SetStateAction<string>>,
): Promise<boolean> => {
    const accounts = await provider.getCurrentAccount()
    setLoadingMessage('Confirming payment...')
    setWarningMessage('Confirming payment...')
    if (!hasEnoughBalance(balance, mintPrice, suggestedGasFees)) {
        setLoadingMessage(`You don't have enough funds`)
        return false
    }
    let isMinted = false
    let safeMintResult: TAssetInfoResult[] = []
    handleMintResults(safeMintResult)

    try {
        if (selectedOption === 1) {
            //SM: safeMint
            console.log('safeMint')
            safeMintResult = await safeMint(
                provider,
                accounts[0],
                Number.parseInt(contractAddress),
                Number.parseFloat(mintPrice),
                setWarningMessage,
            )
        } else {
            //SM: safeBatchMint
            console.log('safeBatchMint')
            safeMintResult = await safeBatchMint(
                provider,
                accounts[0],
                Number.parseInt(contractAddress),
                Number.parseInt(mintPrice),
                selectedOption,
            )
        }

        handleMintResults(safeMintResult)

        if (safeMintResult.length > 0) {
            const assetInfoResult = await handleAssetInfoController(safeMintResult, provider, contractAddress)
            assetInfoResult && handleMetadataResults(assetInfoResult)
            isMinted = true
        }
    } catch (error: any) {
        console.log('Error:', error)
        if (error.message.includes(wallet_errors.USER_REJECTED)) {
            setWarningMessage('User rejected the transaction')
            setShouldWarning(true)
            // setOnMintGasFees('0')
        } else if (error.message.includes(wallet_errors.BALANCE_BELOW_MIN)) {
            setWarningMessage(`Balance ${error.message.split('balance')[1]}`)
            setShouldWarning(true)
            // setOnMintGasFees('0')
        } else if (error.message.includes(wallet_errors.ASSERT_MINT)) {
            // const { maxMintPerAddress, mintAllowed } = await handleMintAllowedController(
            //     contract,
            //     contractAdress,
            //     provider,
            // )
            setWarningMessage(`You have minted 10 out of the maximum 10 NFTs`)
            setShouldWarning(true)
            // setOnMintGasFees('0')
        } else if (error.message.includes(wallet_errors.NOT_ENOUGH_BALANCE_ALGO)) {
            setWarningMessage(`Not enough funds to mint`)
            setShouldWarning(true)
        } else {
            setWarningMessage('An error occurred. Please, try again')
            setShouldWarning(true)
        }
    }

    return isMinted
}

export default handleMintController
