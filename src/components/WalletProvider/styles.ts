import styled from 'styled-components'

export const PaymentMethodItem = styled.li`
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${properties => properties.theme.variables.colorBackground};
    border: 1px solid ${properties => properties.theme.variables.colorGray.secondary};
    border-radius: ${properties => properties.theme.variables.borderRadius};
    box-sizing: border-box;
    width: -webkit-fill-available;
    button {
        cursor: pointer;
        width: -webkit-fill-available;
        /* border-radius: ${properties => properties.theme.variables.borderRadius}; */
        display: flex;
        justify-content: space-between;
        align-items: center;

        font-family: ${properties => properties.theme.variables.fontFamily};
        font-style: normal;
        font-weight: bold;
        font-size: 16px;
        line-height: 18px;
        text-transform: capitalize;
        /* identical to box height */

        color: ${properties => properties.theme.variables.colorText};
        padding: 1rem 3rem;
        border: none;
        /* border-radius: 0.5rem; */
        background: transparent;
        img {
            width: 24px;
            height: 24px;
            margin-right: 1rem;
        }
        svg {
            path {
                stroke: ${properties => properties.theme.variables.colorGray.secondary};
                fill: ${properties => properties.theme.variables.colorGray.secondary};
            }
        }
    }
    &:hover {
        transform: scale(1.01);
    }
`

export const RowContainer = styled.div`
    display: flex;
    align-items: center;
`
