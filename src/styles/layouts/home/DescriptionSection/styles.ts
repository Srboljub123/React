import { Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const DescriptionSectionContainer = styled(Col)`
    /* width: 60vw; */
`

export const DescriptionSectionRow = styled(Row)``
export const DescriptionSectionRowInfos = styled(Row)`
    max-width: fit-content;

    @media only screen and (max-width: 360px) {
        --bs-gutter-x: 0;
    }
`

export const DescriptionSectionRowCenter = styled(Row)`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;
`

export const DescriptionSectionCol = styled(Col)`
    min-height: 72px;
    @media only screen and (max-width: 360px) {
        width: -webkit-fill-available;
        max-width: -webkit-fill-available;
        padding-right: 0;
    }
`

export const DescriptionSectionButtonRow = styled(Row)`
    padding: 0 0.75rem;
`

export const DescriptionSectionColCenter = styled(Col)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

export const DescriptionSectionColEnd = styled(Col)`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;
`

export const DescriptionSectionTitle = styled.h3`
    font-family: ${properties => properties.theme.variables.fontFamily};
    font-style: normal;
    font-weight: 600;
    font-size: 24px;
    line-height: 26px;
    letter-spacing: 0.2em;
    color: ${properties => properties.theme.variables.colorText};

    @media only screen and (max-width: 900px) {
        font-size: 18px;
    }
`

interface IDescriptionColTitle {
    isPrice?: boolean
}

export const DescriptionColTitle = styled.h4<IDescriptionColTitle>`
    margin-top: 0.5rem;
    height: 16px;
    display: flex;
    width: max-content;
    font-family: ${properties => properties.theme.variables.fontFamily};
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    color: ${properties => properties.theme.variables.colorText};

    @media only screen and (max-width: 900px) {
        font-size: ${properties => (properties.isPrice ? '16px' : '12px')};
    }
`

export const DescriptionColSubTitle = styled.h5`
    margin: 0.5rem 0;
    height: 12px;
    /* padding-bottom: 2rem; */
    font-family: ${properties => properties.theme.variables.fontFamily};
    font-style: normal;
    font-weight: bold;
    font-size: 12px;
    /* line-height: 16px; */
    /* identical to box height */

    /* text-transform: uppercase; */

    color: #bfbfbf;
`

export const DescriptionColText = styled.p`
    margin-top: 0.5rem;
    height: 13px;

    font-family: ${properties => properties.theme.variables.fontFamily};
    font-style: normal;
    font-weight: 600;
    font-size: 12px;
    line-height: 13px;
    text-transform: capitalize;

    color: ${properties => properties.theme.variables.colorText};
`

export const DescriptionSectionMintedCounter = styled.span`
    height: 16px;

    font-family: ${properties => properties.theme.variables.fontFamily};
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 16px;
    /* identical to box height */

    text-align: right;

    color: ${properties => properties.theme.variables.colorText};

    @media only screen and (max-width: 360px) {
        font-size: 14px;
    }
`

type TDescriptionSectionLinkButtonProperties = {
    isLinkDisabled?: boolean
}

export const DescriptionSectionLinkButton = styled(Link)<TDescriptionSectionLinkButtonProperties>`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 16px 24px 12px;
    width: 343px;
    height: 42px;
    background: ${properties => properties.theme.variables.colorBackground};
    color: ${properties => properties.theme.variables.colorText};
    border: 1px solid
        ${properties =>
            properties.isLinkDisabled
                ? properties.theme.variables.colorGray.primary
                : properties.theme.variables.colorPrimary};
    box-sizing: border-box;
`

export const DescriptionSectionAnchor = styled.a`
    margin-top: 0.5rem;
    height: 13px;

    font-family: ${properties => properties.theme.variables.fontFamily};
    font-style: normal;
    font-weight: 600;
    font-size: 12px;
    line-height: 13px;
    text-transform: capitalize;

    color: ${properties => properties.theme.variables.colorPrimary};

    &:hover {
        color: ${properties => properties.theme.variables.colorPrimary};
        opacity: 0.8;
    }
`

export const DescriptionSectionDivider = styled.div`
    border: 1px solid ${properties => properties.theme.variables.colorGray.secondary};
    margin: 1rem 0 1rem;
`

export const DescriptionSectionVerticalDivider = styled.div`
    width: 23px;
    height: 0;

    border: 1px solid ${properties => properties.theme.variables.colorGray.secondary};
    transform: rotate(90deg) translateX(24px);
`
