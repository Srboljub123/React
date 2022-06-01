import React from 'react'

import { ReactComponent as CheckedIcon } from '@common/public/assets/checked.svg'
import {
    ListItemCheck,
    ListItemSubTitle,
    ListItemTitle,
    PaymentMethodsContainer,
    PaymentMethodsList,
    PaymentMethodsListItem,
    PaymentMethodsTitle,
    PaymentMethodsListItemSubContainer,
} from '@styles/layouts/payments/InfoSection/PaymentMethods/styles'

const PaymentMethods: React.FC = () => {
    return (
        <PaymentMethodsContainer>
            <PaymentMethodsTitle>Payment method</PaymentMethodsTitle>
            <PaymentMethodsList>
                <PaymentMethodsListItem>
                    <PaymentMethodsListItemSubContainer>
                        <ListItemTitle>Connect Wallet</ListItemTitle>
                        <ListItemSubTitle>WalletConnect, Metamask...</ListItemSubTitle>
                    </PaymentMethodsListItemSubContainer>
                    <ListItemCheck isChecked>
                        <CheckedIcon />
                    </ListItemCheck>
                </PaymentMethodsListItem>
            </PaymentMethodsList>
        </PaymentMethodsContainer>
    )
}

export default PaymentMethods
