import React from 'react'
import { useNavigate } from 'react-router-dom'

import LoadingSpinner from '@components/LoadingSpinner'

// import AccurserdShareLogo from '@common/assets/accursed-share-logo.png'

import { CustomProgressBar, LoadingContainer } from './styles'

interface ILoadingProperties {
    isLoading: boolean
    message: string
    currentWallet: string
    transactionHash: string
}

const __ONE_THIRD__ = 33
const __TWO_THIRD__ = 66
const __FULL__ = 100

const PaymentConfirm: React.FC<ILoadingProperties> = ({ isLoading, message, currentWallet, transactionHash }) => {
    const [step, setStep] = React.useState(0)
    const navigate = useNavigate()

    React.useEffect(() => {
        if (message === 'Confirming payment...') {
            setStep(__ONE_THIRD__)
        }
        if (message === 'Transaction sent') {
            setStep(__TWO_THIRD__)
        }
        if (message === 'Transfering your NFTs...') {
            setStep(__FULL__)
        }
    }, [message])

    React.useEffect(() => {
        if (message === 'Transaction rejected') {
            navigate(`/payments/${currentWallet}`)
        }
    }, [currentWallet, message, navigate])

    React.useEffect(() => {
        if (step === __FULL__) {
            setTimeout(() => {
                navigate(`/success`)
            }, __ONE_SECOND__)
        }
    }, [navigate, step])

    return (
        <LoadingContainer isLoading={isLoading}>
            <LoadingSpinner />
            <h2>{message}</h2>
            <CustomProgressBar animated now={step} />
            <h3>This could take up to 10 minutes or longer</h3>
            {transactionHash !== '' && (
                <>
                    <h4>You can close this tab and follow your transaction at </h4>
                    <a
                        href={`https://rinkeby.etherscan.io/tx/${transactionHash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {`https://rinkeby.etherscan.io/tx`}
                    </a>
                </>
            )}
        </LoadingContainer>
    )
}

export default PaymentConfirm
