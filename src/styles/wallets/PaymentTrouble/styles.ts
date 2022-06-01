import styled from 'styled-components'

interface IContainerProperties {
    isLoading: boolean
}

export const LoadingContainer = styled.div<IContainerProperties>`
    /* width: 100vw;
    height: 115vh; */
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
        /* position: absolute; */
        margin-top: 2rem;
        font-family: ${properties => properties.theme.variables.fontFamily};
        font-style: normal;
        font-weight: 600;
        font-size: 24px;
        line-height: 120%;
    }
    p {
        margin: 2rem 0;
        font-family: ${properties => properties.theme.variables.fontFamily};
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 120%;
    }
`

export const LoadingTitle = styled.h2`
    color: ${properties => properties.theme.variables.colorText};
    /* position: absolute; */
    margin-top: 2rem;
    font-family: ${properties => properties.theme.variables.fontFamily};
    font-style: normal;
    font-weight: 600;
    font-size: 24px;
    line-height: 120%;
`

export const LoadingText = styled.p`
    margin: 2rem 0;
    font-family: ${properties => properties.theme.variables.fontFamily};
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 120%;
`
