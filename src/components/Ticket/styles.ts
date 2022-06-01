import styled, { css } from 'styled-components'

interface ITicketProperties {
    isThumbnail?: boolean
}

const TicketUrlAssetMixin = css`
    width: 100%;
    max-height: 300px;
    border: none;
    @media only screen and (max-width: 1200px) {
        max-width: 100vw;
    }
    @media only screen and (max-width: 700px) {
        max-width: 100vw;
    }
`
const TicketThumbnail = css`
    width: 228px;
    height: 228px;
    border: none;
`

export const TicketFrame = styled.iframe<ITicketProperties>`
    ${properties => (properties.isThumbnail ? TicketThumbnail : TicketUrlAssetMixin)}
`

export const TicketVideo = styled.video<ITicketProperties>`
    ${properties => (properties.isThumbnail ? TicketThumbnail : TicketUrlAssetMixin)}
`

export const TicketImage = styled.img<ITicketProperties>`
    ${properties => (properties.isThumbnail ? TicketThumbnail : TicketUrlAssetMixin)}
`
