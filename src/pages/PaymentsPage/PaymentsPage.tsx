import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { Outlet, useNavigate } from 'react-router-dom'

import { useWindowSize } from '@common/hooks'
import BackButton from '@components/BackButton'
import WalletWarnings from '@components/WalletWarnings'
import { useMainContext } from '@contexts/MainContext'
import AlgorandRoutes from '@routes/AlgorandRoutes'
import EthereumRoutes from '@routes/EthereumRoutes'
import AlgorandInfoSection from '@views/AlgorandViews/layouts/payments/InfoSection'
import EthereumInfoSection from '@views/EthereumViews/layouts/payments/InfoSection'

import { PaymentsContainer, PaymentsHeader, PaymentsPageContainer, PaymentsPageMain } from './styles'

const MAX_WIDTH = 1670
const Payments: React.FC = () => {
    const { config, network, blockchain, contractAddress, shouldWarning, warningMessage, setShouldWarning } =
        useMainContext()
    const [width] = useWindowSize()
    const navigate = useNavigate()

    const handleGoBack = React.useCallback(() => {
        navigate('/')
    }, [navigate])

    const address = config.networks[network][blockchain].explorer_address + contractAddress
    if (network === 'ethereum') {
        return (
            <PaymentsPageContainer>
                <PaymentsPageMain>
                    {shouldWarning && (
                        <WalletWarnings waringMessage={warningMessage} setShouldWarning={setShouldWarning} />
                    )}
                    <PaymentsHeader as="header">
                        <Row className="justify-content-md-center">
                            <Col xs lg="2">
                                <BackButton handleClick={handleGoBack} message="Back" hasCaret />
                            </Col>
                            <Col xs lg="2"></Col>
                            <Col xs lg="2"></Col>
                            <Col xs lg="2"></Col>
                            <Col xs lg="2"></Col>
                            {width < MAX_WIDTH && <Col xs lg="2"></Col>}
                            {width < MAX_WIDTH && <Col xs lg="2"></Col>}
                        </Row>
                    </PaymentsHeader>
                    <PaymentsContainer>
                        <EthereumInfoSection contractEtherScanAddress={address} />
                        {/* Outlet is the root for a nested routing */}
                        <Outlet />
                        <EthereumRoutes />
                    </PaymentsContainer>
                </PaymentsPageMain>
            </PaymentsPageContainer>
        )
    }
    if (network === 'algorand') {
        return (
            <>
                {shouldWarning && <WalletWarnings waringMessage={warningMessage} setShouldWarning={setShouldWarning} />}
                <PaymentsHeader>
                    <BackButton handleClick={handleGoBack} message="Back" hasCaret />
                </PaymentsHeader>
                <PaymentsContainer>
                    <AlgorandInfoSection contractEtherScanAddress={address} />
                    {/* Outlet is the root for a nested routing */}
                    <Outlet />
                    <AlgorandRoutes />
                </PaymentsContainer>
            </>
        )
    }
    return (
        <PaymentsContainer>
            <h1>NO NETWORK</h1>
        </PaymentsContainer>
    )
}

export default Payments
