/* eslint-disable @typescript-eslint/no-magic-numbers */
declare interface IReturnValues {
    0: string
    1: string
    2: string
    from: string
    to: string
    tokenId: string
}

declare interface IRaw {
    data: string
    topics: string[]
}

declare interface ITransfer {
    address: string
    blockHash: string
    blockNumber: number
    logIndex: number
    removed: boolean
    transactionHash: string
    transactionIndex: number
    id: string
    returnValues: IReturnValues
    event: string
    signature: string
    raw: IRaw
}

declare interface ITransactionEvents {
    Transfer: ITransfer
}

declare interface ITicketReceipt {
    blockHash: string
    blockNumber: number
    contractAddress?: string
    cumulativeGasUsed: number
    effectiveGasPrice: number
    from: string
    gasUsed: number
    logsBloom: string
    status: boolean
    to: string
    transactionHash: string
    transactionIndex: number
    type: string
    events: ITransactionEvents
}
