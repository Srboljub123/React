import React from 'react'

import { useAlgorandContext } from '@contexts/AlgorandNetwork/AlgorandContext'
import {
    MintPriceInfo,
    TicketPriceContainer,
    TicketPriceBoldItem,
    RowContainer,
    ColContainer,
} from '@styles/layouts/payments/InfoSection/TicketPrice/styles'

const TicketPrice: React.FC = () => {
    const { currentMintPrice, config, blockchain, network } = useAlgorandContext()

    return (
        <TicketPriceContainer>
            <MintPriceInfo>
                <RowContainer>
                    <TicketPriceBoldItem>Unit Price</TicketPriceBoldItem>
                    <ColContainer>
                        <TicketPriceBoldItem>{`${currentMintPrice} ${config.networks[network][blockchain].currency}`}</TicketPriceBoldItem>
                        {/*<CryptoPrice>US$ dollar api</CryptoPrice>*/}
                    </ColContainer>
                </RowContainer>
            </MintPriceInfo>
        </TicketPriceContainer>
    )
}

export default TicketPrice
