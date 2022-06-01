import styled from 'styled-components'

export const PaymentMethodsContainer = styled.div`
    margin-top: 1rem;
`

export const PaymentMethodsTitle = styled.h3`
    height: 18px;
    font-family: ${properties => properties.theme.variables.fontFamily};
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    line-height: 18px;
    color: ${properties => properties.theme.variables.colorText};
`

export const PaymentMethodsList = styled.ul`
    margin-top: 1rem;
`

export const PaymentMethodsListItem = styled.li`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: ${properties => properties.theme.variables.colorBackground};
    border: 1px solid ${properties => properties.theme.variables.colorGray.secondary};
    box-sizing: border-box;
    height: 58px;
`

export const PaymentMethodsListItemSubContainer = styled.div``

export const ListItemTitle = styled.h4`
    height: 18px;
    font-family: ${properties => properties.theme.variables.fontFamily};
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 18px;
    margin-left: 2rem;
    color: ${properties => properties.theme.variables.colorText};
`

export const ListItemSubTitle = styled.p`
    height: 14px;

    font-family: ${properties => properties.theme.variables.fontFamily};
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 13px;
    margin-left: 2rem;
    color: ${properties => properties.theme.variables.colorText};
    opacity: 0.5;
`

interface IListItemCheck {
    isChecked: boolean
}

export const ListItemCheck = styled.div<IListItemCheck>`
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${properties =>
        properties.isChecked
            ? properties.theme.variables.colorPrimary
            : properties.theme.variables.colorGray.secondary};
    border-radius: 50px;
    width: 36px;
    height: 36px;
    margin-right: 2rem;
    svg {
        path {
            stroke: ${properties =>
                properties.isChecked
                    ? properties.theme.variables.colorGray.secondary
                    : properties.theme.variables.colorGray.primary};
            fill: ${properties =>
                properties.isChecked
                    ? properties.theme.variables.colorGray.secondary
                    : properties.theme.variables.colorGray.primary};
        }
    }
`
