import { getApplicationAddress } from 'algosdk'
import axios from 'axios'
import React from 'react'
import { useNavigate } from 'react-router-dom'

import { useAlgorandContext } from '@contexts/AlgorandNetwork/AlgorandContext'
import { useAlgorandWalletsContext } from '@contexts/AlgorandNetwork/AlgorandWalletsContext'
import { getAccountBalance } from '@controllers/AlgorandController/Public/handleInteractApplication'
import { ipfsToHTTP } from '@controllers/AlgorandController/utils'
import AlgorandNetwork from '@providers/AlgorandNetwork'

import { WithdrawlButtonContainer } from '@styles/layouts/home/WithdrawlButton/styles'

const WithdrawlButton: React.FC = () => {
    const {
        connectAlgosignerWallet,
        setWalletProvider,
        walletProvider,
        handleMetadataResults,
        isLoadingContext,
        setIsLoadingContext,
    } = useAlgorandWalletsContext()
    const { config, blockchain, contractAddress, currentContractAddress } = useAlgorandContext()

    const navigate = useNavigate()

    React.useEffect(() => {
        setWalletProvider(new AlgorandNetwork(config.networks.algorand[blockchain], 'algosigner'))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleSuccess = React.useCallback(() => {
        setIsLoadingContext(false)
        navigate('success')
    }, [navigate, setIsLoadingContext])

    const handleWithdrawlOption = React.useCallback(async () => {
        setWalletProvider(new AlgorandNetwork(config.networks.algorand[blockchain], 'algosigner'))

        const isConnected = await connectAlgosignerWallet()
        setIsLoadingContext(true)
        if (isConnected && walletProvider) {
            const account = await getAccountBalance(
                walletProvider.getDefaultProvider(),
                getApplicationAddress(Number.parseInt(contractAddress[currentContractAddress])),
            )
            const userAddress = await walletProvider.getCurrentAccount()
            const temporaryAssets: IMetadataProperties[] = []
            for (let index = 0; index < account.assets.length; index++) {
                const { params } = await walletProvider
                    .getDefaultProvider()
                    .getAssetByID(account.assets[index]['asset-id'])
                    .do()

                if (params.manager === userAddress[0]) {
                    const assetResponse = await axios.get(ipfsToHTTP(params['url']))
                    const assetUrlId = params['url'].match(/\/(\d+)\./)![1]
                    console.log('assetUrlId', assetUrlId)
                    console.log('assetResponse', assetResponse)
                    const assetMyPinata = await axios.get(
                        `https://faktura.mypinata.cloud/ipfs/QmRnRaJ2n9C6KMavkguqwysZMhEHnZkduVafCMdRrADsuf/${assetUrlId}.json`,
                    )
                    console.log(assetMyPinata)
                    const currentAssetMetadata = assetMyPinata.data as IMetadataProperties
                    console.log('currentAssetMetadata', currentAssetMetadata)
                    const fixedAssetUrlMetadata: IMetadataProperties = {
                        ...currentAssetMetadata,
                        image: ipfsToHTTP(currentAssetMetadata.image),
                        animation_url: ipfsToHTTP(currentAssetMetadata.animation_url),
                        'asset-index': account.assets[index]['asset-id'],
                    }
                    ipfsToHTTP(currentAssetMetadata.image)
                    temporaryAssets.push(fixedAssetUrlMetadata)
                }
            }

            handleMetadataResults(temporaryAssets)
            handleSuccess()
        }
    }, [
        blockchain,
        config.networks.algorand,
        connectAlgosignerWallet,
        contractAddress,
        currentContractAddress,
        handleMetadataResults,
        handleSuccess,
        setIsLoadingContext,
        setWalletProvider,
        walletProvider,
    ])
    return (
        <WithdrawlButtonContainer
            onClick={handleWithdrawlOption}
            isDisabled={isLoadingContext}
            disabled={isLoadingContext}
        >
            {' '}
            {/* {isLoadingContext && <i className="fa fa-refresh fa-spin" />} */}
            {isLoadingContext && <span>Loading...</span>}
            {!isLoadingContext && <span>Withdraw your assets</span>}
        </WithdrawlButtonContainer>
    )
}

export default WithdrawlButton
