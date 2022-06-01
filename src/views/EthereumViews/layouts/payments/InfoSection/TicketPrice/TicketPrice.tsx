import React from 'react'

import { useEthereumContext } from '@contexts/EthereumNetwork/EthereumContext'
import {
    MintPriceInfo,
    TicketPriceContainer,
    TicketPriceBoldItem,
    RowContainer,
    ColContainer,
} from '@styles/layouts/payments/InfoSection/TicketPrice/styles'

const TicketPrice: React.FC = () => {
    const { currentMintPrice, config, blockchain, network } = useEthereumContext()

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
