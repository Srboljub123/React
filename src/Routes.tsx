import React from 'react'
import { BrowserRouter, Routes as Switch, Route } from 'react-router-dom'

import PaymentConfirm from '@components/PaymentConfirm'
import { useMainContext } from '@contexts/MainContext'
import HomePage from '@pages/HomePage'
import PaymentsPage from '@pages/PaymentsPage'
import SuccessPage from '@pages/SuccessPage'
import Withdrawl from '@views/AlgorandViews/layouts/withdrawl'

const Routes: React.FC = () => {
    const { warningMessage, currentWallet, transactionHash } = useMainContext()
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/">
                    <Route index element={<HomePage />} />
                    <Route
                        path="payments/*" // * means that this element has nested routing
                        element={<PaymentsPage />}
                    />
                    <Route
                        path="confirming"
                        element={
                            <PaymentConfirm
                                isLoading
                                message={warningMessage}
                                currentWallet={currentWallet}
                                transactionHash={transactionHash}
                            />
                        }
                    />
                    <Route path="success" element={<SuccessPage />} />
                    <Route path="withdrawl" element={<Withdrawl />} />
                </Route>
            </Switch>
        </BrowserRouter>
    )
}

export default Routes
