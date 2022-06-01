import React from 'react'
// import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { ReactComponent as WalletIcon } from '@common/public/assets/wallet.svg'
import WalletProvider from '@components/WalletProvider'
import { useEthereumContext } from '@contexts/EthereumNetwork/EthereumContext'
import { useEthereumWalletsContext } from '@contexts/EthereumNetwork/EthereumWalletsContext'
import { useMainContext } from '@contexts/MainContext'
import EthereumNetwork from '@providers/EthereumNetwork'

import { PaymentSectionContainer, PaymentsMethodsList } from '@styles/layouts/payments/PaymentSection/styles'

const PaymentSection: React.FC = () => {
    const { setWarningMessage, setShouldWarning } = useMainContext()
    const { paymentMethods, config, blockchain } = useEthereumContext()
    const { setWalletProvider, connectEthereumWallet, walletProvider, isConnected } = useEthereumWalletsContext()
    // const { t } = useTranslation()
    const navigate = useNavigate()

    const handleSelectPaymentMethod = React.useCallback(
        (event: React.SyntheticEvent<HTMLButtonElement>) => {
            const provider = new EthereumNetwork(config.networks.ethereum[blockchain], event.currentTarget.value)

            if (provider.getCurrentWallet() !== event.currentTarget.value) {
                setWarningMessage(`You don't have ${event.currentTarget.value} extension installed in your browser.`)
                return setShouldWarning(true)
            }
            setWalletProvider(provider)
        },
        [blockchain, config.networks.ethereum, setShouldWarning, setWalletProvider, setWarningMessage],
    )

    React.useEffect(() => {
        connectEthereumWallet().then(isAlgosignerConnected =>
            console.log('isAlgosignerConnected', isAlgosignerConnected),
        )
    }, [connectEthereumWallet, walletProvider])

    React.useEffect(() => {
        if (isConnected && walletProvider) {
            console.log(walletProvider.getCurrentWallet())
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
                .
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
