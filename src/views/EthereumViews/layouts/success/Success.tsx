import React from 'react'
import { useNavigate } from 'react-router-dom'

import { parseTwitterUrl } from '@common/functions'
import { MintButton } from '@common/library'
import { ReactComponent as ArrowRight } from '@common/public/assets/arrowRight.svg'
import { ReactComponent as FacebookIcon } from '@common/public/assets/facebook.svg'
// import { ReactComponent as InstagramIcon } from '@common/public/assets/instagram.svg'
import { ReactComponent as TwitterIcon } from '@common/public/assets/twitter.svg'
import AssetCarousel from '@components/AssetCarousel'
import { useEthereumContext } from '@contexts/EthereumNetwork/EthereumContext'
import { useEthereumWalletsContext } from '@contexts/EthereumNetwork/EthereumWalletsContext'
import {
    SuccessAssetContainer,
    SuccessContainer,
    SuccessHeader,
    SuccessNavigator,
    SuccessTitle,
    SuccessNavItemDivider,
    SuccessArticle,
    SuccessNavItem,
    SuccessNavItemLinkContainer,
    SuccessNavItemTitle,
    SuccessFigure,
    SuccessLinks,
} from '@styles/layouts/sucess/styles'
import Ticket from '@components/Ticket'

// interface ISocialMediaIcons {
//     [key: string]: React.ReactElement<SVGSVGElement>
// }

// const socialMediaIcons: ISocialMediaIcons = {
//     facebook: <FacebookIcon />,
//     instagram: <InstagramIcon />,
//     twitter: <TwitterIcon />,
// }
const Success: React.FC = () => {
    const { marketplaceUrl, socialMedias } = useEthereumContext()
    const { metadataResults, transactionHash } = useEthereumWalletsContext()
    const navigate = useNavigate()

    const handleMintAgain = React.useCallback(() => {
        navigate('/payments')
    }, [navigate])

    const twitter = React.useMemo(() => {
        return socialMedias.find(media => media.title === 'twitter')
    }, [socialMedias])

    const facebook = React.useMemo(() => {
        return socialMedias.find(media => media.title === 'facebook')
    }, [socialMedias])

    if (metadataResults.length === 0) {
        return <div>loading</div>
    }

    return (
        <SuccessContainer>
            <SuccessHeader>
                <SuccessTitle>{`Wooo! You just minted ${metadataResults.length} NFT${
                    metadataResults.length > 1 ? 's' : ''
                }!`}</SuccessTitle>
            </SuccessHeader>
            <SuccessArticle>
                <SuccessAssetContainer>
                    {metadataResults.length > 1 ? (
                        <AssetCarousel metadataResults={metadataResults} />
                    ) : (
                        <SuccessFigure>
                            <Ticket
                                assetUrl={
                                    metadataResults[0]?.animation_url
                                        ? metadataResults[0].animation_url
                                        : metadataResults[0].image
                                }
                            />
                        </SuccessFigure>
                    )}
                </SuccessAssetContainer>
                <SuccessNavigator>
                    <SuccessNavItem>
                        <SuccessNavItemTitle>Sell and Trade your NFTs</SuccessNavItemTitle>
                        {marketplaceUrl.map((url, index) => (
                            <SuccessNavItemLinkContainer key={`${index}-${url.title}`}>
                                <SuccessLinks
                                    href={url.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    data-href={url.title === 'facebook' ? url.link : null}
                                >
                                    <ArrowRight />
                                    {url.title}
                                </SuccessLinks>
                            </SuccessNavItemLinkContainer>
                        ))}
                    </SuccessNavItem>
                    <SuccessNavItemDivider />
                    <SuccessNavItem>
                        <SuccessNavItemTitle>Share your new NFT!</SuccessNavItemTitle>
                        <SuccessNavItemLinkContainer isRow>
                            {twitter && (
                                <SuccessLinks
                                    href={parseTwitterUrl(twitter.text, metadataResults[0].image)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    socialMedia
                                >
                                    <TwitterIcon />
                                </SuccessLinks>
                            )}
                            {facebook && (
                                <SuccessLinks
                                    // href={parseTwittwerShareUrl(facebook.text, metadataResults[0].image)}
                                    // href={metadataResults[0].image}
                                    // target="_blank"
                                    // rel="noopener noreferrer"
                                    data-href={metadataResults[0].image}
                                    socialMedia
                                >
                                    <FacebookIcon />
                                </SuccessLinks>
                            )}
                        </SuccessNavItemLinkContainer>
                        {/* <SuccessNavItemLinkContainer isRow>
                            <SuccessLinks href={media.link} target="_blank" rel="noopener noreferrer">
                                {socialMediaIcons[media.title]}
                            </SuccessLinks>
                        </SuccessNavItemLinkContainer>
                        <SuccessNavItemLinkContainer isRow>
                            <SuccessLinks href={media.link} target="_blank" rel="noopener noreferrer">
                                {socialMediaIcons[media.title]}
                            </SuccessLinks>
                        </SuccessNavItemLinkContainer> */}
                    </SuccessNavItem>
                    <SuccessNavItemDivider />
                    <SuccessNavItem>
                        <SuccessNavItemTitle>Transaction Confirmation</SuccessNavItemTitle>
                        <SuccessNavItemLinkContainer>
                            <SuccessLinks
                                href={`https://rinkeby.etherscan.io/tx/${transactionHash}`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <ArrowRight />
                                Etherscan
                            </SuccessLinks>
                        </SuccessNavItemLinkContainer>
                    </SuccessNavItem>
                    <MintButton onClick={handleMintAgain}>Mint Another</MintButton>
                </SuccessNavigator>
            </SuccessArticle>
            {socialMedias.find(media => media.title === 'twitter') && (
                <script src="/src/common/widgets/twitter.js"></script>
            )}
            {socialMedias.find(media => media.title === 'facebook') && (
                <script src="/src/common/widgets/faceook.js"></script>
            )}
        </SuccessContainer>
    )
}

export default Success
