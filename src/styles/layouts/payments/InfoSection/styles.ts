import styled, { keyframes } from 'styled-components'

export const InfoSectionContainer = styled.section`
    height: -webkit-fill-available;
    width: 40%;
    padding: 2rem;
    background: ${properties => properties.theme.variables.colorBackground};
    border: 1px solid #e2e2e2;
    box-sizing: border-box;
    @media only screen and (max-width: 960px) {
        padding-right: 0;
        width: 98%;
        padding: 0.5rem;
    }
`

export const InfoSectionAvatar = styled.img`
    width: 86px;
    height: 86px;
`

export const InfoSectionTitle = styled.h3`
    margin: 1rem 0;
    font-family: ${properties => properties.theme.variables.fontFamily};
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 22px;
    /* text-align: center; */

    color: ${properties => properties.theme.variables.colorText};
`

export const InfoSectionUser = styled.h4`
    height: 18px;

    font-family: ${properties => properties.theme.variables.fontFamily};
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 18px;
    /* identical to box height */

    /* text-align: center; */

    color: ${properties => properties.theme.variables.colorText};
`

export const InfoSectionAssetAndTimer = styled.div``

export const InfoSectionDivider = styled.div`
    border: 1px solid ${properties => properties.theme.variables.colorGray.secondary};
`

export const InfoSectionHeader = styled.header`
    height: 4rem;
    display: flex;
    justify-content: flex-start;
    svg {
        width: 26px;
        height: 26px;
        &:hover {
            transform: scale(1.2);
        }
    }
    h2 {
        margin-left: 1rem;
        margin-top: 0;
    }
`

export const InfoSectionItems = styled.ul`
    list-style: none;
    padding: 1.5rem 0;
    height: 100%;
`

export const InfoSectionItem = styled.li`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    padding: 1rem;
    height: 100%;
    background-color: ${properties => properties.theme.variables.colorBackground};
    border-radius: 0.5rem;
`

export const InfoSectionItemCard = styled.div`
    display: flex;
    width: -webkit-fill-available;
    justify-content: flex-start;
`

const fadeIn = keyframes`
    0% { opacity: 0; }
    100% { opacity: 1; }
`

const fadeOut = keyframes`
    0% { opacity: 1; }
    100% { opacity: 0; }
`

type TInfoFadeItemProperties = {
    isFadingIn: boolean
}

export const InfoFadeItem = styled.p<TInfoFadeItemProperties>`
    font-size: 1.5rem;
    font-weight: bolder;
    opacity: ${properties => (properties.isFadingIn ? '1' : '0')};
    color: ${properties => properties.theme.variables.colorGray.secondary};
    animation: ${properties => (properties.isFadingIn ? fadeIn : fadeOut)} 1s;
`
