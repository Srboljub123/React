import styled from 'styled-components'

export const EthereumCheckoutContainer = styled.section`
    width: 400px;
    @media only screen and (max-width: 960px) {
        width: -webkit-fill-available;
    }
`

export const EthereumCheckoutTitle = styled.h2`
    height: 27px;

    font-family: ${properties => properties.theme.variables.fontFamily};
    font-style: normal;
    font-weight: 600;
    font-size: 24px;
    line-height: 27px;

    color: ${properties => properties.theme.variables.colorText};
`

interface IEthereumCheckoutRowProperties {
    alignCenter?: boolean
}

export const EthereumCheckoutRow = styled.div<IEthereumCheckoutRowProperties>`
    display: flex;
    align-items: ${properties => (properties.alignCenter ? 'center' : 'flex-start')};
    justify-content: space-between;
    margin: 2rem 0;
`

interface IEthereumCheckoutColProperties {
    flexStart?: boolean
}

export const EthereumCheckoutCol = styled.div<IEthereumCheckoutColProperties>`
    display: flex;
    flex-direction: column;
    align-items: ${properties => (properties.flexStart ? 'flex-start' : 'flex-end')};
`

export const EthereumCheckoutLeftItem = styled.strong`
    height: 18px;

    font-family: ${properties => properties.theme.variables.fontFamily};
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    line-height: 18px;

    color: ${properties => properties.theme.variables.colorText};
`

export const EthereumCheckoutRightItem = styled.p`
    height: 18px;

    font-family: ${properties => properties.theme.variables.fontFamily};
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 18px;

    color: ${properties => properties.theme.variables.colorText};
`

export const EthereumCheckoutRightItemLight = styled.p`
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

export const EthereumCheckoutDivider = styled.div`
    border: 1px solid ${properties => properties.theme.variables.colorGray.secondary};
`
export const EthereumCheckoutTotalDivider = styled.div`
    border: 2px solid ${properties => properties.theme.variables.colorText};
`

export const EthereumCheckoutButtonsContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: -webkit-fill-available;
`

export const EthereumCheckoutItemBox = styled.div`
    height: 36px;
    width: 64px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
`

export const EthereumFeedbackItem = styled.span`
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
