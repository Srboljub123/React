import algosdk from 'algosdk'

import { configAndTransferAsset, withdrawAsset } from '@controllers/AlgorandController/Public/handleInteractApplication'
import AlgorandNetwork from '@providers/AlgorandNetwork'

export const handleWithdrawController = async (
    assetInfo: IMetadataProperties[],
    provider: AlgorandNetwork,
    contractAddress: string,
    assetPosition: number,
    setShouldWarning: React.Dispatch<React.SetStateAction<boolean>>,
    setWarningMessage: React.Dispatch<React.SetStateAction<string>>,
): Promise<void> => {
    const algodv2 = provider.getDefaultProvider()
    await provider.connect()
    const currentAsset = assetInfo[assetPosition]
    const assetId = currentAsset['asset-index']
    const assetInfoAs = await algodv2.getAssetByID(assetId!).do()
    const accounts = await provider.getCurrentAccount()

    // const currentAssetMetadata = currentAsset.data as IMetadataProperties
    const myAccount = algosdk.mnemonicToSecretKey(
        'cream view park erase payment fatigue glass eyebrow february kick body canoe screen once random faculty innocent cheese wealth brand flight benefit zoo able power',
    )
    try {
        await withdrawAsset(provider, myAccount, assetInfoAs, Number.parseInt(contractAddress))
    } catch (error) {
        console.log(error)
        setWarningMessage('Transaction not concluded. Try again.')
        setShouldWarning(true)
    }
    await configAndTransferAsset(provider, myAccount, assetInfoAs, currentAsset, accounts[0])
}
