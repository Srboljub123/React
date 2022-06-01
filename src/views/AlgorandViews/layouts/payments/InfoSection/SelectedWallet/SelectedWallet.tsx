import React from 'react'

import Algosigner from '@common/public/images/algosigner.svg'
import Coinbase from '@common/public/images/coinbase.svg'
import Metamask from '@common/public/images/metamask.svg'
import WalletConnect from '@common/public/images/walletconnect.svg'

const walletsLogos: IWalletsLogos = {
    metamask: Metamask,
    algosigner: Algosigner,
    walletconnect: WalletConnect,
    coinbase: Coinbase,
}
import DialogModal from '@components/DialogModal'
import {
    // ButtonsDivider,
    // ChaangeWallet,
    // DisconnectWallet,
    SelectedWalletAddress,
    SelectedWalletConainer,
    // SelectedWalletRow,
    SelectedWalletRowBetween,
    SelectedWalletTitle,
    SelectedWalletWallet,
    SelectedWalletProvider,
} from '@styles/layouts/payments/InfoSection/SelectedWallet/styles'

const SelectedWallet: React.FC<ISelectedWalletProperties> = ({ selectedWallet, walletAddress, truncatedAddress }) => {
    const [shouldDialog, setShouldDialog] = React.useState(false)
    // const { t } = useTranslation()

    const handleModal = React.useCallback(
        (event: React.SyntheticEvent<HTMLButtonElement, MouseEvent>) => {
            event.preventDefault()
            // setDeleteTarget(event.currentTarget.textContent)
            if (shouldDialog) {
                return setShouldDialog(false)
            }
            return setShouldDialog(true)
        },
        [shouldDialog],
    )

    return (
        <SelectedWalletConainer>
            <SelectedWalletTitle>Payment method</SelectedWalletTitle>
            <SelectedWalletRowBetween>
                <SelectedWalletWallet>{`Wallet (${
                    selectedWallet.charAt(0).toUpperCase() + selectedWallet.slice(1)
                })`}</SelectedWalletWallet>
                <SelectedWalletAddress>{truncatedAddress}</SelectedWalletAddress>
            </SelectedWalletRowBetween>
            {/*<SelectedWalletRow>*/}
            {/*    <ChaangeWallet>{t('payments.wallet.change')}</ChaangeWallet>*/}
            {/*    <ButtonsDivider />*/}
            {/*    <DisconnectWallet onClick={handleModal}>Disconnect</DisconnectWallet>*/}
            {/*</SelectedWalletRow>*/}
            {shouldDialog && (
                <DialogModal
                    onBackDrop={handleModal}
                    title="Disconnect Wallet"
                    message="Are you sure you want to disconnect this wallet?"
                >
                    <SelectedWalletProvider>
                        <div>
                            <img src={walletsLogos[selectedWallet]} alt={selectedWallet} />
                            {selectedWallet}
                        </div>
                        <p>{walletAddress}</p>
                    </SelectedWalletProvider>
                </DialogModal>
            )}
        </SelectedWalletConainer>
    )
}

export default SelectedWallet
