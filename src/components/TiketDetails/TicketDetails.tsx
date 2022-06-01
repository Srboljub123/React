import React from 'react'
import { useTranslation } from 'react-i18next'

import { ContractTokenInfo } from './styles'

interface ITicketDetailsProperties {
    config: IConfig
    contractAddress: string
    initNetwork: string
    initBlockchain: string
    walletProvider: string
}

const TicketDetails: React.FC<ITicketDetailsProperties> = ({
    config,
    contractAddress,
    initNetwork,
    initBlockchain,
    walletProvider,
}) => {
    const { t } = useTranslation()
    return (
        <div>
            <ContractTokenInfo>
                <div>
                    <p>{t('payments.ticket.info.contractAddress')}</p>
                    <a
                        href={config.networks[initNetwork][initBlockchain].explorer_address + contractAddress}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {contractAddress}
                    </a>
                </div>

                <div>
                    <p>{t('payments.ticket.info.network')}</p>
                    <strong>{initNetwork.toUpperCase()}</strong>
                </div>

                <div>
                    <p>{t('payments.ticket.info.blockchain')}</p>
                    <strong>{initBlockchain.toUpperCase()}</strong>
                </div>

                <div>
                    <p>{t('payments.ticket.info.wallet')}</p>
                    <strong>
                        {walletProvider === '' ? t('payments.ticket.connect') : walletProvider.toUpperCase()}
                    </strong>
                </div>
            </ContractTokenInfo>
        </div>
    )
}

export default TicketDetails
