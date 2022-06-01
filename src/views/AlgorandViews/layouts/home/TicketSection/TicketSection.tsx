import React from 'react'

import Ticket from '@components/Ticket'
import { useAlgorandContext } from '@contexts/AlgorandNetwork/AlgorandContext'
import { TicketSectionContainer } from '@styles/layouts/home/TicketSection/styles'

const TicketSection: React.FC = () => {
    const { assetUrl } = useAlgorandContext()

    return (
        <TicketSectionContainer>
            <Ticket assetUrl={assetUrl} />
        </TicketSectionContainer>
    )
}

export default TicketSection
