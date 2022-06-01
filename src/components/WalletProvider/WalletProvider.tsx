import React from 'react'

import { ReactComponent as ArrowRight } from '@common/public/assets/arrowRight.svg'
import Algosigner from '@common/public/images/algosigner.svg'
import Coinbase from '@common/public/images/coinbase.svg'
import Metamask from '@common/public/images/metamask.svg'
import WalletConnect from '@common/public/images/walletconnect.svg'

import { PaymentMethodItem, RowContainer } from './styles'

interface IWalletProvider {
    paymentMethod: string
    handleSelectPaymentMethod: (event: React.SyntheticEvent<HTMLButtonElement>) => void
}

const walletsLogos: IWalletsLogos = {
    metamask: Metamask,
    algosigner: Algosigner,
    walletconnect: WalletConnect,
    coinbase: Coinbase,
}

const WalletProvider: React.FC<IWalletProvider> = ({ paymentMethod, handleSelectPaymentMethod }) => {
    return (
        <PaymentMethodItem key={`payment-method-${paymentMethod}`}>
            <button className={paymentMethod} onClick={handleSelectPaymentMethod} value={paymentMethod}>
                <RowContainer>
                    <img src={walletsLogos[paymentMethod]} alt={paymentMethod} />
                    {paymentMethod}
                </RowContainer>
                <ArrowRight />
            </button>
        </PaymentMethodItem>
    )
}

export default WalletProvider
