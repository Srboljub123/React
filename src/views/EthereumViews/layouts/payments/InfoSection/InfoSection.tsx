import React from 'react'

import { useEthereumContext } from '@contexts/EthereumNetwork/EthereumContext'
import {
    InfoSectionContainer,
    InfoSectionAssetAndTimer,
    InfoSectionDivider,
    InfoSectionAvatar,
    InfoSectionTitle,
} from '@styles/layouts/payments/InfoSection/styles'

import TicketPrice from './TicketPrice'

type TInfoSectionProperiies = {
    contractEtherScanAddress: string
}

const InfoSection: React.FC<TInfoSectionProperiies> = () => {
    const { assetThumbnail, contractName } = useEthereumContext()

    return (
        <InfoSectionContainer>
            <InfoSectionAssetAndTimer>
                <InfoSectionAvatar src={assetThumbnail} alt={assetThumbnail} />
                <InfoSectionTitle>{contractName}</InfoSectionTitle>
            </InfoSectionAssetAndTimer>
            <InfoSectionDivider />
            <TicketPrice />
            <InfoSectionDivider />
            <InfoSectionDivider />
        </InfoSectionContainer>
    )
}

export default InfoSection
