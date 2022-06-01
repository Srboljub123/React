import { Container, Row } from 'react-bootstrap'
import styled from 'styled-components'

export const WalletWarningsContainer = styled(Container)`
    height: 68px;
    max-width: 1024px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    background: ${properties => properties.theme.variables.colorDanger.secondary};
    border: 1px solid ${properties => properties.theme.variables.colorDanger.primary};
    box-sizing: border-box;
    margin-top: 2rem;
    svg {
        fill: ${properties => properties.theme.variables.colorDanger.primary};
        width: fit-content;
    }
`

export const WalletInfosContainer = styled(Container)`
    height: 68px;
    max-width: 1024px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    background: ${properties => properties.theme.variables.colorWarning.secondary};
    border: 1px solid ${properties => properties.theme.variables.colorWarning.primary};
    box-sizing: border-box;
    margin-top: 2rem;
    svg {
        fill: ${properties => properties.theme.variables.colorWarning.primary};
        width: fit-content;
    }
`

export const WalletLeftContainer = styled(Row)`
    width: fit-content;
    flex-wrap: nowrap;
    align-items: center;
`

export const WalletWarningMessage = styled.span`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 12px 16px;
    height: 48px;
    font-family: ${properties => properties.theme.variables.fontFamily};
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 16px;
    text-align: left;
    /* color: ${properties => properties.theme.variables.colorDanger.primary}; */
`

export const WalletDangerMessage = styled.span`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 12px 16px;
    height: 48px;
    font-family: ${properties => properties.theme.variables.fontFamily};
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 16px;
    text-align: left;
    color: ${properties => properties.theme.variables.colorDanger.primary};
`

export const WarningCloseButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: none;
    svg {
        fill: ${properties => properties.theme.variables.colorDanger.primary};
        path {
            stroke: ${properties => properties.theme.variables.colorDanger.primary};
            fill: ${properties => properties.theme.variables.colorDanger.primary};
        }
    }
`

export const WalletInstallLink = styled.a`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 10px 16px 8px;
    width: 84px;
    height: 36px;
    border: 1px solid ${properties => properties.theme.variables.colorGray.primary};
    box-sizing: border-box;

    text-decoration: none;
    font-family: ${properties => properties.theme.variables.fontFamily};
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 18px;
    color: ${properties => properties.theme.variables.colorText};

    &:hover {
        color: ${properties => properties.theme.variables.colorWarning.primary};
        background-color: ${properties => properties.theme.variables.colorWarning.secondary};
        opacity: 0.8;
    }
`
