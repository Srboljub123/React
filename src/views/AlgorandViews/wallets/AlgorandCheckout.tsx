import React from 'react'
// import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import BackButton from '@components/BackButton'
import { useAlgorandContext } from '@contexts/AlgorandNetwork/AlgorandContext'
import { useAlgorandWalletsContext } from '@contexts/AlgorandNetwork/AlgorandWalletsContext'
import AlgorandNetwork from '@providers/AlgorandNetwork'

import MintButton from './MintButton'

import {
    AlgorandCheckoutCol,
    AlgorandCheckoutContainer,
    AlgorandCheckoutDivider,
    AlgorandCheckoutLeftItem,
    AlgorandCheckoutRightItem,
    // AlgorandCheckoutRightItemLight,
    AlgorandCheckoutRow,
    AlgorandCheckoutTitle,
    AlgorandCheckoutTotalDivider,
} from './styles'

const AlgosignerView: React.FC = () => {
    const { currentMintPrice, config, blockchain, network } = useAlgorandContext()
    const { setWalletProvider, mintResults, balance, suggestedGasFees, handleMint } = useAlgorandWalletsContext()

    // const { t } = useTranslation()
    const navigate = useNavigate()

    const handleGoBack = React.useCallback(() => {
        setWalletProvider(new AlgorandNetwork(config.networks.algorand[blockchain]))
        navigate('/payments')
    }, [blockchain, config.networks.algorand, navigate, setWalletProvider])

    return (
        <AlgorandCheckoutContainer>
            <AlgorandCheckoutTitle>Checkout</AlgorandCheckoutTitle>
            <AlgorandCheckoutRow>
                <AlgorandCheckoutLeftItem>Your funds</AlgorandCheckoutLeftItem>
                <AlgorandCheckoutRightItem>{`${balance} ${config.networks[network][blockchain].currency}`}</AlgorandCheckoutRightItem>
            </AlgorandCheckoutRow>
            <AlgorandCheckoutDivider />
            <AlgorandCheckoutRow>
                <AlgorandCheckoutLeftItem>Quantity</AlgorandCheckoutLeftItem>
                <AlgorandCheckoutRightItem>BOX?</AlgorandCheckoutRightItem>
            </AlgorandCheckoutRow>
            <AlgorandCheckoutDivider />
            <AlgorandCheckoutRow>
                <AlgorandCheckoutLeftItem>Subtotal</AlgorandCheckoutLeftItem>
                <AlgorandCheckoutCol>
                    <AlgorandCheckoutRightItem>{`${currentMintPrice} ${config.networks[network][blockchain].currency}`}</AlgorandCheckoutRightItem>
                    {/*<AlgorandCheckoutRightItemLight>$ dollar API</AlgorandCheckoutRightItemLight>*/}
                </AlgorandCheckoutCol>
            </AlgorandCheckoutRow>
            <AlgorandCheckoutTotalDivider />
            <AlgorandCheckoutRow>
                <AlgorandCheckoutLeftItem>Total</AlgorandCheckoutLeftItem>
                {/*<AlgorandCheckoutRightItem>$ dollar API</AlgorandCheckoutRightItem>*/}
            </AlgorandCheckoutRow>
            <AlgorandCheckoutRow>
                <MintButton handleMint={handleMint} suggestedGasFees={suggestedGasFees} mintResults={mintResults}>
                    Confirm payment
                </MintButton>
                <BackButton handleClick={handleGoBack} message="Select other payment method" hasCaret />
            </AlgorandCheckoutRow>
        </AlgorandCheckoutContainer>
    )
}

export default AlgosignerView
