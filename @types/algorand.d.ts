/* eslint-disable @typescript-eslint/naming-convention */
// export declare global {
//     interface Window {
//         // add you custom properties and methods
//         AlgoSigner: {
//             accounts: any
//             algod: any
//             connect: any
//             encoding: any
//             indexer: any
//             router: any
//             send: any
//             sign: any
//             signMultisig: any
//             signTxn: any
//             subscribe: any
//             task: any
//         }
//     }
// }

declare interface Window {
    // add you custom properties and methods
    AlgoSigner: {
        accounts: any
        algod: any
        connect: any
        encoding: any
        indexer: any
        router: any
        send: any
        sign: any
        signMultisig: any
        signTxn: any
        subscribe: any
        task: any
    }
}

declare interface IWalletTransaction {
    /**
     * Base64 encoding of the canonical msgpack encoding of a
     * Transaction.
     */
    txn: string

    /**
     * Optional authorized address used to sign the transaction when
     * the account is rekeyed. Also called the signor/sgnr.
     */
    authAddr?: string

    /**
     * Optional multisig metadata used to sign the transaction
     */
    msig?: IMultisigMetadata

    /**
     * Optional list of addresses that must sign the transactions
     */
    signers?: string[]

    /**
     * Optional message explaining the reason of the transaction
     */
    message?: string
}

declare interface ISignTxnOptions {
    /**
     * Optional message explaining the reason of the group of
     * transactions.
     */
    message?: string

    // other options may be present, but are not standard
}

declare interface IAccountAssets {
    amount: number
    'asset-id': number
    creator: string
    'is-frozen': boolean
    // other options may be present, but are not standard
}

type SignTxnParameters = [IWalletTransaction[], ISignTxnOptions?]
