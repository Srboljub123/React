import React from 'react'

import { ReactComponent as CloseIcon } from '@common/public/assets/close.svg'

import {
    Container,
    BackDrop,
    Wrapper,
    Header,
    Title,
    Body,
    Message,
    Footer,
    ConfirmActioButton,
    CancelActionButton,
    CloseButton,
} from './styles'

interface IMyDialogProperties {
    title?: string
    message?: string
    onBackDrop: (event: React.SyntheticEvent<HTMLButtonElement, MouseEvent>) => void
    onConfirm?: (event: React.SyntheticEvent<HTMLButtonElement, MouseEvent>) => void
}

const AlgorandModal: React.FC<IMyDialogProperties> = ({ title, message, onBackDrop, onConfirm, children }) => {
    return (
        <Container>
            <BackDrop />
            <Wrapper>
                <Header>
                    <Title>{title}</Title>
                    <CloseButton onClick={onBackDrop}>
                        <CloseIcon />
                    </CloseButton>
                </Header>
                <Body>
                    <Message>{message}</Message>
                    {children}
                </Body>
                <Footer>
                    <ConfirmActioButton onClick={onConfirm}>Yes, disconnect wallet</ConfirmActioButton>
                    <CancelActionButton onClick={onBackDrop}>Cancel</CancelActionButton>
                </Footer>
            </Wrapper>
        </Container>
    )
}

export default AlgorandModal
