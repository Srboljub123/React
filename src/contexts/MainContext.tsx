import React from 'react'

import config from '@common/configs'

import { AlgorandProvider } from './AlgorandNetwork/AlgorandContext'
import { EthereumProvider } from './EthereumNetwork/EthereumContext'

interface IMainContextData {
    config: IConfig
    contract: IContract

    assetUrl: string
    assetThumbnail: string
    contractAddress: string[]
    mintPrice: string
    maxQuantity: number
    network: string
    blockchain: string
    paymentMethods: TPaymentMethods
    timer: ITimer

    shouldWarning: boolean
    setShouldWarning: React.Dispatch<React.SetStateAction<boolean>>
    warningMessage: string
    setWarningMessage: React.Dispatch<React.SetStateAction<string>>
    currentWallet: string
    setCurrentWallet: React.Dispatch<React.SetStateAction<string>>
    transactionHash: string
    setTransactionHash: React.Dispatch<React.SetStateAction<string>>
}

export const MainContext = React.createContext({} as IMainContextData)

const isUserDeviceMobile = () => {
    const userDevice = navigator.userAgent
    const isMobile = /iemobile|windows phone|lumia/i.test(userDevice)
        ? 'w'
        : /iPhone|iP[ao]d/.test(userDevice)
        ? 'i'
        : /Android/.test(userDevice)
        ? 'a'
        : /BlackBerry|PlayBook|BB10/.test(userDevice)
        ? 'b'
        : /Mobile Safari/.test(userDevice)
        ? 's'
        : /webos|mobile|tablet|opera mini|\bcrmo\/|opera mobi/i.test(userDevice)
        ? true
        : false

    return isMobile
}

const validateWallets = (paymentMethods: TPaymentMethods) => {
    const isMobile = isUserDeviceMobile()
    const availableWallets = Object.entries(config.wallets)
    const supportedWallets = []
    if (isMobile) {
        for (const wallet of availableWallets) {
            wallet[1].includes('mobile') && paymentMethods.includes(wallet[0]) && supportedWallets.push(wallet[0])
        }
    } else {
        for (const wallet of availableWallets) {
            wallet[1].includes('web') && paymentMethods.includes(wallet[0]) && supportedWallets.push(wallet[0])
        }
    }
    return supportedWallets
}

export const MainProvider: React.FC<IMainProvider> = ({
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
    salesBehavior,
    timer,
}) => {
    const [shouldWarning, setShouldWarning] = React.useState(false)
    const [warningMessage, setWarningMessage] = React.useState('')
    const [currentWallet, setCurrentWallet] = React.useState('')
    const [transactionHash, setTransactionHash] = React.useState('')
    // const handleWarningMessages = React.useCallback((message: string) => {
    //     setWarningMessage(message)
    //     setShouldWarning(true)
    // }, [])

    paymentMethods = React.useMemo(() => {
        return validateWallets(paymentMethods)
    }, [paymentMethods])

    const mainContext = React.useMemo(
        () => ({
            contract,
            config,
            assetUrl,
            children,
            contractAddress,
            marketplaceUrl,
            socialMedias,
            mintPrice,
            assetThumbnail,
            maxQuantity,
            network,
            blockchain,
            paymentMethods,
            salesBehavior,
            timer,
            shouldWarning,
            setShouldWarning,
            warningMessage,
            setWarningMessage,
            currentWallet,
            setCurrentWallet,
            transactionHash,
            setTransactionHash,
        }),
        [
            contract,
            assetUrl,
            children,
            contractAddress,
            marketplaceUrl,
            socialMedias,
            mintPrice,
            assetThumbnail,
            maxQuantity,
            network,
            blockchain,
            paymentMethods,
            salesBehavior,
            timer,
            shouldWarning,
            setShouldWarning,
            warningMessage,
            setWarningMessage,
            currentWallet,
            setCurrentWallet,
            transactionHash,
            setTransactionHash,
        ],
    )

    if (network === 'ethereum') {
        return (
            <MainContext.Provider value={mainContext}>
                <EthereumProvider
                    assetUrl={assetUrl}
                    contract={contract}
                    contractAddress={contractAddress}
                    marketplaceUrl={marketplaceUrl}
                    socialMedias={socialMedias}
                    mintPrice={mintPrice}
                    assetThumbnail={assetThumbnail}
                    maxQuantity={maxQuantity}
                    network={network}
                    blockchain={blockchain}
                    paymentMethods={paymentMethods}
                    salesBehavior={salesBehavior}
                    timer={timer}
                >
                    {children}
                </EthereumProvider>
            </MainContext.Provider>
        )
    } else if (network === 'algorand') {
        return (
            <MainContext.Provider value={mainContext}>
                <AlgorandProvider
                    assetUrl={assetUrl}
                    contract={contract}
                    contractAddress={contractAddress}
                    marketplaceUrl={marketplaceUrl}
                    socialMedias={socialMedias}
                    mintPrice={mintPrice}
                    assetThumbnail={assetThumbnail}
                    maxQuantity={maxQuantity}
                    network={network}
                    blockchain={blockchain}
                    paymentMethods={paymentMethods}
                    salesBehavior={salesBehavior}
                    timer={timer}
                >
                    {children}
                </AlgorandProvider>
            </MainContext.Provider>
        )
    }

    return <MainContext.Provider value={mainContext}>{children}</MainContext.Provider>
}

export const useMainContext = (): IMainContextData => {
    const context = React.useContext(MainContext)
    if (!context) throw new Error('useMainContext must be used within an MainProvider')
    return context
}
