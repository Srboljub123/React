import React from 'react'

import { useMainContext } from '@contexts/MainContext'
import AlgorandDescriptionSection from '@views/AlgorandViews/layouts/home/DescriptionSection'
import AlgorandTicketSection from '@views/AlgorandViews/layouts/home/TicketSection'
import EthereumDescriptionSection from '@views/EthereumViews/layouts/home/DescriptionSection'
import EthereumTicketSection from '@views/EthereumViews/layouts/home/TicketSection'

import { HomePageContainer, HomePageMain } from './styles'

const HomePage: React.FC = () => {
    const { network } = useMainContext()

    if (network === 'ethereum') {
        return (
            <HomePageContainer as="main">
                <HomePageMain>
                    <EthereumTicketSection />

                    <EthereumDescriptionSection />
                </HomePageMain>
            </HomePageContainer>
        )
    }
    if (network === 'algorand') {
        return (
            <HomePageContainer>
                <HomePageMain>
                    <AlgorandTicketSection />

                    <AlgorandDescriptionSection />
                </HomePageMain>
            </HomePageContainer>
        )
    }
    return (
        <HomePageContainer>
            <h1>ERROR</h1>
        </HomePageContainer>
    )
}

export default HomePage
