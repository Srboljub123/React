// import ACSTicketFlow  from 'package/App'
import React from 'react'
import { I18nextProvider } from 'react-i18next'
// import FakturaMintable from 'src/contracts/ethereum/FakturaMintable.json'
import FakturaDutch from 'src/contracts/ethereum/FakturaDutch.json'

import { DefaultTheme, ThemeProvider } from 'styled-components'

import Bugsnag from '@bugsnag/js'
import BugsnagPluginReact from '@bugsnag/plugin-react'
import config from '@common/configs'
import i18n from '@common/locales'
// import darkTheme from '@common/styles/darkTheme'
// import defaultTheme from '@common/styles/defaultTheme'
import earnNFTNetworkTheme from '@common/styles/earnNFTNetworkTheme'
import { GlobalStyles } from '@common/styles/global'
import { MainProvider } from '@contexts/MainContext'
// import init from '@init/mocks/init.ethereum.json'
import init from '@init/mocks/init.algorand.json'

import 'bootstrap/scss/bootstrap.scss'
import './App.scss'
import Routes from './Routes'

Bugsnag.start({
    apiKey: config.general.bugsnag,
    plugins: [new BugsnagPluginReact()],
})

const App: React.FC = () => {
    return (
        <LibraryApp
            assetsAndNetworks={init}
            contract={FakturaDutch as IContract}
            internacionalization={i18n}
            theme={earnNFTNetworkTheme}
        />
    )
}

export default App

export interface ILibraryAppProperties {
    assetsAndNetworks: IProviderInit
    contract: IContract
    internacionalization?: typeof i18n
    theme?: DefaultTheme
}

export const LibraryApp: React.FC<ILibraryAppProperties> = ({
    assetsAndNetworks,
    contract,
    internacionalization = i18n,
    theme = defaultTheme,
}) => {
    console.log('Network', assetsAndNetworks.network)
    return (
        <I18nextProvider i18n={internacionalization}>
            <ThemeProvider theme={theme}>
                <MainProvider
                    assetUrl={assetsAndNetworks.assetUrl}
                    assetThumbnail={assetsAndNetworks.assetThumbnail}
                    blockchain={assetsAndNetworks.blockchain}
                    contract={contract}
                    contractAddress={assetsAndNetworks.contractAddress}
                    maxQuantity={assetsAndNetworks.maxQuantity}
                    marketplaceUrl={assetsAndNetworks.marketplaceUrl}
                    socialMedias={assetsAndNetworks.socialMedias}
                    mintPrice={assetsAndNetworks.mintPrice}
                    network={assetsAndNetworks.network}
                    paymentMethods={assetsAndNetworks.paymentMethods}
                    salesBehavior={assetsAndNetworks.salesBehavior}
                    timer={assetsAndNetworks.timer}
                >
                    <Routes />
                    <GlobalStyles />
                </MainProvider>
            </ThemeProvider>
        </I18nextProvider>
    )
}
