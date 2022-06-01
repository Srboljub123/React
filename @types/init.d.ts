declare interface IDate {
    year: number
    month: number
    day: number
    hour: number
    minute: number
    second: number
}

declare interface IEndPoint {
    date: IDate
    message: string
    whitelist: string[]
}

declare interface ITimer {
    hasTimer: boolean
    endPoints: IEndPoint[]
}

declare interface ISalesBehavior {
    type: string
    priceMethod: string
    mintMethod: string
    batchMintMethod: string
}

declare interface IMarketPlaceUrl {
    link: string
    title: string
}

declare interface ISocialMedias {
    text: string
    link: string
    title: string
}

declare interface IProviderInit {
    timer: ITimer
    paymentMethods: TPaymentMethods
    contractAddress: string[]
    salesBehavior: ISalesBehavior
    mintPrice: string
    assetUrl: string
    assetThumbnail: string
    maxQuantity: number
    network: string
    blockchain: string
    marketplaceUrl: IMarketPlaceUrl[]
    socialMedias: ISocialMedias[]
}
