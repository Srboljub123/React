const config: IConfig = {
    networks: {
        ethereum: {
            mainnet: {
                name: 'mainnet',
                chain_id: 0x01,
                currency: 'ETH',
                consensus: 'pow',
                explorer_address: 'https://etherscan.io/address/',
                gas_tracker_url:
                    'https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=36XTKGWV92Q7B9FEKMRJRXQH5UBG3C2ANE',
                provider_param: {
                    url: 'https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
                    infuraId: 'a7a08bee7e2e427591a17baafee2c515',
                    rpc: {
                        1: 'https://mainnet.infura.io/v3/a7a08bee7e2e427591a17baafee2c515',
                    },
                },
            },
            rinkeby: {
                name: 'rinkeby',
                chain_id: 0x04,
                currency: 'ETH',
                consensus: 'pow',
                explorer_address: 'https://rinkeby.etherscan.io/address/',
                gas_tracker_url:
                    'https://api-rinkeby.etherscan.io/api?module=gastracker&action=gasoracle&apikey=NXIMNR3HSJR58AHXU4TE6Y7ZD73BIHE3MR',
                provider_param: {
                    url: 'https://rinkeby.infura.io/v3/804a4b60b242436f977cacd58ceca531',
                    infuraId: '804a4b60b242436f977cacd58ceca531',
                    rpc: {
                        3: 'https://rinkeby.infura.io/v3/804a4b60b242436f977cacd58ceca531',
                    },
                },
            },
        },
        algorand: {
            mainnet: {
                name: 'mainnet',
                chain_id: 0x01,
                currency: 'ALGO',
                consensus: 'pos',
                explorer_address: 'https://goalseeker.purestake.io/algorand/mainnet/application/',
                gas_tracker_url:
                    'https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=36XTKGWV92Q7B9FEKMRJRXQH5UBG3C2ANE',
                provider_param: {
                    token: {
                        'X-API-Key': 'G3J94uGQtB5rCOGTjTcmY3x8TIGC0lqH3GZtvEZl', // 'YOUR PURESTAKE API KEY HERE'
                    },
                    url: 'https://mainnet-algorand.api.purestake.io/ps2',
                    port: '',
                },
            },
            testnet: {
                name: 'testnet',
                chain_id: 0x04,
                currency: 'ALGO',
                consensus: 'pos',
                explorer_address: 'https://goalseeker.purestake.io/algorand/testnet/application/',
                gas_tracker_url:
                    'https://api-rinkeby.etherscan.io/api?module=gastracker&action=gasoracle&apikey=NXIMNR3HSJR58AHXU4TE6Y7ZD73BIHE3MR',
                provider_param: {
                    token: {
                        'X-API-Key': 'G3J94uGQtB5rCOGTjTcmY3x8TIGC0lqH3GZtvEZl', // 'YOUR PURESTAKE API KEY HERE'
                    },
                    url: 'https://testnet-algorand.api.purestake.io/ps2',
                    port: '',
                },
            },
        },
    },
    general: {
        appName: 'Faktura',
        appLogoUrl: 'faktura.art',
        bugsnag: 'd707afca58cf2e33ceec296598de7d18',
    },
    wallets: {
        algosigner: ['web'],
        metamask: ['web'],
        walletconnect: ['web', 'mobile'],
        coinbase: ['web', 'mobile'],
    },
}

export default config
