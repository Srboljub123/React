import React from 'react'

import { useMainContext } from '@contexts/MainContext'
import AlgorandSuccess from '@views/AlgorandViews/layouts/success/Success'
import EthereumSuccess from '@views/EthereumViews/layouts/success/Success'

const SuccessPage: React.FC = () => {
    const { network } = useMainContext()

    if (network === 'algorand') {
        return (
            <>
                <AlgorandSuccess />
            </>
        )
    }

    return (
        <>
            <EthereumSuccess />
        </>
    )
}

export default SuccessPage
