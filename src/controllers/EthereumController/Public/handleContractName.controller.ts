import EthereumNetwork from '@providers/EthereumNetwork'

export const handleContractNameController = async (
    contract: IContract,
    contractAdress: string,
    provider: EthereumNetwork
): Promise<string> => {
    const web3 = provider.getCurrentProvider()
    const Ticket = new web3.eth.Contract(contract.abi as IAbiItem[], contractAdress)

     // string
    return Ticket.methods.name().call()
}
