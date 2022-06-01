import { readGlobalState } from '@controllers/AlgorandController'

import algosdk from 'algosdk'
import { countDecimals } from '@common/functions'

export const handleMintPriceController = async (
    contractAdress: string,
    provider: algosdk.Algodv2,
    salesBehavior: ISalesBehavior,
    mintPrice: string
): Promise<string> => {

    if (salesBehavior.type == 'dutch_mint') {
        const appInfo = await provider.getApplicationByID(Number.parseInt(contractAdress)).do()
        const globalState = await readGlobalState(provider, appInfo.id)
        const price = globalState['MP'] as number
        if (price) {
            const micro = algosdk.microalgosToAlgos(price)
            mintPrice = micro.toFixed(countDecimals(micro))
        }
    }

    return mintPrice
}
