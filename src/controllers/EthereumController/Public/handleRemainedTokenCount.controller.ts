import EthereumNetwork from '@providers/EthereumNetwork'
interface IHandleReamainedTokenCount {
    tokenIdCounter: number
    totalSupply: number
}
export const handleRemainedTokenCountController = async (
    contract: IContract,
    contractAdress: string,
    provider: EthereumNetwork
): Promise<IHandleReamainedTokenCount> => {
    const web3 = provider.getCurrentProvider()
    const Ticket = new web3.eth.Contract(contract.abi as IAbiItem[], contractAdress)

    const tokenIdCounter = await Ticket.methods._tokenIdCounter().call() // string
    const totalSupply = await Ticket.methods.totalSupply().call() // number

    if (!tokenIdCounter || !totalSupply) {
        return { tokenIdCounter: 0, totalSupply: 0 }
    }
    return { tokenIdCounter: Number.parseInt(tokenIdCounter), totalSupply }
}
