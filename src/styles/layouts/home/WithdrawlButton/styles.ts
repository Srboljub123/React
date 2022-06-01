import styled from 'styled-components'

type TBuyBidButtonProperties = {
    isDisabled?: boolean
}
export const WithdrawlButtonContainer = styled.button<TBuyBidButtonProperties>`
    text-align: center;
    border: none;
    background: ${properties =>
        properties.isDisabled ? properties.theme.variables.colorGray.primary : properties.theme.variables.colorPrimary};
    color: ${properties => properties.theme.variables.colorBackground};
    padding: 2rem;
    cursor: ${properties => (properties.isDisabled ? 'default' : 'pointer')};
    font-size: 1.3rem;
    text-transform: uppercase;
    a {
        text-decoration: none;
        color: ${properties => properties.theme.variables.colorBackground};
    }
`
