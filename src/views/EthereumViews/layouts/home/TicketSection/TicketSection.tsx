import React from 'react'

import Ticket from '@components/Ticket'
import { useEthereumContext } from '@contexts/EthereumNetwork/EthereumContext'
import { TicketSectionContainer } from '@styles/layouts/home/TicketSection/styles'

const TicketSection: React.FC = () => {
    const { assetUrl } = useEthereumContext()

    return (
        <TicketSectionContainer>
            <Ticket assetUrl={assetUrl} />
        </TicketSectionContainer>
    )
}

export default TicketSection
