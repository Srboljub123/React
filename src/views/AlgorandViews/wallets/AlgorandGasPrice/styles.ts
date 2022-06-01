import styled, { keyframes } from 'styled-components'

export const GasPriceContainer = styled.div`
    margin: 0 1rem;
`
export const GasPriceItemContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 1rem 0;
`

export const GasPriceItemLeft = styled.p`
    font-size: 1.25rem;
    font-weight: bolder;
    color: ${properties => properties.theme.variables.colorGray.primary};
    @media only screen and (max-width: 960px) {
        font-size: 1.125rem;
    }
`

const fadeIn = keyframes`
    0% { opacity: 0; }
    100% { opacity: 1; }
`

const fadeOut = keyframes`
    0% { opacity: 1; }
    100% { opacity: 0; }
`

interface IGasPriceItemRight {
    isFadingIn: boolean
}

export const GasPriceItemRight = styled.p<IGasPriceItemRight>`
    font-size: 1.5rem;
    font-weight: bolder;
    opacity: ${properties => (properties.isFadingIn ? '1' : '0')};
    color: ${properties => properties.theme.variables.colorGray.secondary};
    animation: ${properties => (properties.isFadingIn ? fadeIn : fadeOut)} 1s;
    @media only screen and (max-width: 960px) {
        font-size: 1.125rem;
    }
`
