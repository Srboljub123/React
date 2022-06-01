import { Contract } from 'web3-eth-contract'
import { ipfsToHTTP } from '@controllers/EthereumController/utils'

export type TTicketContract = Contract

const getAmount = (rarity: string): number => {
    if (rarity === 'Exclusive') {
        const FIVE = 5
        return FIVE
    }
    if (rarity === 'Super Rare') {
        const TEN = 10
        return TEN
    }
    if (rarity === 'Rare') {
        const TWENTY_FIVE = 25
        return TWENTY_FIVE
    }
    if (rarity === 'Limited') {
        const FIFTY = 50
        return FIFTY
    }
    if (rarity === 'Standard') {
        const HUNDRED = 100
        return HUNDRED
    }
    const HUNDRED_FIFTY = 150
    return HUNDRED_FIFTY
}

export const handleAssetInfoController = async (
    resultMint: Record<string, any>,
    ticket: TTicketContract,
): Promise<IMetadataProperties[]> => {
    const metadata = [] as IMetadataProperties[]
    const transfer = resultMint.events.Transfer
    const temporaryArray = []
    if (Array.isArray(transfer)) {
        for (const element of transfer) {
            temporaryArray.push(element.returnValues.tokenId)
        }
    } else {
        temporaryArray.push(resultMint.events.Transfer.returnValues.tokenId)
    }

    for (const element of temporaryArray) {
        //SM: tokenURI
        const resultURI = await ticket.methods.tokenURI(element).call()
        const token_type = resultURI.split('//')[1]
        console.log('token_type:', token_type)

        const response = await fetch(`https://faktura.mypinata.cloud/ipfs/${token_type}`)
        const body = (await response.json()) as IFakturaMypinataResponse

        const currentResult = !body.traits
            ? {
                  image: ipfsToHTTP(body.image),
                  name: body.name,
                  description: body.description,
                  token_type_id: token_type,
                  total_cnt_by_type: undefined,
                  token_type: undefined,
                  animation_url: ipfsToHTTP(body.animation_url)
            }
            : {
                  image: ipfsToHTTP(body.image),
                  name: body.name,
                  description: body.description,
                  token_type_id: token_type,
                  total_cnt_by_type: getAmount(body.traits[0].value),
                  token_type: body.traits[0].value,
                  animation_url: ipfsToHTTP(body.animation_url)
            }

        metadata.push(currentResult)
    }

    return metadata
}
