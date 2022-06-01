import React from 'react'

import { ReactComponent as CloseIcon } from '@common/public/assets/close.svg'
import { ReactComponent as WalletInfo } from '@common/public/assets/walletInfo.svg'
import { ReactComponent as WalletWarning } from '@common/public/assets/walletWarning.svg'

import {
    WalletDangerMessage,
    WalletInfosContainer,
    WalletInstallLink,
    WalletLeftContainer,
    WalletWarningMessage,
    WalletWarningsContainer,
    WarningCloseButton,
} from './styles'

interface IWalletWarningsProperties {
    waringMessage: string
    setShouldWarning: React.Dispatch<React.SetStateAction<boolean>>
}

const WalletWarnings: React.FC<IWalletWarningsProperties> = ({ waringMessage, setShouldWarning }) => {
    const handleCloseWarnings = React.useCallback(() => {
        setShouldWarning(false)
    }, [setShouldWarning])
    return (
        <>
            {waringMessage.includes('installed') ? (
                <WalletInfosContainer>
                    <WalletLeftContainer>
                        <WalletWarning />
                        <WalletWarningMessage>{waringMessage}</WalletWarningMessage>
                    </WalletLeftContainer>
                    <WalletInstallLink href="http://" target="_blank" rel="noopener noreferrer">
                        Install
                    </WalletInstallLink>
                </WalletInfosContainer>
            ) : (
                <WalletWarningsContainer>
                    <WalletLeftContainer>
                        <WalletInfo />
                        <WalletDangerMessage>{waringMessage}</WalletDangerMessage>
                    </WalletLeftContainer>
                    <WarningCloseButton onClick={handleCloseWarnings}>
                        <CloseIcon />
                    </WarningCloseButton>
                </WalletWarningsContainer>
            )}
        </>
    )
}

export default WalletWarnings
