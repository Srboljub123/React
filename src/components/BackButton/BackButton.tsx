import React from 'react'

import { ReactComponent as ArrowLeft } from '@common/public/assets/arrowLeft.svg'

import { BackButtonContainer, GoBackMessage } from './styles'

interface IBackButtonProperties {
    handleClick: () => void
    message: string
    hasCaret?: boolean
    isBackDisabled?: boolean
}

const BackButton: React.FC<IBackButtonProperties> = ({ handleClick, message, hasCaret, isBackDisabled = false }) => {
    return (
        <BackButtonContainer onClick={handleClick} disabled={isBackDisabled}>
            {hasCaret && <ArrowLeft />}
            <GoBackMessage>{message}</GoBackMessage>
        </BackButtonContainer>
    )
}

export default BackButton
