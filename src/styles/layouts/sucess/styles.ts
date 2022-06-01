import { Figure } from 'react-bootstrap'
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
    padding: 2rem 20vw;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    inset: 0;
    z-index: 500;
    background: ${properties => properties.theme.variables.colorBackground};

    @media only screen and (max-width: 900px) {
        padding: 0.5rem;
    }
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
    gap: 1rem;
`

export const SuccessArticle = styled.article`
    display: flex;
    gap: 6rem;
    width: -webkit-fill-available;

    @media only screen and (max-width: 900px) {
        flex-direction: column;
    }
`

export const SuccessNavigator = styled.nav`
    display: flex;
    flex-direction: column;
    /* min-width: 400px; */

    @media only screen and (max-width: 900px) {
        min-width: unset;
    }
`

export const SuccessNavItemDivider = styled.div`
    border: 1px solid ${properties => properties.theme.variables.colorGray.secondary};
    margin: 1rem 0;
`

interface ISuccessNavItemProperties {
    isRow?: boolean
}

export const SuccessNavItem = styled.div<ISuccessNavItemProperties>`
    display: ${properties => (properties.isRow ? 'flex' : 'block')};
    width: max-content;
`

export const SuccessNavItemTitle = styled.h3`
    height: 18px;
    font-family: ${properties => properties.theme.variables.fontFamily};
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 18px;
    color: ${properties => properties.theme.variables.colorText};
`

export const SuccessNavItemLinkContainer = styled.div<ISuccessNavItemProperties>`
    margin-top: 0.5rem;
    display: flex;
    align-items: center;
    a {
        display: flex;
        justify-content: center;
        height: 24px;
        font-family: ${properties => properties.theme.variables.fontFamily};
        font-style: normal;
        font-weight: 600;
        font-size: 16px;
        line-height: 150%;
        color: ${properties => properties.theme.variables.colorPrimary};
        text-decoration: none;
        margin: 0.5rem;
    }
    svg {
        margin-right: 0.5rem;
        path {
            stroke: ${properties => properties.theme.variables.colorPrimary};
            fill: ${properties => properties.theme.variables.colorPrimary};
        }
    }
`

interface ISuccessLinksProperties {
    socialMedia?: boolean
}

export const SuccessLinks = styled.a<ISuccessLinksProperties>`
    margin-top: 0.5rem;
    height: 13px;

    font-family: ${properties => properties.theme.variables.fontFamily};
    font-style: normal;
    font-weight: 600;
    font-size: 12px;
    line-height: 13px;
    text-transform: capitalize;

    color: ${properties => properties.theme.variables.colorPrimary};

    svg {
        path {
            stroke: ${properties => properties.theme.variables.colorPrimary};
            fill: ${properties => (properties.socialMedia ? 'none' : properties.theme.variables.colorPrimary)};
        }
    }

    &:hover {
        color: ${properties => properties.theme.variables.colorPrimary};
        opacity: 0.8;
        svg {
            path {
                /* stroke: ${properties => properties.theme.variables.colorPrimary};
                fill: ${properties => properties.theme.variables.colorPrimary}; */
                opacity: 0.8;
            }
        }
    }
`

export const SuccessFigure = styled(Figure)`
    margin: 0;
    .figure-img {
        margin: 0;
    }
`
