import styled from 'styled-components'

export const PaymentSectionContainer = styled.section`
    width: 400px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    svg {
        path {
            stroke: ${properties => properties.theme.variables.colorPrimary};
        }
    }
    h2 {
        height: 27px;

        font-family: ${properties => properties.theme.variables.fontFamily};
        font-style: normal;
        font-weight: 600;
        font-size: 24px;
        line-height: 27px;
        color: ${properties => properties.theme.variables.colorText};
        margin-top: 1rem;
    }
    h3 {
        height: 18px;
        margin-top: 1rem;
        font-family: ${properties => properties.theme.variables.fontFamily};
        font-style: normal;
        font-weight: 600;
        font-size: 16px;
        line-height: 18px;
        color: ${properties => properties.theme.variables.colorText};

        a {
            color: ${properties => properties.theme.variables.colorPrimary};
            &:hover {
                color: ${properties => properties.theme.variables.colorPrimary};
                opacity: 0.8;
            }
        }
    }
    @media only screen and (max-width: 960px) {
        width: 98%;
    }
`

export const PaymentsMethodsList = styled.ul`
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    width: 100%;
    justify-content: center;
    gap: 2rem;
    margin-top: 2rem;
    list-style: none;
    margin-bottom: 4rem;
`
