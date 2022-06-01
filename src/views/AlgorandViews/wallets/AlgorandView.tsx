import React from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { getTotalCost } from '@common/functions'
import { ReactComponent as ChevronUp } from '@common/public/assets/chevronUp.svg'
import BackButton from '@components/BackButton'
import { useAlgorandContext } from '@contexts/AlgorandNetwork/AlgorandContext'
import { useAlgorandWalletsContext } from '@contexts/AlgorandNetwork/AlgorandWalletsContext'
import { useMainContext } from '@contexts/MainContext'
import AlgorandNetwork from '@providers/AlgorandNetwork'

import MintButton from './MintButton'

import {
    AlgorandCheckoutButtonsContainer,
    AlgorandCheckoutCol,
    AlgorandCheckoutContainer,
    AlgorandCheckoutDivider,
    AlgorandCheckoutItemBox,
    AlgorandCheckoutLeftItem,
    AlgorandCheckoutRightItem,
    // AlgorandCheckoutRightItemLight,
    AlgorandCheckoutRow,
    AlgorandCheckoutTitle,
    AlgorandCheckoutTotalDivider,
    AlgorandFeedbackItem,
    ChevronButtonDown,
    ChevronButtonsContainer,
    ChevronButtonUp,
    QuantityInput,
} from './styles'

const AlgosignerView: React.FC = () => {
    const { config, blockchain, network, maxQuantity } = useMainContext()
    const {
        setWalletProvider,
        mintResults,
        balance,
        suggestedGasFees,
        handleMint,
        loadingMessage,
        setEstimatedTotalCost,
        estimatedTotalCost,
    } = useAlgorandWalletsContext()
    const { handleChange, selectedOption, setSelectedOption, currentMintPrice } = useAlgorandContext()
    const { t } = useTranslation()
    const navigate = useNavigate()
    const [isIncreasing, setIsIncreasing] = React.useState(true)

    const handleGoBack = React.useCallback(() => {
        setWalletProvider(new AlgorandNetwork(config.networks.algorand[blockchain]))
        navigate('/payments')
    }, [blockchain, config.networks.algorand, navigate, setWalletProvider])

    const handleIncreaseQuantity = React.useCallback(() => {
        setIsIncreasing(true)
        if (selectedOption < maxQuantity) {
            setSelectedOption(state => state + 1)
            setEstimatedTotalCost(getTotalCost(currentMintPrice, selectedOption + 1, suggestedGasFees))
        }
    }, [maxQuantity, currentMintPrice, selectedOption, setEstimatedTotalCost, setSelectedOption, suggestedGasFees])

    const handleDecreaseQuantity = React.useCallback(() => {
        setIsIncreasing(false)
        if (selectedOption > 1) {
            setSelectedOption(state => state - 1)
            setEstimatedTotalCost(getTotalCost(currentMintPrice, selectedOption - 1, suggestedGasFees))
        }
    }, [currentMintPrice, selectedOption, setEstimatedTotalCost, setSelectedOption, suggestedGasFees])

    React.useEffect(() => {
        selectedOption > maxQuantity && setSelectedOption(maxQuantity)
        selectedOption < 1 && setSelectedOption(1)
    }, [maxQuantity, selectedOption, setSelectedOption])

    React.useEffect(() => {
        loadingMessage === 'Confirming payment...' && navigate('/confirming')
    }, [loadingMessage, navigate])

    return (
        <AlgorandCheckoutContainer>
            <AlgorandCheckoutTitle>Checkout</AlgorandCheckoutTitle>
            <AlgorandCheckoutRow>
                <AlgorandCheckoutLeftItem>Your funds</AlgorandCheckoutLeftItem>
                <AlgorandCheckoutRightItem>{`${balance} ${config.networks[network][blockchain].currency}`}</AlgorandCheckoutRightItem>
            </AlgorandCheckoutRow>
            {loadingMessage === `You don't have enough funds` && (
                <AlgorandFeedbackItem>You don&rsquo;t have enough funds</AlgorandFeedbackItem>
            )}
            <AlgorandCheckoutDivider />
            <AlgorandCheckoutRow alignCenter>
                <AlgorandCheckoutLeftItem>Quantity</AlgorandCheckoutLeftItem>
                <AlgorandCheckoutItemBox>
                    <QuantityInput
                        type="number"
                        name="quantity"
                        id="quantiy"
                        aria-label="First name"
                        className="form-control"
                        onChange={handleChange}
                        value={selectedOption}
                        min={1}
                        max={4}
                    />
                    <ChevronButtonsContainer>
                        <ChevronButtonUp onClick={handleIncreaseQuantity} isIncreasing={isIncreasing}>
                            <ChevronUp />
                        </ChevronButtonUp>
                        <ChevronButtonDown onClick={handleDecreaseQuantity} isIncreasing={isIncreasing}>
                            <ChevronUp />
                        </ChevronButtonDown>
                    </ChevronButtonsContainer>
                </AlgorandCheckoutItemBox>
            </AlgorandCheckoutRow>
            <AlgorandCheckoutDivider />
            <AlgorandCheckoutRow>
                <AlgorandCheckoutLeftItem>Subtotal</AlgorandCheckoutLeftItem>
                <AlgorandCheckoutCol>
                    <AlgorandCheckoutRightItem>{`${Number.parseFloat(estimatedTotalCost)} ${
                        config.networks[network][blockchain].currency
                    }`}</AlgorandCheckoutRightItem>
                    {/*<AlgorandCheckoutRightItemLight>$ dollar API</AlgorandCheckoutRightItemLight>*/}
                </AlgorandCheckoutCol>
            </AlgorandCheckoutRow>
            <AlgorandCheckoutRow>
                <AlgorandCheckoutLeftItem>
                    {t(`payments.wallet.${config.networks[network][blockchain].consensus}`)}
                </AlgorandCheckoutLeftItem>
                <AlgorandCheckoutCol>
                    <AlgorandCheckoutRightItem>{`${Number.parseFloat(suggestedGasFees)} ${
                        config.networks[network][blockchain].currency
                    }`}</AlgorandCheckoutRightItem>
                    {/*<AlgorandCheckoutRightItemLight>$ dollar API</AlgorandCheckoutRightItemLight>*/}
                </AlgorandCheckoutCol>
            </AlgorandCheckoutRow>
            <AlgorandCheckoutTotalDivider />
            <AlgorandCheckoutRow>
                <AlgorandCheckoutLeftItem>Total</AlgorandCheckoutLeftItem>
                {/*<AlgorandCheckoutRightItem>$ dollar API</AlgorandCheckoutRightItem>*/}
            </AlgorandCheckoutRow>
            <AlgorandCheckoutRow>
                <AlgorandCheckoutButtonsContainer>
                    <MintButton
                        handleMint={handleMint}
                        suggestedGasFees={suggestedGasFees}
                        mintResults={mintResults}
                        disabled={loadingMessage.includes('reject') ? true : false}
                    >
                        Confirm payment
                    </MintButton>
                    <BackButton handleClick={handleGoBack} message="Select other payment method" hasCaret />
                </AlgorandCheckoutButtonsContainer>
            </AlgorandCheckoutRow>
        </AlgorandCheckoutContainer>
    )
}

export default AlgosignerView
