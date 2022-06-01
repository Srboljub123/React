import React from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { normalizePrice, getTotalCost } from '@common/functions'
import SelectQuantity from '@components/SelectQuantity'
import { useEthereumContext } from '@contexts/EthereumNetwork/EthereumContext'
import { useEthereumWalletsContext } from '@contexts/EthereumNetwork/EthereumWalletsContext'
import { useMainContext } from '@contexts/MainContext'

import EthereumMintButton from './EthereumMintButton'

import {
    EthereumCheckoutButtonsContainer,
    EthereumCheckoutCol,
    EthereumCheckoutContainer,
    EthereumCheckoutDivider,
    EthereumCheckoutLeftItem,
    EthereumCheckoutRightItem,
    EthereumCheckoutRightItemLight,
    EthereumCheckoutRow,
    EthereumCheckoutTitle,
    EthereumCheckoutTotalDivider,
    EthereumFeedbackItem,
} from '@styles/wallets/styles'

const EthereumView: React.FC = () => {
    const { warningMessage } = useMainContext()
    const { config, blockchain, currentMintPrice, network, maxQuantity } = useEthereumContext()
    const {
        mintResults,
        balance,
        suggestedGasFees,
        handleMint,
        loadingMessage,
        setEstimatedTotalCost,
        estimatedTotalCost,
        estimateGasPrice,
    } = useEthereumWalletsContext()
    const { handleChange, selectedOption, setSelectedOption } = useEthereumContext()
    const { t } = useTranslation()
    const navigate = useNavigate()

    React.useEffect(() => {
        selectedOption > maxQuantity && setSelectedOption(maxQuantity)
        selectedOption < 1 && setSelectedOption(1)
    }, [maxQuantity, selectedOption, setSelectedOption])

    React.useEffect(() => {
        warningMessage === 'Confirming payment...' && navigate('/confirming')
    }, [loadingMessage, navigate, warningMessage])

    React.useEffect(() => {
        setEstimatedTotalCost(getTotalCost(currentMintPrice, selectedOption, suggestedGasFees))
    }, [currentMintPrice, selectedOption, setEstimatedTotalCost, suggestedGasFees])

    return (
        <EthereumCheckoutContainer>
            <EthereumCheckoutTitle>Checkout</EthereumCheckoutTitle>
            <EthereumCheckoutRow>
                <EthereumCheckoutLeftItem>Your funds</EthereumCheckoutLeftItem>
                <EthereumCheckoutRightItem>{`${Number.parseFloat(balance).toFixed(__EIGHT_DIGITS__)} ${
                    config.networks[network][blockchain].currency
                }`}</EthereumCheckoutRightItem>
            </EthereumCheckoutRow>
            {loadingMessage === `You don't have enough funds` && (
                <EthereumFeedbackItem>You don&rsquo;t have enough funds</EthereumFeedbackItem>
            )}
            <EthereumCheckoutDivider />
            <EthereumCheckoutRow alignCenter>
                <EthereumCheckoutCol flexStart>
                    <EthereumCheckoutLeftItem>Quantity</EthereumCheckoutLeftItem>
                    <EthereumCheckoutRightItemLight>{`Max ${maxQuantity} per mint`}</EthereumCheckoutRightItemLight>
                </EthereumCheckoutCol>
                <SelectQuantity
                    mintPrice={currentMintPrice}
                    maxQuantity={maxQuantity}
                    selectedOption={selectedOption}
                    setSelectedOption={setSelectedOption}
                    suggestedGasFees={suggestedGasFees}
                    setEstimatedTotalCost={setEstimatedTotalCost}
                    handleChange={handleChange}
                    estimateGasPrice={estimateGasPrice}
                />
            </EthereumCheckoutRow>
            <EthereumCheckoutDivider />
            <EthereumCheckoutRow>
                <EthereumCheckoutLeftItem>Subtotal</EthereumCheckoutLeftItem>
                <EthereumCheckoutCol>
                    <EthereumCheckoutRightItem>{`${normalizePrice(currentMintPrice, selectedOption)} ${
                        config.networks[network][blockchain].currency
                    }`}</EthereumCheckoutRightItem>
                    {/*<EthereumCheckoutRightItemLight>$ dollar API</EthereumCheckoutRightItemLight>*/}
                </EthereumCheckoutCol>
            </EthereumCheckoutRow>
            <EthereumCheckoutRow>
                <EthereumCheckoutLeftItem>
                    {t(`payments.wallet.${config.networks[network][blockchain].consensus}`)}
                </EthereumCheckoutLeftItem>
                <EthereumCheckoutCol>
                    <EthereumCheckoutRightItem>{`${Number.parseFloat(suggestedGasFees)} ${
                        config.networks[network][blockchain].currency
                    }`}</EthereumCheckoutRightItem>
                    {/*<EthereumCheckoutRightItemLight>$ dollar API</EthereumCheckoutRightItemLight>*/}
                </EthereumCheckoutCol>
            </EthereumCheckoutRow>
            <EthereumCheckoutTotalDivider />
            <EthereumCheckoutRow>
                <EthereumCheckoutLeftItem>Total</EthereumCheckoutLeftItem>
                <EthereumCheckoutCol>
                    <EthereumCheckoutRightItem>{`${Number.parseFloat(estimatedTotalCost)} ${
                        config.networks[network][blockchain].currency
                    }`}</EthereumCheckoutRightItem>
                    {/*<EthereumCheckoutRightItemLight>$ dollar API</EthereumCheckoutRightItemLight>*/}
                </EthereumCheckoutCol>
            </EthereumCheckoutRow>
            <EthereumCheckoutRow>
                <EthereumCheckoutButtonsContainer>
                    <EthereumMintButton
                        handleMint={handleMint}
                        suggestedGasFees={suggestedGasFees}
                        mintResults={mintResults}
                        disabled={loadingMessage.includes('reject') ? true : false}
                    />
                </EthereumCheckoutButtonsContainer>
            </EthereumCheckoutRow>
        </EthereumCheckoutContainer>
    )
}

export default EthereumView
