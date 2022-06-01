import { ProgressBar } from 'react-bootstrap'
import styled from 'styled-components'

interface IContainerProperties {
    isLoading: boolean
}

export const LoadingContainer = styled.div<IContainerProperties>`
    display: ${properties => (!properties.isLoading ? 'none' : 'flex')};
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 4rem;
    position: absolute;
    inset: 0;
    z-index: 500;
    background: ${properties => properties.theme.variables.colorBackground};
    h2 {
        color: ${properties => properties.theme.variables.colorText};
        margin-top: 6rem;
        font-family: ${properties => properties.theme.variables.fontFamily};
        font-style: normal;
        font-weight: 600;
        font-size: 24px;
        line-height: 120%;

        @media only screen and (max-width: 900px) {
            margin-top: 8rem;
            font-size: 18px;
        }
    }
    h3 {
        /* height: 24px; */
        font-family: ${properties => properties.theme.variables.fontFamily};
        font-style: normal;
        font-weight: 600;
        font-size: 16px;
        line-height: 150%;
        text-align: center;
        color: ${properties => properties.theme.variables.colorText};
    }
    h4 {
        margin-top: 1rem;
        /* height: 24px; */
        font-family: ${properties => properties.theme.variables.fontFamily};
        font-style: normal;
        font-weight: 600;
        font-size: 16px;
        line-height: 150%;
        text-align: center;
        color: ${properties => properties.theme.variables.colorText};
    }
    a {
        margin-top: 1rem;
        height: 24px;
        font-family: ${properties => properties.theme.variables.fontFamily};
        font-style: normal;
        font-weight: 600;
        font-size: 16px;
        line-height: 150%;
        text-align: center;
        color: ${properties => properties.theme.variables.colorPrimary};
        &:hover {
            opacity: 0.8;
        }
    }
    @media only screen and (max-width: 900px) {
        font-size: 1rem;
        width: 100vw;
        /* height: 86vh; */
    }
`

export const CustomProgressBar = styled(ProgressBar)`
    width: 450px;
    margin: 2rem 0 3rem;

    .progress-bar {
        background-color: ${properties => properties.theme.variables.colorPrimary};
    }

    @media only screen and (max-width: 900px) {
        width: -webkit-fill-available;
        margin: 0.5rem;
    }
`
