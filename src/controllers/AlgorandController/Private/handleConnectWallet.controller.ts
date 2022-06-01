import AlgorandNetwork from '@providers/AlgorandNetwork'

import { getAccountBalance } from '../Public/handleInteractApplication'

const handleConnectWalletController = async (
    provider: AlgorandNetwork,
    setLoadingMessage: (message: string) => void,
    setBalance: React.Dispatch<React.SetStateAction<string>>,
    setIsConnected: React.Dispatch<React.SetStateAction<boolean>>,
    setShouldWarning: React.Dispatch<React.SetStateAction<boolean>>,
    setWarningMessage: React.Dispatch<React.SetStateAction<string>>,
): Promise<boolean> => {
    const algodclient = provider.getDefaultProvider()
    await provider.disconnect()
    await provider.connect()
    const accounts = await provider.getCurrentAccount()
    console.log('accounts', accounts)
    if (accounts.length > 0) {
        const balance = await getAccountBalance(algodclient, accounts[0])
        if (balance) {
            const fixedBalance = (balance.amount / __MICRO_ALGO_RATIO__).toString()
            setBalance(fixedBalance)
        } else {
            setBalance('0')
        }
        setIsConnected(true)
        setLoadingMessage('Connected to wallet')
        return true
    } else {
        setIsConnected(false)
        setWarningMessage('Connecting wallet failed')
        setShouldWarning(true)
        return false
    }
}

export default handleConnectWalletController
