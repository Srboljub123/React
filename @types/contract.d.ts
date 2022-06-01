declare interface IMetadataProperties {
    token_type: unknown
    image: string
    name: string
    description: string
    total_cnt_by_type?: number
    token_type_id?: unknown
    animation_url: string
    properties?: any
    'asset-index'?: number
}

declare interface ITokenMintedTrait {
    trait_type: string
    value: string
}

declare interface IFakturaMypinataResponse {
    name: string
    description: string
    image: string
    external_url: string
    traits: ITokenMintedTrait[]
    animation_url: string
}

declare interface IAbiItem {
    anonymous?: boolean
    constant?: boolean
    inputs?: IAbiInput[]
    name?: string
    outputs?: IAbiOutput[]
    payable?: boolean
    stateMutability?: 'pure' | 'view' | 'nonpayable' | 'payable'
    type: 'function' | 'constructor' | 'event' | 'fallback'
    gas?: number
}

declare interface IAbiInput {
    name: string
    type: string
    indexed?: boolean
    components?: IAbiInput[]
    internalType?: string
}

declare interface IAbiOutput {
    name: string
    type: string
    components?: IAbiOutput[]
    internalType?: string
}

declare interface IContract {
    _format: string
    contractName: string
    sourceName: string
    abi: IAbiItem[]
    bytecode: string
    deployedBytecode: string
    linkReferences: Record<string, string>
    deployedLinkReferences: Record<string, string>
}
