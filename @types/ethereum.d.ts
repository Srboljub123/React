import { MetaMaskInpageProvider } from '@metamask/providers'

/* eslint-disable @typescript-eslint/naming-convention */
// export declare global {
//     interface Window {
//         // add you custom properties and methods
//         ethereum: {
//             autoRefreshOnNetworkChange: boolean
//             chainId: string
//             isMetaMask?: boolean
//             isStatus?: boolean
//             networkVersion: string
//             selectedAddress: number
//             request: (request: { method: string; params?: Array<unknown> }) => Promise<unknown>
//         }
//     }
// }

declare interface Window {
    // add you custom properties and methods
    ethereum: MetaMaskInpageProvider
}

declare interface IRinkebyEtherScanResult {
    LastBlock: string
    SafeGasPrice: string
    ProposeGasPrice: string
    FastGasPrice: string
    suggestBaseFee: string
    gasUsedRatio: string
}
declare interface IRinkebyEtherScan {
    status: string
    message: string
    result: IRinkebyEtherScanResult
}
