import React from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import BackButton from '@components/BackButton'

import { DescriptionContainer } from '@styles/layouts/sucess/Description/styles'

interface IDescriptionProperties {
    metadataResults: IMetadataProperties[]
}

const Description: React.FC<IDescriptionProperties> = ({ metadataResults }) => {
    const { t } = useTranslation()
    const navigate = useNavigate()

    const handleClick = React.useCallback(() => {
        navigate('/')
    }, [navigate])

    return (
        <DescriptionContainer>
            <p>
                {t('success.description.text', {
                    number: metadataResults[metadataResults.length - 1].total_cnt_by_type,
                })}
            </p>

            <small>{metadataResults[metadataResults.length - 1].name}</small>
            <small>{metadataResults[metadataResults.length - 1].description}</small>

            <small>{t('success.description.small')}</small>

            <a
                href="https://twitter.com/intent/tweet?url=www.CurseNFT.com&text=I%20just%20minted%20an%20exclusive%20NFT%20ticket%20to%20the%20#CurseNFT%20Auction!%20There's%20only%201,000%20total.You'll%20also%20get%20exclusive%20access%20to%20community%20benefits.%20Get%20yours%20now,%20before%20they%20sell%20out."
                target="_blank"
                rel="noopener noreferrer"
            >
                {t('success.shareButton')}
            </a>

            <BackButton handleClick={handleClick} message="Go back to Home" />
        </DescriptionContainer>
    )
}

export default Description
