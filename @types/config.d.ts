declare interface IRpc {
    [chainId: number]: string
}

declare interface IProviderInfura {
    infuraId: string
    rpc: IRpc
    url: string
}

declare interface IToken {
    'X-API-Key': string
    [headerName: string]: string
}

declare interface IProviderPurestake {
    token: IToken
    url: string
    port: string
}

declare interface IEthereumNet {
    name: string
    chain_id: number
    currency: string
    consensus: string
    explorer_address: string
    gas_tracker_url: string
    provider_param: IProviderInfura
}

declare interface IEthereum {
    mainnet: IEthereumNet
    rinkeby: IEthereumNet
    [key: string]: IEthereumNet
}

declare interface IAlgorandNet {
    name: string
    chain_id: number
    currency: string
    consensus: string
    explorer_address: string
    gas_tracker_url: string
    provider_param: IProviderPurestake
}

declare interface IAlgorand {
    mainnet: IAlgorandNet
    testnet: IAlgorandNet
    [key: string]: IAlgorandNet
}

declare interface IGeneralConfigs {
    appName: string
    appLogoUrl: string
    bugsnag: string
}
declare interface INetworks {
    ethereum: IEthereum
    algorand: IAlgorand
    [key: string]: IEthereum | IAlgorand
}

declare type TWalletEnvironments = ('web' | 'mobile')[]

declare interface IWalletsAvailable {
    algosigner: TWalletEnvironments
    metamask: TWalletEnvironments
    walletconnect: TWalletEnvironments
    coinbase: TWalletEnvironments
}
declare interface IConfig {
    networks: INetworks
    general: IGeneralConfigs
    wallets: IWalletsAvailable
}

declare type TAssetInfoResult = {
    'asset-index': number
} & Record<string, unknown>
