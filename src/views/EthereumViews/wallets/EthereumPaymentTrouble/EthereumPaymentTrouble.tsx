import React from 'react'
import { useNavigate } from 'react-router-dom'

import { ReactComponent as TroubleIcon } from '@common/public/assets/trouble.svg'
import BackButton from '@components/BackButton'
import { useEthereumContext } from '@contexts/EthereumNetwork/EthereumContext'
import { useEthereumWalletsContext } from '@contexts/EthereumNetwork/EthereumWalletsContext'
import EthereumNetwork from '@providers/EthereumNetwork'

import EthereumMintButton from '../EthereumMintButton'

import { LoadingContainer, LoadingText, LoadingTitle } from '@styles/wallets/PaymentTrouble/styles'

const EthereumPaymentTrouble: React.FC = () => {
    const { config, blockchain } = useEthereumContext()
    const { setWalletProvider, setEstimatedGasFee, setEstimatedTotalCost, mintResults, handleMint, suggestedGasFees } =
        useEthereumWalletsContext()

    const navigate = useNavigate()

    const handleGoBack = React.useCallback(() => {
        setWalletProvider(new EthereumNetwork(config.networks.ethereum[blockchain]))
        setEstimatedTotalCost('0')
        setEstimatedGasFee('0')
        navigate('/payments')
    }, [blockchain, config.networks.ethereum, navigate, setEstimatedGasFee, setEstimatedTotalCost, setWalletProvider])
    return (
        <LoadingContainer isLoading>
            <TroubleIcon />
            <LoadingTitle>We had a problem with your payment</LoadingTitle>
            <LoadingText>Try again in a few minutes or chose another payment method</LoadingText>

            <EthereumMintButton handleMint={handleMint} suggestedGasFees={suggestedGasFees} mintResults={mintResults}>
                <p>Try again</p>
            </EthereumMintButton>

            <BackButton handleClick={handleGoBack} message="Go back to check out" isBackDisabled={false} hasCaret />
        </LoadingContainer>
    )
}

export default EthereumPaymentTrouble
