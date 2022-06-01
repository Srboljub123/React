import React from 'react'
import { useTranslation } from 'react-i18next'

import { truncateString } from '@common/functions/truncateString'
import { useMainContext } from '@contexts/MainContext'
import {
    handleConnectWalletController,
    handleEstimateGasPriceController,
    handleMintController,
    handleWhiteListsController,
} from '@controllers/EthereumController'
import EthereumNetwork from '@providers/EthereumNetwork'

import { useEthereumContext } from './EthereumContext'

interface IEthereumWalletsData {
    walletProvider?: EthereumNetwork
    setWalletProvider: React.Dispatch<React.SetStateAction<EthereumNetwork>>
    isLoadingContext: boolean
    setIsLoadingContext: React.Dispatch<React.SetStateAction<boolean>>
    estimatedGasFee: string
    setEstimatedGasFee: React.Dispatch<React.SetStateAction<string>>
    estimatedTotalCost: string
    setEstimatedTotalCost: React.Dispatch<React.SetStateAction<string>>
    mintResults: Record<string, unknown>[]
    handleMintResults: (mintResult: Record<string, unknown>) => void
    metadataResults: IMetadataProperties[]
    handleMetadataResults: (metadataResult: IMetadataProperties[]) => void

    // FROM METAMASK
    balance: string
    connectEthereumWallet: () => Promise<boolean>
    isConnected: boolean
    handleMint: () => Promise<boolean>
    loadingMessage: string
    estimateGasPrice: () => Promise<void>
    suggestedGasFees: string
    shouldEStimateGas: boolean
    onMintGasFees: string
    transactionHash: string
    truncatedAddress: string
    truncatedContractAddress: string
    currentWalletAddress: string
}

export const EthereumWallets = React.createContext({} as IEthereumWalletsData)

export const EthereumWalletsProvider: React.FC = ({ children }) => {
    const { t } = useTranslation()
    const { setWarningMessage, setShouldWarning, setCurrentWallet, transactionHash, setTransactionHash } =
        useMainContext()
    const {
        currentMintPrice,
        config,
        blockchain,
        contractAddress,
        currentContractAddress,
        timer,
        selectedOption,
        contract,
        network,
    } = useEthereumContext()
    const [walletProvider, setWalletProvider] = React.useState<EthereumNetwork>()
    const [isLoadingContext, setIsLoadingContext] = React.useState(false)
    const [estimatedGasFee, setEstimatedGasFee] = React.useState('0')
    const [estimatedTotalCost, setEstimatedTotalCost] = React.useState(currentMintPrice)
    const [mintResults, setMintResults] = React.useState<Record<string, unknown>[]>([])

    // MOCK SUCCESS
    const [metadataResults, setMetadataResults] = React.useState([] as IMetadataProperties[])

    // FROM METAMASK
    const [balance, setBalance] = React.useState('0')
    const [isConnected, setIsConnected] = React.useState(false)
    const [loadingMessage, setLoadingMessage] = React.useState<string | never>(t('network.wallet.wait'))
    const [suggestedGasFees, setSuggestedGasFees] = React.useState('0')
    const [shouldEStimateGas, setShouldEstimateGas] = React.useState(false)
    const [onMintGasFees, setOnMintGasFees] = React.useState('0')
    const [truncatedAddress, setTruncatedAddress] = React.useState('')
    const [truncatedContractAddress, setTruncatedContractAddress] = React.useState('')
    const [currentWalletAddress, setCurrentWalletAddress] = React.useState('')

    const handleMintResults = React.useCallback(
        (mintResult: Record<string, unknown>) => {
            setMintResults([...mintResults, mintResult])
        },
        [mintResults],
    )
    const handleMetadataResults = React.useCallback(
        (metadataResult: IMetadataProperties[]) => {
            setMetadataResults([...metadataResults, ...metadataResult])
        },
        [metadataResults],
    )

    // FROM METAMASK

    const connectEthereumWallet = React.useCallback(async () => {
        setLoadingMessage(t('network.wallet.connect'))

        let isEthereumWalletConnected = false
        if (walletProvider) {
            isEthereumWalletConnected = await handleConnectWalletController(
                walletProvider,
                (config.networks[network] as IEthereum)[blockchain].chain_id,
                setLoadingMessage,
                setIsConnected,
                setBalance,
            )
        }
        if (walletProvider && isEthereumWalletConnected) {
            const ethereumAccounts = await walletProvider.getCurrentAccount()
            setCurrentWalletAddress(ethereumAccounts[0])
        }
        return isEthereumWalletConnected
    }, [blockchain, config.networks, network, t, walletProvider])

    const estimateGasPrice = React.useCallback(async () => {
        setLoadingMessage(t('network.wallet.estimating'))
        // Define Provider
        if (walletProvider) {
            await handleEstimateGasPriceController(
                contractAddress[currentContractAddress],
                contract,
                currentMintPrice,
                walletProvider,
                setSuggestedGasFees,
                selectedOption,
                setLoadingMessage,
                setShouldWarning,
                setWarningMessage,
            )
        }

        setLoadingMessage(t('network.wallet.estimated'))
    }, [t, contractAddress, currentContractAddress, contract, currentMintPrice, walletProvider, selectedOption])

    const handleWhiteList = React.useCallback(async () => {
        setLoadingMessage(t('network.wallet.whitelist.handling'))
        // Define Provider
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
        return false
    }, [t, timer.endPoints, walletProvider])

    const handleMint = React.useCallback(async () => {
        const shouldMint = await handleWhiteList()
        console.log('shouldMint', shouldMint)
        let isMinted = false
        if (shouldMint && walletProvider) {
            setLoadingMessage(t('network.wallet.mint.minting'))
            isMinted = await handleMintController(
                contractAddress[currentContractAddress],
                currentMintPrice,
                contract,
                selectedOption,
                walletProvider,
                handleMetadataResults,
                handleMintResults,
                setOnMintGasFees,
                setTransactionHash,
                setShouldWarning,
                setWarningMessage,
            )
        }
        isMinted && setIsConnected(false)
        return isMinted
    }, [
        handleWhiteList,
        walletProvider,
        t,
        contractAddress,
        currentContractAddress,
        currentMintPrice,
        contract,
        selectedOption,
        handleMetadataResults,
        handleMintResults,
        setTransactionHash,
        setShouldWarning,
        setWarningMessage,
    ])

    React.useEffect(() => {
        if (walletProvider) {
            setTruncatedAddress(truncateString(currentWalletAddress, __MAX_ELEMENTS__))
            setCurrentWallet(walletProvider.getCurrentWallet())
        }
    }, [currentWalletAddress, setCurrentWallet, walletProvider])

    React.useEffect(() => {
        if (contractAddress) {
            setTruncatedContractAddress(truncateString(contractAddress[currentContractAddress], __MAX_ELEMENTS__))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [contractAddress])

    // refresh every 10 seconds
    React.useEffect(() => {
        setShouldEstimateGas(true)
        let tenSecondsTimer: NodeJS.Timeout
        if (isConnected) {
            tenSecondsTimer = setTimeout(async () => {
                await estimateGasPrice()
                setShouldEstimateGas(false)
            }, __TEN_SECONDS__)
            loadingMessage === 'Confirming payment...' && clearTimeout(tenSecondsTimer)
            return () => clearTimeout(tenSecondsTimer)
        }

        return () => clearTimeout(tenSecondsTimer)
    }, [estimateGasPrice, isConnected, loadingMessage, shouldEStimateGas])

    const ethereumWallets = React.useMemo(
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
            connectEthereumWallet,
            handleMint,
            isConnected,
            loadingMessage,
            estimateGasPrice,
            shouldEStimateGas,
            suggestedGasFees,
            onMintGasFees,
            transactionHash,
            truncatedAddress,
            truncatedContractAddress,
            currentWalletAddress,
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
            connectEthereumWallet,
            handleMint,
            isConnected,
            loadingMessage,
            estimateGasPrice,
            shouldEStimateGas,
            suggestedGasFees,
            onMintGasFees,
            transactionHash,
            truncatedAddress,
            truncatedContractAddress,
            currentWalletAddress,
        ],
    )

    return <EthereumWallets.Provider value={ethereumWallets}>{children}</EthereumWallets.Provider>
}

export const useEthereumWalletsContext = (): IEthereumWalletsData => {
    const context = React.useContext(EthereumWallets)
    if (!context) throw new Error('useEthereumWallets must be used within an EthereumWalletsProvider')
    return context
}
