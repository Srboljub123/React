import React from 'react'
import { Routes as Switch, Route } from 'react-router-dom'

import PaymentSection from '@views/EthereumViews/layouts/payments/PaymentSection'
import EthereumView from '@views/EthereumViews/wallets/EthereumView'

const EthereumRoutes: React.FC = () => {
    return (
        <Switch>
            <Route index element={<PaymentSection />} />
            <Route path="metamask" element={<EthereumView />} />
            <Route path="walletconnect" element={<EthereumView />} />
            <Route path="coinbase" element={<EthereumView />} />
        </Switch>
    )
}

export default EthereumRoutes
