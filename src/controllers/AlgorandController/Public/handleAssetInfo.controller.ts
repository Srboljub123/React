import AlgorandNetwork from '@providers/AlgorandNetwork'
import axios from 'axios'
import { base64Decode, ipfsToHTTP, readGlobalState } from '@controllers/AlgorandController/utils'

export const handleAssetInfoController = async (
    assetInfo: TAssetInfoResult[],
    provider: AlgorandNetwork,
    contractAdress: string,
): Promise<IMetadataProperties[]> => {
    const algodv2 =  provider.getDefaultProvider()
    const assetsMetadatas: IMetadataProperties[] = []
    const appInfo = await algodv2.getApplicationByID(Number.parseInt(contractAdress)).do()
    const globalState = await readGlobalState(algodv2, appInfo.id)
    let metadataURL = globalState['MJH'] as string // string

    for (let i = 2; i < assetInfo.length; i++) {
        const assetId = assetInfo[i]["asset-index"];
        const assetInfoAs = await algodv2.getAssetByID(assetId).do()
        const assetMatch = assetInfoAs['params']['url'].match(/\/(\d+)\.[a-z]+\d/)

        const assetMyPinata = await axios.get(ipfsToHTTP(`${base64Decode(metadataURL)}/${assetMatch[1]}.json`))

        // if(assetResponse.status === 200) {
        //     const currentAssetMetadata = assetResponse.data as IMetadataProperties
        //     console.log('currentAssetMetadata', currentAssetMetadata)
        //     const fixedAssetUrlMetadata: IMetadataProperties = {
        //         ...currentAssetMetadata,
        //         image: ipfsToHTTP(currentAssetMetadata.image),
        //         animation_url: ipfsToHTTP(currentAssetMetadata.animation_url)
        //     }
        //     ipfsToHTTP(currentAssetMetadata.image)
        //     assetsMetadatas.push(fixedAssetUrlMetadata)
        // }
        if(assetMyPinata.status === 200) {
            const currentAssetMetadata = assetMyPinata.data as IMetadataProperties
            console.log('currentAssetMetadata', currentAssetMetadata)
            const fixedAssetUrlMetadata: IMetadataProperties = {
                ...currentAssetMetadata,
                image: ipfsToHTTP(currentAssetMetadata.image),
                animation_url: ipfsToHTTP(currentAssetMetadata.animation_url)
            }
            ipfsToHTTP(currentAssetMetadata.image)
            assetsMetadatas.push(fixedAssetUrlMetadata)
        }
    }

    return assetsMetadatas
}
