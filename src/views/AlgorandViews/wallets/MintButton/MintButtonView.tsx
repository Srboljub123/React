import { t } from 'i18next'
import React from 'react'
import { useNavigate } from 'react-router-dom'

import { MintButton } from '@common/library'
import { useAlgorandContext } from '@contexts/AlgorandNetwork/AlgorandContext'
import { useAlgorandWalletsContext } from '@contexts/AlgorandNetwork/AlgorandWalletsContext'
import AlgorandNetwork from '@providers/AlgorandNetwork'

type TMintButtonProperties = {
    handleMint: () => Promise<boolean>
    suggestedGasFees: string
    mintResults: Record<string, unknown>[]
} & React.HTMLProps<HTMLButtonElement>

const MintButtonView: React.FC<TMintButtonProperties> = ({
    children,
    handleMint,
    suggestedGasFees,
    mintResults,
    disabled,
}) => {
    const [isMinting, setIsMinting] = React.useState(false)
    const { isSoldOut, config, blockchain } = useAlgorandContext()
    const { setWalletProvider } = useAlgorandWalletsContext()
    const navigate = useNavigate()

    const handleSuccess = React.useCallback(() => {
        setWalletProvider(new AlgorandNetwork(config.networks.algorand[blockchain]))
        navigate('/success')
    }, [blockchain, config.networks.algorand, mintResults, setWalletProvider])

    const handleError = React.useCallback(() => {
        setIsMinting(false)
        navigate('/payments')
    }, [])

    const handleClick = React.useCallback(async () => {
        setIsMinting(true)
        const isMinted = await handleMint()
        if (isMinted) return handleSuccess()
        return handleError()
    }, [handleError, handleMint, handleSuccess])

    const getMintButtonText = React.useCallback(() => {
        if (isSoldOut) return t('home.soldOut')
        if (suggestedGasFees === '0') return t('home.loading')
        return t('home.mintButton')
    }, [isSoldOut, suggestedGasFees])

    return (
        <MintButton onClick={handleClick} disabled={suggestedGasFees === '0' || isMinting || disabled || !!isSoldOut}>
            {/* {children || !isSoldOut ? t('home.mintButton') : t('home.soldOut')} */}
            {children || getMintButtonText()}
        </MintButton>
    )
}

export default MintButtonView
