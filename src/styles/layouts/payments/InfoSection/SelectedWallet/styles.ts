import styled from 'styled-components'

export const SelectedWalletConainer = styled.div``

export const SelectedWalletTitle = styled.h3`
    height: 18px;
    margin: 1rem 0;
    font-family: ${properties => properties.theme.variables.fontFamily};
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    line-height: 18px;

    color: ${properties => properties.theme.variables.colorText};
`

export const SelectedWalletRow = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-bottom: 1rem;
`

export const SelectedWalletRowBetween = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
`

export const SelectedWalletWallet = styled.p`
    height: 18px;

    font-family: ${properties => properties.theme.variables.fontFamily};
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 18px;

    color: ${properties => properties.theme.variables.colorText};
`

export const SelectedWalletAddress = styled.p`
    height: 18px;

    font-family: ${properties => properties.theme.variables.fontFamily};
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 18px;

    color: ${properties => properties.theme.variables.colorText};
`

export const DisconnectWallet = styled.button`
    height: 13px;
    margin-left: 1rem;
    font-family: ${properties => properties.theme.variables.fontFamily};
    font-style: normal;
    font-weight: 600;
    font-size: 12px;
    line-height: 13px;
    background: transparent;
    border: none;
    color: #f90215;
    cursor: pointer;
`

export const SelectedWalletProvider = styled.div`
    /* display: flex;
    align-items: center;
    justify-content: center; */
    background: ${properties => properties.theme.variables.colorBackground};
    border: 1px solid ${properties => properties.theme.variables.colorGray.secondary};
    box-sizing: border-box;
    /* width: 400px; */
    div {
        width: 400px;
        /* width: 80%; */
        display: flex;
        justify-content: flex-start;
        align-items: center;

        font-family: ${properties => properties.theme.variables.fontFamily};
        font-style: normal;
        font-weight: bold;
        font-size: 16px;
        line-height: 18px;
        text-transform: capitalize;
        /* identical to box height */

        color: ${properties => properties.theme.variables.colorText};
        padding: 1rem;
        border: none;
        /* border-radius: 0.5rem; */
        background: transparent;
        img {
            width: 24px;
            height: 24px;
            margin-right: 1rem;
        }
    }
    p {
        height: 25px;
        padding: 0 1rem;
        font-family: ${properties => properties.theme.variables.fontFamily};
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        line-height: 150%;
        color: ${properties => properties.theme.variables.colorText};
    }
`
