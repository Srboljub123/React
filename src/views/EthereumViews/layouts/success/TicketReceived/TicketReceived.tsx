import React from 'react'

import Ticket from '@components/Ticket'

import { TicketReceivedContainer } from '@styles/layouts/sucess/TicketReceived/styles'

interface ITicketReceived {
    metadataResults: IMetadataProperties[]
}

const TicketReceived: React.FC<ITicketReceived> = ({ metadataResults }) => {
    return (
        <TicketReceivedContainer>
            <Ticket assetUrl={metadataResults[metadataResults.length - 1].image} />
        </TicketReceivedContainer>
    )
}

export default TicketReceived
