interface ITimer {
    hasTimer: boolean
    endPoints: ITimerEndPoint[]
}

declare interface IMainProvider {
    assetUrl: string
    assetThumbnail: string
    contractAddress: string[]
    marketplaceUrl: IMarketPlaceUrl[]
    socialMedias: ISocialMedias[]
    salesBehavior: ISalesBehavior
    mintPrice: string
    contract: IContract
    maxQuantity: number
    network: string
    blockchain: string
    paymentMethods: TPaymentMethods
    timer: ITimer
}

// declare interface IProviderInit {
//     assetUrl: string
//     assetThumbnail: string
//     contractAddress: string[]
//     marketplaceUrl: string
//     salesBehavior: ISalesBehavior
//     mintPrice: string
//     maxQuantity: number
//     network: string
//     blockchain: string
//     paymentMethods: string[]
//     timer: ITimer
// }

declare interface IMainContextData {
    config: IConfig
    contract: IContract

    assetUrl: string
    assetThumbnail: string
    contractAddress: string[]
    mintPrice: string
    maxQuantity: number
    network: string
    blockchain: string
    paymentMethods: TPaymentMethods
    timer: ITimer
}
