import { readGlobalState } from '@controllers/AlgorandController'

import algosdk from 'algosdk'

export interface IHandleRemainedTokenCount {
    tokenIdCounter: number
    totalSupply: number
}
export const handleRemainedTokenCountController = async (
    config: IConfig,
    network: string,
    blockchain: string,
    contractAdress: string[],
    setCurrentContractAddress: React.Dispatch<React.SetStateAction<number>>,
    setIsSoldOut: React.Dispatch<React.SetStateAction<boolean>>,
): Promise<IHandleRemainedTokenCount> => {
    const defaultProvider = (config.networks[network] as IAlgorand)[blockchain].provider_param
    const provider = new algosdk.Algodv2(defaultProvider.token, defaultProvider.url, defaultProvider.port)

    let tokenIdCounter = 0
    let totalSupply = 0
    // this will force to change contract addressess until the last one
    for (let i = 0; i < contractAdress.length; i++) {
        const appInfo = await provider.getApplicationByID(Number.parseInt(contractAdress[i])).do()
        const globalState = await readGlobalState(provider, appInfo.id)

        let total_supply = globalState['TS'] as number // string
        let total_count_key = globalState['TC'] as number // string
        if(total_count_key < total_supply) {
            setCurrentContractAddress(i)
            tokenIdCounter = total_count_key
            totalSupply = total_supply
            break
        } else if (total_count_key === total_supply * contractAdress.length) {
            setIsSoldOut(true)
        }
    }

    return {
        tokenIdCounter: (totalSupply * contractAdress.length) - tokenIdCounter,
        totalSupply: totalSupply * contractAdress.length,
    }
}
