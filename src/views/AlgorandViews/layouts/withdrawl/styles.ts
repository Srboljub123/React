import styled, { css } from 'styled-components'

const spartanNormal1618 = css`
    font-family: ${properties => properties.theme.variables.fontFamily};
    font-style: normal;
    font-size: 16px;
    line-height: 18px;
    font-weight: 600;
`

export const SuccessContainer = styled.main`
    width: 100vw;
    padding: 2rem 10vw;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    inset: 0;
    z-index: 500;
    background: ${properties => properties.theme.variables.colorBackground};
`

export const SuccessHeader = styled.header`
    padding: 1rem 0;
`

export const SuccessTitle = styled.h2`
    ${spartanNormal1618}
    line-height: 120%;
    font-size: 32px;
    padding: 2rem 0;
    color: ${properties => properties.theme.variables.colorText};
`

export const SuccessAssetContainer = styled.section`
    display: flex;
    justify-content: flex-start;
    width: -webkit-fill-available;
    gap: 1rem;
`

export const SuccessAssetInfo = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: -webkit-fill-available;
    div {
        h3 {
            ${spartanNormal1618}
        }
        h4 {
            ${spartanNormal1618}
        }
        span {
            ${spartanNormal1618}
            margin-right: 1rem;
        }
    }
`

export const AssetInfoContainer = styled.div`
    margin-top: 1rem;
    h3 {
        ${spartanNormal1618}
    }
    h4 {
        ${spartanNormal1618}
    }
    span {
        ${spartanNormal1618}
        margin-right: 1rem;
    }
`

export const AssetDolarPrice = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
`

export const SuccessArticle = styled.article`
    display: flex;
    gap: 6rem;
`

export const SuccessAside = styled.aside`
    div {
        display: flex;
        justify-content: space-between;
        h3 {
            ${spartanNormal1618}
        }
        h4 {
            ${spartanNormal1618}
        }
        span {
            ${spartanNormal1618}
        }
    }
    p {
        ${spartanNormal1618}
        padding: 1rem 0 0;
    }
`

export const SuccessAssetImage = styled.img`
    width: 6rem;
    height: 6rem;
    padding: 0.5rem;
`

export const SuccessNavigator = styled.nav`
    display: flex;
    flex-direction: column;
`

export const SuccessNavButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: 1px solid ${properties => properties.theme.variables.colorGray.primary};
    box-sizing: border-box;
    width: -webkit-fill-available;
    height: 4rem;
    background: transparent;
    margin-top: 1rem;
    cursor: pointer;
    div {
        display: flex;
        align-items: center;
        svg,
        p {
            ${spartanNormal1618}
            margin-left: 1rem
        }
    }
    svg {
        margin-right: 1rem;
    }
    &:hover {
        transform: scale(1.01);
    }
`

export const SuccessNavItemText = styled.p`
    ${spartanNormal1618}
    font-weight: 500;
    line-height: 150%;
    padding-top: 0.5rem;
    color: ${properties => properties.theme.variables.colorText};
`

export const SuccessNavItemLink = styled.a`
    ${spartanNormal1618}
    font-weight: bold;
    line-height: 150%;
    color: ${properties => properties.theme.variables.colorPrimary};
`

export const SuccessNavItemDivider = styled.div`
    border: 1px solid ${properties => properties.theme.variables.colorGray.secondary};
    margin: 1rem 0 0.5rem;
`

export const SuccessList = styled.ul`
    display: flex;
    flex-direction: column;
    width: -webkit-fill-available;
    max-width: 512px;
    overflow: auto;
    height: 40vh;
    gap: 0.25rem;
`

export const SuccessListItem = styled.li`
    display: block;
    background: ${properties => properties.theme.variables.colorBackground};
`
