declare interface IWalletsLogos {
    metamask: string
    algosigner: string
    walletconnect: string
    coinbase: string
    [key: string]: string
}

type TDefaultWallets = 'metamask' | 'algosigner' | 'walletconnect' | 'coinbase' | string

type TAnyWallet = string[]

type TPaymentMethods = TDefaultWallets[] | TAnyWallet

declare interface ISelectedOption {
    value: string
    label: string
}

interface ISelectedWalletProperties {
    selectedWallet: string
    walletAddress: string
    truncatedAddress: string
}
