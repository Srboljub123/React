import React from 'react'
import { useNavigate } from 'react-router-dom'

import { ReactComponent as WalletIcon } from '@common/public/assets/wallet.svg'
import WalletProvider from '@components/WalletProvider'
import { useAlgorandContext } from '@contexts/AlgorandNetwork/AlgorandContext'
import { useAlgorandWalletsContext } from '@contexts/AlgorandNetwork/AlgorandWalletsContext'
import { useMainContext } from '@contexts/MainContext'
import AlgorandNetwork from '@providers/AlgorandNetwork'
import { PaymentsMethodsList, PaymentSectionContainer } from '@styles/layouts/payments/PaymentSection/styles'

const PaymentSection: React.FC = () => {
    const { setWarningMessage, setShouldWarning } = useMainContext()
    const { paymentMethods, config, blockchain } = useAlgorandContext()
    const { setWalletProvider, connectAlgosignerWallet, walletProvider, isConnected } = useAlgorandWalletsContext()
    // const { t } = useTranslation()
    const navigate = useNavigate()

    const handleIntallPlugin = React.useCallback((wallet: string) => {
        window.alert(`Please install ${wallet} plugin, or select another payment method.`)
    }, [])

    const handleSelectPaymentMethod = React.useCallback(
        (event: React.SyntheticEvent<HTMLButtonElement>) => {
            const provider = new AlgorandNetwork(config.networks.algorand[blockchain], event.currentTarget.value)

            if (provider.getCurrentWallet() !== event.currentTarget.value) {
                return handleIntallPlugin(event.currentTarget.value)
            }
            setWalletProvider(provider)
            // setTimeout(() => {
            //     connectAlgosignerWallet().then(isAlgosignerConnected =>
            //         console.log('isAlgosignerConnected', isAlgosignerConnected),
            //     )
            // }, 5000)
            // navigate(event.currentTarget.value)
        },
        [blockchain, config.networks.algorand, handleIntallPlugin, setWalletProvider],
    )

    React.useEffect(() => {
        connectAlgosignerWallet().then(isAlgosignerConnected =>
            console.log('isAlgosignerConnected', isAlgosignerConnected),
        )
        // .catch((error: Error) => {
        //     setShouldWarning(false)
        //     setWarningMessage('setWarningMessage')
        // })
    }, [connectAlgosignerWallet, setShouldWarning, setWarningMessage, walletProvider])

    React.useEffect(() => {
        if (isConnected && walletProvider) {
            navigate(walletProvider.getCurrentWallet())
        }
    }, [isConnected, navigate, walletProvider])

    return (
        <PaymentSectionContainer>
            <WalletIcon />
            <h2>Connect a wallet</h2>
            <h3>
                Learn how to connect a wallet{' '}
                <a href="http://" target="_blank" rel="noopener noreferrer">
                    here
                </a>
            </h3>
            <PaymentsMethodsList>
                {paymentMethods.map(paymentMethod => (
                    <WalletProvider
                        key={`payment-method-${paymentMethod}`}
                        paymentMethod={paymentMethod}
                        handleSelectPaymentMethod={handleSelectPaymentMethod}
                    />
                ))}
            </PaymentsMethodsList>
        </PaymentSectionContainer>
    )
}

export default PaymentSection
