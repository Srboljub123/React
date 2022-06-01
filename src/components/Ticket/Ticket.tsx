import React from 'react'

import { checkInitAssetUrl } from '@common/services'

import { TicketFrame, TicketVideo, TicketImage } from './styles'

interface ITicketProperties {
    assetUrl: string
    isThumbnail?: boolean
}

const Ticket: React.FC<ITicketProperties> = ({ assetUrl, isThumbnail = false }) => {
    const [source, setSource] = React.useState('')
    const [contentType, setContentType] = React.useState('text/html')

    const cleanUpTicket = React.useCallback(() => {
        setSource('')
        setContentType('text/html')
    }, [])

    React.useEffect(() => {
        checkInitAssetUrl(assetUrl, setSource, setContentType)
        return () => cleanUpTicket()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (contentType.includes('text') || contentType.includes('application')) {
        return <TicketFrame src={source} frameBorder="0" allow="fullscreen" isThumbnail={isThumbnail} />
    }

    if (contentType.includes('video')) {
        return <TicketVideo src={source} controls isThumbnail={isThumbnail} />
    }

    return <TicketImage src={source} alt={source} isThumbnail={isThumbnail} />
}

export default Ticket
