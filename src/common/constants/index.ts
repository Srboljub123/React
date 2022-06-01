const wallet_type = {
    NONE: 0,
    METAMASK: 1,
    WALLETCONNECT: 2,
    ALGOSIGNER: 3,
    COINBASE: 4,
}

const local_storage_key = {
    KEY_WALLET_TYPE: 'wallet_type',
    KEY_WALLET: 'wallet',
    KEY_CONNECTED: 'connected',
    KEY_WALLETS: 'wallets',
}

const fraction_digits = {
    ETHEREUM: 8,
}

const wallet_errors = {
    CONNECTION_REJECTED: 'Connection rejected by user, please connect to wallet',
    TRANSACTION_PENDING: 'Trasaction pending, please check your wallet for transaction:',
    TRANSACTION_REJECTED: 'User denied transaction signature',
    USER_REJECTED: 'UserRejected',
    BALANCE_BELOW_MIN: 'below min',
    ASSERT_MINT: 'assert',
    NOT_ENOUGH_BALANCE_ALGO: 'tried to spend',
    NOT_ENOUGH_BALANCE: 'insufficient funds for gas',
    MAX_MINT_ALLOWED: 'can mint',
    NOT_MINED:
        'Transaction was not mined within 50 blocks, please make sure your transaction was properly sent. Be aware that it might still be mined!',
}

export { wallet_type, local_storage_key, fraction_digits, wallet_errors }
