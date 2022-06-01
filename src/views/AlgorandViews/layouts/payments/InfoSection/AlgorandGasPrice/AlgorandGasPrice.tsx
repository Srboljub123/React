import React from 'react'
import { useTranslation } from 'react-i18next'

import { getTotalCost } from '@common/functions'
import { useAlgorandContext } from '@contexts/AlgorandNetwork/AlgorandContext'
import { useAlgorandWalletsContext } from '@contexts/AlgorandNetwork/AlgorandWalletsContext'

import { GasPriceContainer, GasPriceItemContainer, GasPriceItemLeft, GasPriceItemRight } from './styles'

interface IGasPrice {
    suggestedGasFees: string
    shouldEstimateGas: boolean
}

const AlgorandGasPrice: React.FC<IGasPrice> = ({ suggestedGasFees, shouldEstimateGas }) => {
    const { currentMintPrice, selectedOption, config, blockchain, network } = useAlgorandContext()
    const { setEstimatedGasFee, setEstimatedTotalCost, estimatedGasFee, estimatedTotalCost } =
        useAlgorandWalletsContext()
    const { t } = useTranslation()

    const [isFadeIn, setIsFadeIn] = React.useState(true)

    React.useEffect(() => {
        let fadeOutTimer: NodeJS.Timeout

        const fadeInTimer = setTimeout(() => {
            setIsFadeIn(false)
            fadeOutTimer = setTimeout(() => {
                if (network === 'ethereum') {
                    setEstimatedTotalCost(getTotalCost(currentMintPrice, selectedOption, suggestedGasFees))
                }
                if (network === 'algorand') {
                    setEstimatedTotalCost(
                        (Number(currentMintPrice) * selectedOption + Number(suggestedGasFees)).toString(),
                    )
                }
                setEstimatedGasFee(suggestedGasFees)
                setIsFadeIn(true)
            }, __ONE_SECOND__)
        }, __ONE_SECOND__)

        return () => {
            clearTimeout(fadeInTimer)
            clearTimeout(fadeOutTimer)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [shouldEstimateGas, suggestedGasFees])

    return (
        <GasPriceContainer>
            <GasPriceItemContainer>
                <GasPriceItemLeft>
                    {t(`payments.wallet.${config.networks[network][blockchain].consensus}`)}
                </GasPriceItemLeft>
                <GasPriceItemRight isFadingIn={isFadeIn}>
                    {suggestedGasFees === '0'
                        ? t('payments.ticket.loading')
                        : `${estimatedGasFee} - ${config.networks[network][blockchain].currency}`}
                </GasPriceItemRight>
            </GasPriceItemContainer>
            <GasPriceItemContainer>
                <GasPriceItemLeft>{t('payments.wallet.total')}</GasPriceItemLeft>
                <GasPriceItemRight isFadingIn={isFadeIn}>
                    {suggestedGasFees === '0'
                        ? t('payments.ticket.loading')
                        : `${estimatedTotalCost.split('0000')[0]} - ${config.networks[network][blockchain].currency}`}
                </GasPriceItemRight>
            </GasPriceItemContainer>
        </GasPriceContainer>
    )
}

export default AlgorandGasPrice
