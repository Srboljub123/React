import styled from 'styled-components'

export const BackButtonContainer = styled.button`
    border: none;
    background: transparent;
    height: min-content;
    display: flex;
    align-items: center;
    cursor: pointer;
    font-family: ${properties => properties.theme.variables.fontFamily};
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 18px;
    color: ${properties => properties.theme.variables.colorText};
    svg {
        path {
            fill: ${properties => properties.theme.variables.colorText};
        }
    }
    &:disabled {
        color: ${properties => properties.theme.variables.colorGray.primary};
        cursor: default;
        &:hover {
            color: none;
        }
    }
    @media only screen and (max-height: 900px) {
        margin-top: 1rem;
    }
`

export const GoBackMessage = styled.p`
    font-size: 1rem;
    font-weight: bolder !important;
    margin-left: 1rem;
    @media only screen and (max-height: 900px) {
        font-size: 1rem;
    }
`
