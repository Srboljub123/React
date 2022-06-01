import { base64Decode, readGlobalState } from '@controllers/AlgorandController'

import algosdk from 'algosdk'

export const handleContractNameController = async (
    config: IConfig,
    network: string,
    blockchain: string,
    contractAdress: string[],
): Promise<string> => {
    const defaultProvider = (config.networks[network] as IAlgorand)[blockchain].provider_param
    const provider = new algosdk.Algodv2(defaultProvider.token, defaultProvider.url, defaultProvider.port)

    const appInfo = await provider.getApplicationByID(Number.parseInt(contractAdress[0])).do()
    const globalState = await readGlobalState(provider, appInfo.id)

    let assetName = globalState['AN'] as string // string
    return base64Decode(assetName)
}
