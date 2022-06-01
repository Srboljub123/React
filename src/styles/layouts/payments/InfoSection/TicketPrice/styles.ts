import styled, { keyframes } from 'styled-components'

import { FlexColumnAlignCenter } from '@common/styles/mixins'

export const TicketPriceContainer = styled.div`
    ${FlexColumnAlignCenter}
    justify-content: space-evenly;
    width: -webkit-fill-available;
`

export const MintPriceInfo = styled.div`
    width: -webkit-fill-available;
    border-radius: 12px;
    margin-top: 1rem;
`

export const TotalDividerContainer = styled.div`
    display: flex;
    justify-content: center !important;
`

export const TotalDivider = styled.div`
    width: 96%;
    height: 0.125rem;
    background-color: ${properties => properties.theme.variables.colorGray.primary};
    padding: 0;
    margin: 1rem 0 1rem 1rem;
`
const fadeIn = keyframes`
    0% { opacity: 0; }
    100% { opacity: 1; }
`

const fadeOut = keyframes`
    0% { opacity: 1; }
    100% { opacity: 0; }
`

interface ITicketPriceItemRight {
    isFadingIn: boolean
}

export const TicketPriceItemRight = styled.p<ITicketPriceItemRight>`
    font-size: 1.5rem;
    font-weight: bolder;
    opacity: ${properties => (properties.isFadingIn ? '1' : '0')};
    color: ${properties => properties.theme.variables.colorGray.secondary};
    animation: ${properties => (properties.isFadingIn ? fadeIn : fadeOut)} 1s;
`

export const TicketPriceBoldItem = styled.strong`
    height: 18px;

    font-family: ${properties => properties.theme.variables.fontFamily};
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    line-height: 18px;

    color: ${properties => properties.theme.variables.colorText};
`

export const TicketPriceLightItem = styled.p`
    height: 13px;

    font-family: ${properties => properties.theme.variables.fontFamily};
    font-style: normal;
    font-weight: 600;
    font-size: 12px;
    line-height: 13px;
    text-align: right;

    color: ${properties => properties.theme.variables.colorText};

    opacity: 0.5;
`

export const RowContainer = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: 1rem;
`

export const ColContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
`

export const CryptoPrice = styled.p`
    height: 13px;
    margin-top: 0.5rem;
    font-family: ${properties => properties.theme.variables.fontFamily};
    font-style: normal;
    font-weight: 600;
    font-size: 12px;
    line-height: 13px;

    color: ${properties => properties.theme.variables.colorText};

    opacity: 0.5;
`
