import styled from 'styled-components'

export const ContractTokenInfo = styled.div`
    div {
        display: flex;
        align-items: flex-start;
        flex-direction: column;
        a {
            overflow: hidden; /* "overflow" value must be different from "visible" */
            max-width: 21vw;
            text-overflow: ellipsis;
            margin-left: 1rem;
            color: ${properties => properties.theme.variables.colorText};
            @media only screen and (max-width: 960px) {
                width: 162px;
            }
        }
        p {
            margin-left: 1rem;
            font-size: 1rem;
            color: ${properties => properties.theme.variables.colorGray.primary};
            font-weight: medium;
            @media (max-width: 960px) {
                margin-left: 0.5rem;
                font-size: 0.8rem;
            }
        }
        strong {
            margin-left: 1rem;
            font-size: 1.2rem;
            color: ${properties => properties.theme.variables.colorGray.secondary};
            font-weight: bold;
            @media only screen and (max-width: 960px) {
                margin-left: 0.5rem;
                font-size: 1rem;
                font-weight: bold;
            }
        }
    }
`
