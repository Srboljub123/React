import React from 'react'
import { Carousel } from 'react-bootstrap'

import Ticket from '@components/Ticket'

import { CustomCarousel, CustomCarouselContainer, CustomCarouselCounter, CustomCarouselCounterWrapper } from './styles'

interface IAssetCarouselProperties {
    metadataResults: IMetadataProperties[]
}

const AssetCarousel: React.FC<IAssetCarouselProperties> = ({ metadataResults }) => {
    const [index, setIndex] = React.useState(0)

    const handleSelect = React.useCallback((selectedIndex: number) => {
        setIndex(selectedIndex)
    }, [])

    return (
        <CustomCarouselContainer>
            <CustomCarousel activeIndex={index} onSelect={handleSelect} indicators={false}>
                {metadataResults.map((metadata, index) => (
                    <Carousel.Item key={`${index}-${metadata.name}`}>
                        <Ticket assetUrl={metadata.animation_url ? metadata.animation_url : metadata.image} />
                    </Carousel.Item>
                ))}
            </CustomCarousel>
            <CustomCarouselCounterWrapper>
                <CustomCarouselCounter>{`${index + 1} / ${metadataResults.length}`}</CustomCarouselCounter>
            </CustomCarouselCounterWrapper>
        </CustomCarouselContainer>
    )
}

export default AssetCarousel
