import React from 'react'
import { useTranslation } from 'react-i18next'

import { truncateString } from '@common/functions'
import { useMainContext } from '@contexts/MainContext'
import {
    handleConnectWalletController,
    handleEstimateGasPriceController,
    handleMintController,
    handleWhiteListsController,
    handleWithdrawController,
} from '@controllers/AlgorandController'
import AlgorandNetwork from '@providers/AlgorandNetwork'

import { useAlgorandContext } from './AlgorandContext'

interface IAlgorandWalletsData {
    walletProvider?: AlgorandNetwork
    setWalletProvider: React.Dispatch<React.SetStateAction<AlgorandNetwork>>
    isLoadingContext: boolean
    setIsLoadingContext: React.Dispatch<React.SetStateAction<boolean>>
    estimatedGasFee: string
    setEstimatedGasFee: React.Dispatch<React.SetStateAction<string>>
    estimatedTotalCost: string
    setEstimatedTotalCost: React.Dispatch<React.SetStateAction<string>>
    mintResults: Record<string, unknown>[]
    handleMintResults: (mintResult: Record<string, unknown>[]) => void
    metadataResults: IMetadataProperties[]
    handleMetadataResults: (metadataResult: IMetadataProperties[]) => void

    // FROM ALGOSIGNER
    balance: string
    connectAlgosignerWallet: () => Promise<boolean>
    isConnected: boolean
    handleMint: () => Promise<boolean>
    loadingMessage: string
    suggestedGasFees: string
    handleWithdrawl: (event: React.SyntheticEvent<HTMLButtonElement>) => Promise<void>
    truncatedAddress: string
    truncatedContractAddress: string
}

export const AlgorandWallets = React.createContext({} as IAlgorandWalletsData)

export const AlgorandWalletsProvider: React.FC = ({ children }) => {
    const { t } = useTranslation()
    const { setShouldWarning, setWarningMessage, setCurrentWallet } = useMainContext()
    const { currentMintPrice, contractAddress, currentContractAddress, timer, selectedOption } = useAlgorandContext()
    const [walletProvider, setWalletProvider] = React.useState<AlgorandNetwork>()
    const [isLoadingContext, setIsLoadingContext] = React.useState(false)
    const [estimatedGasFee, setEstimatedGasFee] = React.useState('0')
    const [estimatedTotalCost, setEstimatedTotalCost] = React.useState(currentMintPrice)
    const [mintResults, setMintResults] = React.useState<TAssetInfoResult[]>([])
    const [metadataResults, setMetadataResults] = React.useState([] as IMetadataProperties[])
    const [truncatedAddress, setTruncatedAddress] = React.useState('')
    const [truncatedContractAddress, setTruncatedContractAddress] = React.useState('')
    // FROM ALGOSIGNER
    const [balance, setBalance] = React.useState('0')
    const [isConnected, setIsConnected] = React.useState(false)
    const [loadingMessage, setLoadingMessage] = React.useState<string | never>(t('network.wallet.wait'))
    const [suggestedGasFees, setSuggestedGasFees] = React.useState('0')
    const [currentWalletAddress, setCurrentWalletAddress] = React.useState('')

    const handleMintResults = React.useCallback(
        (mintResult: TAssetInfoResult[]) => {
            setMintResults([...mintResults, ...mintResult])
        },
        [mintResults],
    )
    const handleMetadataResults = React.useCallback(
        (metadataResult: IMetadataProperties[]) => {
            setMetadataResults([...metadataResults, ...metadataResult])
        },
        [metadataResults],
    )

    const connectAlgosignerWallet = React.useCallback(async () => {
        setLoadingMessage(t('network.wallet.connect'))
        let isAlgosignerConnected = false
        console.log('walletProvider.getCurrentWallet()', walletProvider?.getCurrentWallet())
        if (walletProvider) {
            isAlgosignerConnected = await handleConnectWalletController(
                walletProvider,
                setLoadingMessage,
                setBalance,
                setIsConnected,
                setShouldWarning,
                setWarningMessage,
            )
        }
        if (walletProvider && isAlgosignerConnected) {
            const accounts = await walletProvider.getCurrentAccount()
            setCurrentWalletAddress(accounts[0])
        }
        return isAlgosignerConnected
    }, [setShouldWarning, setWarningMessage, t, walletProvider])

    const estimateGasPrice = React.useCallback(() => {
        setLoadingMessage(t('network.wallet.estimating'))
        handleEstimateGasPriceController(setSuggestedGasFees)
        setLoadingMessage(t('network.wallet.estimated'))
    }, [t])

    const handleWhiteList = React.useCallback(async () => {
        setLoadingMessage(t('network.wallet.whitelist.handling'))
        let isInWhiteList
        if (walletProvider) {
            isInWhiteList = await handleWhiteListsController(timer.endPoints, walletProvider)
        }
        console.log('isInWhiteList', isInWhiteList)
        if (isInWhiteList) {
            setLoadingMessage(t('network.wallet.mint.minting'))
            return true
        }
        setLoadingMessage(t('network.wallet.whiteList.fail'))
        setWarningMessage('Not in white list, try again later')
        setShouldWarning(true)
        return false
    }, [setShouldWarning, setWarningMessage, t, timer.endPoints, walletProvider])

    const handleMint = React.useCallback(async () => {
        const shouldMint = await handleWhiteList()
        console.log('shouldMint', shouldMint)
        let isMinted = false
        if (shouldMint && walletProvider) {
            setLoadingMessage(t('network.wallet.mint.minting'))
            isMinted = await handleMintController(
                balance,
                currentMintPrice,
                suggestedGasFees,
                contractAddress[currentContractAddress],
                selectedOption,
                walletProvider,
                handleMintResults,
                handleMetadataResults,
                setLoadingMessage,
                setShouldWarning,
                setWarningMessage,
            )
        }
        isMinted && setIsConnected(false)
        return isMinted
    }, [
        handleWhiteList,
        t,
        balance,
        currentMintPrice,
        suggestedGasFees,
        contractAddress,
        currentContractAddress,
        selectedOption,
        walletProvider,
        handleMintResults,
        handleMetadataResults,
        setShouldWarning,
        setWarningMessage,
    ])

    const handleWithdrawl = React.useCallback(
        async (event: React.SyntheticEvent<HTMLButtonElement>) => {
            setIsLoadingContext(true)
            if (walletProvider) {
                await handleWithdrawController(
                    metadataResults,
                    walletProvider,
                    contractAddress[currentContractAddress],
                    Number(event.currentTarget.value),
                    setShouldWarning,
                    setWarningMessage,
                )
            }
            setIsLoadingContext(false)
            window.alert('Transfer complete!')
        },
        [contractAddress, currentContractAddress, metadataResults, setShouldWarning, setWarningMessage, walletProvider],
    )

    React.useEffect(() => {
        estimateGasPrice()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    React.useEffect(() => {
        if (walletProvider) {
            setTruncatedAddress(truncateString(currentWalletAddress, __MAX_ELEMENTS__))
            setCurrentWallet(walletProvider.getCurrentWallet())
        }
    }, [walletProvider])

    React.useEffect(() => {
        if (contractAddress) {
            setTruncatedContractAddress(truncateString(contractAddress[currentContractAddress], __MAX_ELEMENTS__))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const algorandWallets = React.useMemo(
        () => ({
            walletProvider,
            setWalletProvider,
            isLoadingContext,
            setIsLoadingContext,
            estimatedGasFee,
            setEstimatedGasFee,
            estimatedTotalCost,
            setEstimatedTotalCost,
            mintResults,
            handleMintResults,
            metadataResults,
            handleMetadataResults,
            balance,
            connectAlgosignerWallet,
            handleMint,
            isConnected,
            loadingMessage,
            suggestedGasFees,
            handleWithdrawl,
            truncatedAddress,
            truncatedContractAddress,
        }),
        [
            walletProvider,
            isLoadingContext,
            estimatedGasFee,
            estimatedTotalCost,
            mintResults,
            handleMintResults,
            metadataResults,
            handleMetadataResults,
            balance,
            connectAlgosignerWallet,
            handleMint,
            isConnected,
            loadingMessage,
            suggestedGasFees,
            handleWithdrawl,
            truncatedAddress,
            truncatedContractAddress,
        ],
    )

    return <AlgorandWallets.Provider value={algorandWallets}>{children}</AlgorandWallets.Provider>
}

export const useAlgorandWalletsContext = (): IAlgorandWalletsData => {
    const context = React.useContext(AlgorandWallets)
    if (!context) throw new Error('useAlgorandWallets must be used within an AlgorandWalletsProvider')
    return context
}
