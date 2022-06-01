import React from 'react'

import config from '@common/configs'
import {
    handleRemainedTokenCountController,
    handleContractNameController,
    handleMintPriceController,
} from '@controllers/AlgorandController'
import { IHandleRemainedTokenCount } from '@controllers/AlgorandController/Public/handleRemainedTokenCount.controller'

import { AlgorandWalletsProvider } from './AlgorandWalletsContext'
import algosdk from 'algosdk'

interface IAlgorandContextData {
    config: IConfig

    isSoldOut: boolean
    setIsSoldOut: React.Dispatch<React.SetStateAction<boolean>>

    stage: number
    setStage: React.Dispatch<React.SetStateAction<number>>

    selectedOption: number
    setSelectedOption: React.Dispatch<React.SetStateAction<number>>

    assetUrl: string
    assetThumbnail: string
    contractAddress: string[]
    currentContractAddress: number
    contractName: string
    marketplaceUrl: IMarketPlaceUrl[]
    socialMedias: ISocialMedias[]
    currentMintPrice: string
    // config: IConfig
    contract: IContract
    maxQuantity: number
    network: string
    blockchain: string
    paymentMethods: TPaymentMethods
    timer: ITimer

    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    remainedTokenCount: number
    totalSupply: number
    getRemainedTokenCount: () => Promise<IHandleRemainedTokenCount>
}

export const AlgorandContext = React.createContext({} as IAlgorandContextData)

export const AlgorandProvider: React.FC<IMainProvider> = ({
    assetUrl,
    children,
    contract,
    contractAddress,
    marketplaceUrl,
    socialMedias,
    mintPrice,
    assetThumbnail,
    maxQuantity,
    network,
    blockchain,
    paymentMethods,
    timer,
    salesBehavior,
}) => {
    const [isSoldOut, setIsSoldOut] = React.useState(false)
    const [stage, setStage] = React.useState(0)

    const [currentContractAddress, setCurrentContractAddress] = React.useState(0)
    const [contractName, setContractName] = React.useState('')
    const [currentMintPrice, setCurrentMintPrice] = React.useState(mintPrice)

    const [selectedOption, setSelectedOption] = React.useState(1)
    const [remainedTokenCount, setRemainedTokenCount] = React.useState(-1)
    const [totalSupply, setTotalSupply] = React.useState(0)

    const handleChange = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedOption(Number(event.target.value))
    }, [])

    const getRemainedTokenCount = React.useCallback(async () => {
        return await handleRemainedTokenCountController(
            config,
            network,
            blockchain,
            contractAddress,
            setCurrentContractAddress,
            setIsSoldOut,
        )
    }, [network, blockchain, contractAddress])

    React.useEffect(() => {
        getRemainedTokenCount().then(({ tokenIdCounter, totalSupply }) => {
            setRemainedTokenCount(tokenIdCounter)
            setTotalSupply(totalSupply)
        })
    }, [network, currentContractAddress, setCurrentContractAddress, getRemainedTokenCount])

    const getContractName = React.useCallback(async () => {
        return await handleContractNameController(config, network, blockchain, contractAddress)
    }, [network, blockchain, contractAddress])

    React.useEffect(() => {
        getContractName().then(contract => {
            setContractName(contract)
        })
    }, [network, currentContractAddress, setCurrentContractAddress, getContractName])

    const getMintPrice = React.useCallback(async () => {
        const defaultProvider = (config.networks[network] as IAlgorand)[blockchain].provider_param
        const provider = new algosdk.Algodv2(defaultProvider.token, defaultProvider.url, defaultProvider.port)
        return await handleMintPriceController(
            contractAddress[currentContractAddress],
            provider,
            salesBehavior,
            mintPrice,
        )
    }, [contract, blockchain, contractAddress, currentContractAddress, salesBehavior, mintPrice])

    React.useEffect(() => {
        getMintPrice().then(price => {
            setCurrentMintPrice(price)
        })
    }, [network, currentContractAddress, setCurrentContractAddress, getMintPrice])

    const algorandContext = React.useMemo(
        () => ({
            contract,
            config,
            stage,
            setStage,
            isSoldOut,
            setIsSoldOut,
            selectedOption,
            setSelectedOption,
            assetUrl,
            children,
            contractAddress,
            currentContractAddress,
            contractName,
            marketplaceUrl,
            socialMedias,
            currentMintPrice,
            assetThumbnail,
            maxQuantity,
            network,
            blockchain,
            paymentMethods,
            timer,
            handleChange,
            remainedTokenCount,
            totalSupply,
            getRemainedTokenCount,
            salesBehavior,
        }),
        [
            contract,
            stage,
            isSoldOut,
            selectedOption,
            assetUrl,
            children,
            contractAddress,
            currentContractAddress,
            contractName,
            marketplaceUrl,
            socialMedias,
            currentMintPrice,
            assetThumbnail,
            maxQuantity,
            network,
            blockchain,
            paymentMethods,
            timer,
            handleChange,
            remainedTokenCount,
            totalSupply,
            getRemainedTokenCount,
            salesBehavior,
        ],
    )

    return (
        <AlgorandContext.Provider value={algorandContext}>
            <AlgorandWalletsProvider>{children}</AlgorandWalletsProvider>
        </AlgorandContext.Provider>
    )
}

export const useAlgorandContext = (): IAlgorandContextData => {
    const context = React.useContext(AlgorandContext)
    if (!context) throw new Error('useAlgorandContext must be used within an AlgorandProvider')
    return context
}
