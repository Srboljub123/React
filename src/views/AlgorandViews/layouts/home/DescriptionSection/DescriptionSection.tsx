import { t } from 'i18next'
import React from 'react'
import { useNavigate } from 'react-router-dom'

import { normalizePrice } from '@common/functions'
import { MintButton } from '@common/library'
import MobileSwap from '@components/MobileSwap'
import ProgressRounded from '@components/ProgressRounded'
import SelectQuantity from '@components/SelectQuantity'
import Timer from '@components/Timer'
import { useAlgorandContext } from '@contexts/AlgorandNetwork/AlgorandContext'
import { useAlgorandWalletsContext } from '@contexts/AlgorandNetwork/AlgorandWalletsContext'
import { TimerProvider } from '@contexts/TimerContext'
import {
    DescriptionSectionContainer,
    DescriptionSectionRow,
    DescriptionSectionCol,
    DescriptionSectionTitle,
    DescriptionSectionMintedCounter,
    DescriptionColTitle,
    DescriptionColText,
    DescriptionSectionDivider,
    DescriptionColSubTitle,
    DescriptionSectionColEnd,
    DescriptionSectionColCenter,
    DescriptionSectionAnchor,
    DescriptionSectionButtonRow,
    DescriptionSectionVerticalDivider,
    DescriptionSectionRowInfos,
} from '@styles/layouts/home/DescriptionSection/styles'

const DescriptionSection: React.FC = () => {
    const {
        stage,
        setStage,
        timer,
        maxQuantity,
        remainedTokenCount,
        totalSupply,
        currentMintPrice,
        contractName,
        contractAddress,
        network,
        config,
        blockchain,
        selectedOption,
        setSelectedOption,
        handleChange,
    } = useAlgorandContext()
    const { isLoadingContext, suggestedGasFees, setEstimatedTotalCost, truncatedContractAddress } =
        useAlgorandWalletsContext()
    const ticketAmountOptions: ISelectedOption[] = []
    for (let index = 1; index < maxQuantity + 1; index++) {
        ticketAmountOptions.push({ value: index.toString(), label: index.toString() })
    }
    const shouldDisable = React.useMemo(
        () => remainedTokenCount === -1 || stage === 0 || isLoadingContext,
        [isLoadingContext, remainedTokenCount, stage],
    )
    const navigate = useNavigate()
    const navigateToPayment = React.useCallback(() => {
        navigate('payments')
    }, [navigate])
    return (
        <DescriptionSectionContainer>
            <DescriptionSectionCol>
                <DescriptionSectionTitle>{contractName}</DescriptionSectionTitle>
                <ProgressRounded limit={totalSupply} remainedTokenCount={remainedTokenCount} />
                <DescriptionSectionMintedCounter>
                    {remainedTokenCount === -1
                        ? t('home.loadingMessages.wait')
                        : `${remainedTokenCount} out of ${totalSupply} minted`}
                </DescriptionSectionMintedCounter>
            </DescriptionSectionCol>
            <DescriptionSectionDivider />

            <DescriptionSectionRowInfos>
                <DescriptionSectionCol>
                    <DescriptionColTitle>Network</DescriptionColTitle>
                    <DescriptionColText>{network}</DescriptionColText>
                </DescriptionSectionCol>
                <DescriptionSectionVerticalDivider />

                <DescriptionSectionCol>
                    <DescriptionColTitle>Blockchain</DescriptionColTitle>
                    <DescriptionColText>{blockchain}</DescriptionColText>
                </DescriptionSectionCol>
                <DescriptionSectionVerticalDivider />

                <DescriptionSectionCol>
                    <DescriptionColTitle>Contract address</DescriptionColTitle>
                    <DescriptionSectionAnchor
                        href={`${config.networks[network][blockchain].explorer_address}${contractAddress}`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {truncatedContractAddress}
                    </DescriptionSectionAnchor>
                </DescriptionSectionCol>
            </DescriptionSectionRowInfos>
            <DescriptionSectionDivider />

            <DescriptionSectionRow>
                <DescriptionSectionCol>
                    <DescriptionColTitle>Quantity</DescriptionColTitle>
                    <SelectQuantity
                        mintPrice={currentMintPrice}
                        maxQuantity={maxQuantity}
                        selectedOption={selectedOption}
                        setSelectedOption={setSelectedOption}
                        suggestedGasFees={suggestedGasFees}
                        setEstimatedTotalCost={setEstimatedTotalCost}
                        handleChange={handleChange}
                    />
                    <DescriptionColSubTitle>{`Max ${maxQuantity} per mint`}</DescriptionColSubTitle>
                </DescriptionSectionCol>

                <DescriptionSectionColEnd>
                    <DescriptionSectionTitle>Price</DescriptionSectionTitle>
                    <DescriptionColTitle isPrice>{`${normalizePrice(currentMintPrice, selectedOption)} ${
                        config.networks[network][blockchain].currency
                    }`}</DescriptionColTitle>
                    {/*<DescriptionColSubTitle>dollar API</DescriptionColSubTitle>*/}
                </DescriptionSectionColEnd>
            </DescriptionSectionRow>

            <MobileSwap
                componentA={
                    <DescriptionSectionButtonRow>
                        <MintButton disabled={shouldDisable} onClick={navigateToPayment}>
                            {remainedTokenCount === -1 ? t('home.soldOut') : t('home.buyNow')}
                        </MintButton>
                    </DescriptionSectionButtonRow>
                }
                componentB={
                    <DescriptionSectionColCenter>
                        <DescriptionSectionCol>
                            <TimerProvider stage={stage} setStage={setStage} timeEndPoints={timer.endPoints}>
                                <Timer />
                            </TimerProvider>
                        </DescriptionSectionCol>
                    </DescriptionSectionColCenter>
                }
            />
        </DescriptionSectionContainer>
    )
}

export default DescriptionSection
