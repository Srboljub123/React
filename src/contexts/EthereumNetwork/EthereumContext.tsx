import React from 'react'

import config from '@common/configs'
import { IHandleRemainedTokenCount } from '@controllers/AlgorandController/Public/handleRemainedTokenCount.controller'
import { handleRemainedTokenCountController, handleContractNameController } from '@controllers/EthereumController'
import EthereumNetwork from '@providers/EthereumNetwork'

import { EthereumWalletsProvider } from './EthereumWalletsContext'
import { handleMintPriceController } from '@controllers/EthereumController/Public/handleMintPrice.controller'

interface IEthereumContextData {
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
    salesBehavior: ISalesBehavior
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

export const EthereumContext = React.createContext({} as IEthereumContextData)

export const EthereumProvider: React.FC<IMainProvider> = ({
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

    const [selectedOption, setSelectedOption] = React.useState<number>(1)
    const [remainedTokenCount, setRemainedTokenCount] = React.useState(-1)
    const [totalSupply, setTotalSupply] = React.useState(0)

    const handleChange = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedOption(Number(event.target.value))
    }, [])

    const getRemainedTokenCount = React.useCallback(async () => {
        // Define Provider
        const provider = new EthereumNetwork(config.networks.ethereum[blockchain])
        return await handleRemainedTokenCountController(contract, contractAddress[currentContractAddress], provider)
    }, [contract, blockchain, contractAddress, currentContractAddress])

    React.useEffect(() => {
        getRemainedTokenCount().then(({ tokenIdCounter, totalSupply }) => {
            console.log(totalSupply - tokenIdCounter)
            setRemainedTokenCount(tokenIdCounter)
            setTotalSupply(totalSupply)
        })
    }, [network, currentContractAddress, setCurrentContractAddress, getRemainedTokenCount])

    const getContractName = React.useCallback(async () => {
        const provider = new EthereumNetwork(config.networks.ethereum[blockchain])
        return await handleContractNameController(contract, contractAddress[currentContractAddress], provider)
    }, [contract, blockchain, contractAddress, currentContractAddress])

    React.useEffect(() => {
        getContractName().then(contract => {
            setContractName(contract)
        })
    }, [network, currentContractAddress, setCurrentContractAddress, getContractName])

    const getMintPrice = React.useCallback(async () => {
        const provider = new EthereumNetwork(config.networks.ethereum[blockchain])
        return await handleMintPriceController(
            contract,
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

    const ethereumContext = React.useMemo(
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
        <EthereumContext.Provider value={ethereumContext}>
            <EthereumWalletsProvider>{children}</EthereumWalletsProvider>
        </EthereumContext.Provider>
    )
}

export const useEthereumContext = (): IEthereumContextData => {
    const context = React.useContext(EthereumContext)
    if (!context) throw new Error('useEthereumContext must be used within an EthereumProvider')
    return context
}
