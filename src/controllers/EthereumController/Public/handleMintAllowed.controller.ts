import EthereumNetwork from '@providers/EthereumNetwork'

interface IHandleMintAllowed {
    mintAllowed: number
    maxMintPerAddress: number
}

export const handleMintAllowedController = async (
    contract: IContract,
    contractAdress: string,
    provider: EthereumNetwork
): Promise<IHandleMintAllowed> => {
    const web3 = provider.getCurrentProvider()
    const Ticket = new web3.eth.Contract(contract.abi as IAbiItem[], contractAdress)
     // number
    const account = await provider.getCurrentAccount()
    const mintAllowed = await Ticket.methods.mintAllowed(account[0]).call()
    const maxMintPerAddress = await Ticket.methods.maxMintPerAddress().call()

    return { mintAllowed: mintAllowed, maxMintPerAddress: maxMintPerAddress }
}
