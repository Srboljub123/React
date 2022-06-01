import EthereumNetwork from '@providers/EthereumNetwork'
import { countDecimals } from '@common/functions'

export const handleMintPriceController = async (
    contract: IContract,
    contractAdress: string,
    provider: EthereumNetwork,
    salesBehavior: ISalesBehavior,
    mintPrice: string,
): Promise<string> => {
    const web3 = provider.getCurrentProvider()
    const Ticket = new web3.eth.Contract(contract.abi as IAbiItem[], contractAdress)

    if (salesBehavior.type == 'dutch_mint') {
        const price = await Ticket.methods.getPrice(1).call()
        if (price) {
            mintPrice = web3.utils.fromWei(price, 'ether')
            mintPrice = parseFloat(mintPrice).toFixed(countDecimals(Number(mintPrice)))
        }
    }
    return mintPrice
}
