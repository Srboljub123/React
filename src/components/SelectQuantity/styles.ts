import styled from 'styled-components'

export const QuantityInputContainer = styled.div`
    height: 36px;
    width: 64px;
    margin: 0.5rem 0;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;

    @media only screen and (max-width: 900px) {
        height: 64px;
        width: 96px;
    }
`

export const QuantityInput = styled.input`
    font-family: ${properties => properties.theme.variables.fontFamily};
    font-weight: 600;
    color: ${properties => properties.theme.variables.colorText};
    background: ${properties => properties.theme.variables.colorBackground};
    &:focus {
        border-color: ${properties => properties.theme.variables.colorPrimary};
        /* box-shadow: ${properties => properties.theme.variables.boxShadow}; */
        color: ${properties => properties.theme.variables.colorText};
        background: ${properties => properties.theme.variables.colorBackground};
        box-shadow: 0 0 0 0.25rem rgb(0 214 50 / 50%);
    }
    &:active {
        border-color: ${properties => properties.theme.variables.colorPrimary};
    }
    &:active:focus {
        /* box-shadow: ${properties => properties.theme.variables.boxShadow}; */
        box-shadow: 0 0 0 0.25rem rgb(0 214 50 / 50%);
    }

    @media only screen and (max-width: 900px) {
        /* height: 36px;
        width: 64px; */
        font-size: 2rem;
    }
`

export const ChevronButtonsContainer = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    transform: translateX(16px);
`

interface IChevronProperties {
    isIncreasing: boolean
}

export const ChevronButtonUp = styled.button<IChevronProperties>`
    background: transparent;
    border: none;
    transform: translateY(4px);

    svg {
        fill: ${properties =>
            properties.isIncreasing
                ? properties.theme.variables.colorPrimary
                : properties.theme.variables.colorGray.secondary};
    }

    @media only screen and (max-width: 900px) {
        transform: translateY(12px);
    }
`

export const ChevronButtonDown = styled.button<IChevronProperties>`
    background: transparent;
    border: none;
    transform: translateY(-4px) rotate(180deg);

    svg {
        fill: ${properties =>
            !properties.isIncreasing
                ? properties.theme.variables.colorPrimary
                : properties.theme.variables.colorGray.secondary};
    }

    @media only screen and (max-width: 900px) {
        transform: translateY(-12px) rotate(180deg);
    }
`
