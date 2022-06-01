import * as ls from 'local-storage'

import { local_storage_key } from '@common/constants'
import EthereumNetwork from '@providers/EthereumNetwork'

const handleConnectWalletController = async (
    provider: EthereumNetwork,
    chainId: number,
    setLoadingMessage: (message: string) => void,
    setIsConnected: React.Dispatch<React.SetStateAction<boolean>>,
    setBalance: React.Dispatch<React.SetStateAction<string>>,
): Promise<boolean> => {
    await provider.disconnect()
    const web3 = provider.getCurrentProvider()
    console.log('web3', web3)
    const isConnected = await provider.connect()
    try {
        await provider.getCurrentChainId(chainId)
    } catch {
        console.log('error getCurrentChainId')
    }

    if (isConnected) {
        ls.set(local_storage_key.KEY_CONNECTED, 1)
        const accounts = await provider.getCurrentAccount()
        if (accounts.length > 0) {
            web3.eth.getBalance(accounts[0]).then(funds => setBalance(web3.utils.fromWei(funds, 'ether')))

            setIsConnected(true)
            setLoadingMessage('Connected to wallet')
            return true
        } else {
            setIsConnected(false)
            setLoadingMessage('Connecting wallet failed')
            return false
        }
    } else {
        setIsConnected(false)
        setLoadingMessage('Connecting wallet failed')
        return false
    }
}

export default handleConnectWalletController
