import React from 'react'

import { capitalizeFirstLetter } from '@common/functions'
import Ticket from '@components/Ticket'
import { useAlgorandContext } from '@contexts/AlgorandNetwork/AlgorandContext'
import { useAlgorandWalletsContext } from '@contexts/AlgorandNetwork/AlgorandWalletsContext'
// import AlgorandNetwork from '@providers/AlgorandNetwork'

import {
    SuccessAssetContainer,
    // SuccessAssetImage,
    SuccessContainer,
    SuccessHeader,
    // SuccessNavItemLink,
    // SuccessNavItemText,
    SuccessNavigator,
    SuccessTitle,
    // SuccessNavItemDivider,
    SuccessList,
    SuccessListItem,
    SuccessAside,
    SuccessArticle,
    // SuccessNavButton,
    SuccessAssetInfo,
    AssetDolarPrice,
    AssetInfoContainer,
} from './styles'

const Withdrawl: React.FC = () => {
    const { metadataResults } = useAlgorandWalletsContext()
    const { network } = useAlgorandContext()

    // React.useEffect(() => {
    //     setWalletProvider(new AlgorandNetwork(config.networks.algorand[blockchain], 'algosigner'))
    // }, [])

    // React.useEffect(() => {
    //     connectAlgosignerWallet().then(result => console.log(result))
    // }, [connectAlgosignerWallet, walletProvider])

    return (
        <SuccessContainer>
            <SuccessHeader>
                <SuccessTitle>Congratulations! Here is what you minted.</SuccessTitle>
            </SuccessHeader>
            <SuccessArticle>
                <SuccessList>
                    {metadataResults.map((result, index) => (
                        <SuccessListItem key={`metadata-${index}-${result.name}`}>
                            <SuccessAssetContainer>
                                <Ticket
                                    assetUrl={result.animation_url ? result.animation_url : result.image}
                                    isThumbnail
                                />
                                {/* <SuccessAssetImage src={result.image} alt={result.name} /> */}
                                <SuccessAssetInfo>
                                    <AssetInfoContainer>
                                        <h3>{result.name}</h3>

                                        {/*<h4>@malikafavre</h4>*/}
                                    </AssetInfoContainer>
                                    <AssetDolarPrice>
                                        <span>{index + 1}</span>
                                        {/*<span> $3,235.00</span>*/}
                                    </AssetDolarPrice>
                                </SuccessAssetInfo>
                            </SuccessAssetContainer>
                        </SuccessListItem>
                    ))}
                </SuccessList>
                <SuccessNavigator>
                    <SuccessAside>
                        You can view your new NFT on the secondary marketplace, where you can sell and trade your{' '}
                        {capitalizeFirstLetter(network)} NFTs{' '}
                        <a href="https://" target="_blank" rel="noopener noreferrer">
                            link to the collection
                        </a>
                    </SuccessAside>
                </SuccessNavigator>
            </SuccessArticle>
        </SuccessContainer>
    )
}

export default Withdrawl
