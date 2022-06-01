import React from 'react'
import { Routes as Switch, Route } from 'react-router-dom'

import PaymentSection from '@views/AlgorandViews/layouts/payments/PaymentSection'
import AlgorandView from '@views/AlgorandViews/wallets/AlgorandView'

const AlgorandRoutes: React.FC = () => {
    return (
        <Switch>
            <Route index element={<PaymentSection />} />
            <Route path="algosigner" element={<AlgorandView />} />
            <Route path="walletconnect" element={<AlgorandView />} />
        </Switch>
    )
}

export default AlgorandRoutes
