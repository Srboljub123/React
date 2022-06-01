import styled from 'styled-components'

export const AlgorandCheckoutContainer = styled.section`
    @media only screen and (max-width: 960px) {
        width: 98%;
    }
`

export const AlgorandCheckoutTitle = styled.h2`
    height: 27px;

    font-family: ${properties => properties.theme.variables.fontFamily};
    font-style: normal;
    font-weight: 600;
    font-size: 24px;
    line-height: 27px;

    color: ${properties => properties.theme.variables.colorText};
`

interface IAlgorandCheckoutRowProperties {
    alignCenter?: boolean
}

export const AlgorandCheckoutRow = styled.div<IAlgorandCheckoutRowProperties>`
    display: flex;
    align-items: ${properties => (properties.alignCenter ? 'center' : 'flex-start')};
    justify-content: space-between;
    margin: 2rem 0;
`

export const AlgorandCheckoutCol = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
`

export const AlgorandCheckoutLeftItem = styled.strong`
    height: 18px;

    font-family: ${properties => properties.theme.variables.fontFamily};
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    line-height: 18px;

    color: ${properties => properties.theme.variables.colorText};
`

export const AlgorandCheckoutRightItem = styled.p`
    height: 18px;

    font-family: ${properties => properties.theme.variables.fontFamily};
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 18px;

    color: ${properties => properties.theme.variables.colorText};
`

export const AlgorandCheckoutRightItemLight = styled.p`
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

export const AlgorandCheckoutDivider = styled.div`
    border: 1px solid ${properties => properties.theme.variables.colorGray.secondary};
`
export const AlgorandCheckoutTotalDivider = styled.div`
    border: 2px solid #000000;
`

export const AlgorandCheckoutButtonsContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const AlgorandCheckoutItemBox = styled.div`
    height: 36px;
    width: 64px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
`

export const AlgorandFeedbackItem = styled.span`
    position: absolute;
    height: 13px;

    font-family: ${properties => properties.theme.variables.fontFamily};
    font-style: normal;
    font-weight: 700;
    font-size: 12px;
    line-height: 13px;
    transform: translateY(-24px);
    color: #f90215;
`

export const QuantityInput = styled.input`
    font-family: ${properties => properties.theme.variables.fontFamily};
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
        path {
            fill: ${properties => (properties.isIncreasing ? '#000000' : '#CECECE')};
        }
    }
`

export const ChevronButtonDown = styled.button<IChevronProperties>`
    background: transparent;
    border: none;
    transform: translateY(-4px) rotate(180deg);

    svg {
        path {
            fill: ${properties => (!properties.isIncreasing ? '#000000' : '#CECECE')};
        }
    }
`
