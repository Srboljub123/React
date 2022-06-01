import algosdk, { Account, getApplicationAddress, OnApplicationComplete } from 'algosdk'
import AlgodClient from 'algosdk/dist/types/src/client/v2/algod/algod'

import {
    base64Decode,
    decode,
    intToBinaryArray,
    ipfsToHTTP,
    readGlobalState,
} from '@controllers/AlgorandController/utils'
import AlgorandNetwork from '@providers/AlgorandNetwork'
import axios from 'axios'

export interface IAppsTotalSchema {
    'num-byte-slice': number
    'num-uint': number
}

export interface IAlgorandAccontInformation {
    address: string
    amount: number
    'amount-without-pending-rewards': number
    'apps-local-state': unknown[]
    'apps-total-schema': IAppsTotalSchema
    assets: any[]
    'created-apps': unknown[]
    'created-assets': unknown[]
    'pending-rewards': number
    'reward-base': number
    rewards: number
    round: number
    status: string
}

/**
 * An Algorand account object.
 *
 * Contains an Algorand address and secret key.
 */
export default interface IAccount {
    /**
     * Algorand address
     */
    address: string
    /**
     * Secret key belonging to the Algorand address
     */
    sk: Uint8Array
}
export async function getAccountBalance(
    algodClient: AlgodClient,
    account: string,
): Promise<IAlgorandAccontInformation> {
    //Check your balance
    const accountInfo = await algodClient.accountInformation(account).do()
    console.log('Account balance: %d microAlgos', accountInfo.amount)
    return accountInfo as IAlgorandAccontInformation
}

const TIME_OUT = 1000

/**
 * @description Lets user opt into application so local state can be changed
 * @async
 * @param {Object} client Client Constructor for connecting to test environment
 * @param sender
 * @param {Number} index Number identifier for application
 */
export async function optInApp(client: AlgodClient, sender: string, index: number): Promise<algosdk.Transaction> {
    console.log('optInApp')
    // get node suggested parameters
    const parameters = await client.getTransactionParams().do()
    // comment out the next two lines to use suggested fee
    parameters.fee = 1000
    parameters.flatFee = true

    // create unsigned transaction
    return algosdk.makeApplicationOptInTxn(sender, parameters, index)
}

/**
 * @description Function waits for transaction to complete
 * @param {Object} algodClient Constructor for connecting to test environment
 * @param {String} txId Identification key for the current transaction
 * @param timeout
 */
export async function waitForConfirmation(
    algodClient: AlgodClient,
    txId: string,
    timeout: number,
): Promise<Record<string, any>> {
    const status = await algodClient.status().do()
    if (typeof status === 'undefined') throw new Error('Unable to get node status')
    const startround = status['last-round']
    let currentround = startround

    while (currentround < startround + timeout) {
        const pendingInfo = await algodClient.pendingTransactionInformation(txId).do()
        if (pendingInfo !== undefined) {
            if (pendingInfo['confirmed-round'] !== null && pendingInfo['confirmed-round'] > 0) {
                // Got the completed Transaction
                // Wait for current block to be assimilated

                await algodClient.statusAfterBlock(currentround).do()
                return pendingInfo
            }

            if (pendingInfo['pool-error'] != null && pendingInfo['pool-error'].length > 0) {
                // If there was a pool error, then the transaction has been rejected!
                throw new Error(`Transaction Rejected pool error${pendingInfo['pool-error']}`)
            }
        }
        console.log('Waiting on round ' + currentround)
        await algodClient.statusAfterBlock(currentround).do()
        currentround += 1
    }
    /* eslint-enable no-await-in-loop */
    throw new Error(`Transaction not confirmed after ${timeout} rounds!`)
}

/**
 * @description Calls application & passes arguements
 * @async
 * @param {Object} client Client Constructor for connecting to test environment
 * @param {String} account Wallet SK obtained from mnemonic
 * @param {Number} index Number identifier for application
 * @param {Uint8Array} appArguments passed which are put into a Uint8Array
 */
export async function callApp(
    client: AlgodClient,
    account: Account,
    index: number,
    appArguments: Uint8Array[],
): Promise<void> {
    // define sender
    const sender = account.addr

    // get node suggested parameters
    const parameters = await client.getTransactionParams().do()
    // comment out the next two lines to use suggested fee
    parameters.fee = 1000
    parameters.flatFee = true

    // create unsigned transaction
    const txn = algosdk.makeApplicationNoOpTxn(sender, parameters, index, appArguments)
    const txId = txn.txID().toString()

    // Sign the transaction
    const signedTxn = txn.signTxn(account.sk)
    console.log('Signed transaction with txID: %s', txId)

    // Submit the transaction
    await client.sendRawTransaction(signedTxn).do()

    // Wait for confirmation
    await waitForConfirmation(client, txId, TIME_OUT)

    // display results
    const transactionResponse = await client.pendingTransactionInformation(txId).do()
    console.log('Called app-id:', transactionResponse['txn']['txn']['apid'])
    if (transactionResponse['global-state-delta'] !== undefined) {
        console.log('Global State updated:', transactionResponse['global-state-delta'])
    }
    if (transactionResponse['local-state-delta'] !== undefined) {
        console.log('Local State updated:', transactionResponse['local-state-delta'])
    }
}

/**
 * @description Calls application & passes arguements
 * @async
 * @param {Object} client Client Constructor for connecting to test environment
 * @param {String} sender Wallet SK obtained from mnemonic
 * @param {Number} appId Number identifier for application
 * @param {Number} price Mint Price for application
 */
export async function safeMint(
    client: AlgorandNetwork,
    sender: string,
    appId: number,
    price: number,
    setWarningMessage: React.Dispatch<React.SetStateAction<string>>,
): Promise<TAssetInfoResult[]> {
    console.log('sender:', sender)
    console.log('price:', price)

    const optedInApp = await isOptedInApp(client.getDefaultProvider(),appId,sender)
    let app_opt_txn
    let groupedSignedTxns

    const appInfo = await client.getDefaultProvider().getApplicationByID(appId).do()
    const globalState = await readGlobalState(client.getDefaultProvider(), appInfo.id)

    let assetId = globalState['AI'] as number // string
    let metadataURL = globalState['MJH'] as string // string

    const assetInfo = await client.getDefaultProvider().getAssetByID(assetId).do()
    const assetMatch = assetInfo['params']['url'].match(/\/(\d+)\.[a-z]+\d/)

    const metadata = await axios.get(ipfsToHTTP(`${base64Decode(metadataURL)}/${assetMatch[1]}.json`))

    // get node suggested parameters
    const parameters = await client.getDefaultProvider().getTransactionParams().do()
    // comment out the next two lines to use suggested fee
    parameters.fee = 1000
    parameters.flatFee = true
    const fund_app_txn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
        from: sender,
        to: getApplicationAddress(appId),
        amount: algosdk.algosToMicroalgos(price),
        closeRemainderTo: undefined,
        note: Uint8Array.from(JSON.stringify(metadata.data), x => x.charCodeAt(0)),
        suggestedParams: parameters,
    })

    // Asset Optin
    const asset_opt_txn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
        from: sender,
        amount: 0,
        to: sender,
        assetIndex: assetId,
        suggestedParams: parameters
    })

    // create unsigned transaction
    const mint_txn = await algosdk.makeApplicationNoOpTxnFromObject({
        from: sender,
        appIndex: appId,
        foreignAssets: [assetId],
        suggestedParams: parameters,
        appArgs: [decode(btoa('safe_mint'))]
    })

    if(!optedInApp) {
        app_opt_txn = await optInApp(client.getDefaultProvider(), sender, appId)
        algosdk.assignGroupID([fund_app_txn, app_opt_txn, asset_opt_txn, mint_txn])
        // Sign the transaction
        groupedSignedTxns = await client.signTransaction([fund_app_txn, app_opt_txn, asset_opt_txn, mint_txn])
    } else {
        algosdk.assignGroupID([fund_app_txn, asset_opt_txn, mint_txn])
        // Sign the transaction
        groupedSignedTxns = await client.signTransaction([fund_app_txn, asset_opt_txn, mint_txn])
    }

    // Submit the transaction
    let tx = await client.getDefaultProvider().sendRawTransaction(groupedSignedTxns).do()
    console.log('Transaction : ' + tx.txId)

    // Wait for confirmation
    await waitForConfirmation(client.getDefaultProvider(), tx.txId, TIME_OUT)
    setWarningMessage(
        'Your transaction has completed. We are now loading your NFT. This could take up to 10 minutes.',
    )
    // display results
    const transactionResponse = await client.getDefaultProvider().pendingTransactionInformation(tx.txId).do()
    console.log('Called app-id:', transactionResponse['txn']['txn']['apid'])
    if (transactionResponse['global-state-delta'] !== undefined) {
        console.log('Global State updated:', transactionResponse['global-state-delta'])
    }
    if (transactionResponse['local-state-delta'] !== undefined) {
        console.log('Local State updated:', transactionResponse['local-state-delta'])
    }
    await waitForConfirmation2(client.getDefaultProvider(), mint_txn.txID().toString())

    // Get the new asset's information from the creator account
    let ptx = await client.getDefaultProvider().pendingTransactionInformation(mint_txn.txID().toString()).do();
    console.log('ptx:', ptx['inner-txns'])

    return ptx['inner-txns']
}

/**
 * @description Calls application & passes arguements
 * @async
 * @param {Object} client Client Constructor for connecting to test environment
 * @param account
 * @param assetInfo
 * @param metadata
 */
export async function addAssetConfigNotes(
    client: AlgorandNetwork,
    account: Account,
    assetInfo: Record<string, any>,
    metadata: IMetadataProperties,
): Promise<Record<string, any>> {
    // get node suggested parameters
    const parameters = await client.getDefaultProvider().getTransactionParams().do()
    // comment out the next two lines to use suggested fee
    parameters.fee = 1000
    parameters.flatFee = true
    const asset_config_txn = algosdk.makeAssetConfigTxnWithSuggestedParamsFromObject({
        from: account.addr,
        note: Uint8Array.from(JSON.stringify(metadata), x => x.charCodeAt(0)),
        assetIndex: assetInfo['index'],
        manager: assetInfo['params']['manager'],
        strictEmptyAddressChecking: false,
        suggestedParams: parameters
    })

    const signedTxn = asset_config_txn.signTxn(account.sk)

    // Submit the transaction
    let tx = await client.getDefaultProvider().sendRawTransaction(signedTxn).do()
    // Wait for confirmation
    await waitForConfirmation(client.getDefaultProvider(), tx.txId, TIME_OUT)
    // display results
    const transactionResponse = await client.getDefaultProvider().pendingTransactionInformation(tx.txId).do()
    console.log('Called app-id:', transactionResponse)
    return transactionResponse
}

/**
 * @description Calls application & passes arguements
 * @async
 * @param {Object} client Client Constructor for connecting to test environment
 * @param assetInfo
 * @param appId
 */
export async function withdrawAsset(
    client: AlgorandNetwork,
    account: Account,
    assetInfo: Record<string, any>,
    appId: number,
): Promise<Record<string, any>> {
    await getAccountBalance(client.getDefaultProvider(),account.addr)
    const optedInAsset = await isOptedInAsset(client.getDefaultProvider(),assetInfo,account.addr)

    if(!optedInAsset) {
        console.log('optedInAsset:', optedInAsset)
        await assetOptIn(client, account.addr, assetInfo, account)
    }

    // get node suggested parameters
    const parameters = await client.getDefaultProvider().getTransactionParams().do()
    // comment out the next two lines to use suggested fee
    parameters.fee = 2000
    parameters.flatFee = true
    const asset_config_txn = algosdk.makeApplicationCallTxnFromObject({
        appIndex: appId,
        from: account.addr,
        foreignAssets: [assetInfo['index']],
        accounts: [account.addr],
        suggestedParams: parameters,
        onComplete: OnApplicationComplete.NoOpOC,
        appArgs: [decode(btoa('withdraw'))]
    })
    // Sign the transaction
    const signedTxn = asset_config_txn.signTxn(account.sk)

    // Submit the transaction
    let tx = await client.getDefaultProvider().sendRawTransaction(signedTxn).do()
    // Wait for confirmation
    await waitForConfirmation(client.getDefaultProvider(), tx.txId, TIME_OUT)
    // display results
    const transactionResponse = await client.getDefaultProvider().pendingTransactionInformation(tx.txId).do()
    console.log('Called app-id:', transactionResponse)
    await getAccountBalance(client.getDefaultProvider(),account.addr)

    return transactionResponse
}

/**
 * @description Calls application & passes arguements
 * @async
 * @param {Object} client Client Constructor for connecting to test environment
 * @param account
 * @param assetInfo
 * @param appId
 * @param metadata
 * @param sender
 */
export async function configAndTransferAsset(
    client: AlgorandNetwork,
    account: Account,
    assetInfo: Record<string, any>,
    metadata: IMetadataProperties,
    sender: string
): Promise<Record<string, any>> {

    const optedInAsset = await isOptedInAsset(client.getDefaultProvider(),assetInfo,sender)
    if(!optedInAsset) {
        console.log('optedInAsset:', optedInAsset)
        await assetOptIn(client, sender, assetInfo, undefined, metadata)
    }

    // get node suggested parameters
    const parameters = await client.getDefaultProvider().getTransactionParams().do()
    // comment out the next two lines to use suggested fee
    parameters.fee = 2000
    parameters.flatFee = true

    const transfer_txn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
        from: account.addr,
        amount: 1,
        to: sender,
        assetIndex: assetInfo['index'],
        suggestedParams: parameters
    })

    // algosdk.assignGroupID([asset_config_txn, transfer_txn])

    // Sign the transaction
    // const aSignedTxn = asset_config_txn.signTxn(account.sk)
    const wSignedTxn = transfer_txn.signTxn(account.sk)

    // Submit the transaction
    let tx = await client.getDefaultProvider().sendRawTransaction([wSignedTxn]).do()
    // Wait for confirmation
    await waitForConfirmation(client.getDefaultProvider(), tx.txId, TIME_OUT)
    // display results
    const transactionResponse = await client.getDefaultProvider().pendingTransactionInformation(tx.txId).do()
    console.log('Called app-id:', transactionResponse)
    return transactionResponse
}

/**
 * @description Calls application & passes arguements
 * @async
 * @param {Object} client Client Constructor for connecting to test environment
 * @param {String} sender Wallet SK obtained from mnemonic
 * @param assetInfo
 */
export async function isOptedInAsset(
    client: algosdk.Algodv2,
    assetInfo: Record<string, any>,
    sender: string,
): Promise<boolean> {
    const account = await getAccountBalance(client, sender)
    for (let i = 0; i < account['assets'].length; i++) {
        const asset = account['assets'][i] as IAccountAssets
        if(asset['asset-id'] === assetInfo['index']) {
            return asset['asset-id'] === assetInfo['index']
        }
    }
    return false
}

/**
 * @description Calls application & passes arguements
 * @async
 * @param {Object} client Client Constructor for connecting to test environment
 * @param appId
 * @param {String} sender Wallet SK obtained from mnemonic
 */
export async function isOptedInApp(
    client: algosdk.Algodv2,
    appId: number,
    sender: string,
): Promise<boolean> {
    const account = await getAccountBalance(client, sender)
    for (let i = 0; i < account['apps-local-state'].length; i++) {
        console.log('apps-local-state', account['apps-local-state'][i])
        const asset = account['apps-local-state'][i] as any
        if(asset['id'] === appId) {
            return asset['id'] === appId
        }
    }
    return false
}

/**
 * @description Calls application & passes arguements
 * @async
 * @param {Object} client Client Constructor for connecting to test environment
 * @param metadata
 * @param account
 * @param {String} sender Wallet SK obtained from mnemonic
 * @param assetInfo
 */
export async function assetOptIn(
    client: AlgorandNetwork,
    sender: string,
    assetInfo: Record<string, any>,
    account?: Account,
    metadata?: IMetadataProperties,
): Promise<Record<string, any>> {
    console.log('assetOptIn')

    // get node suggested parameters
    const parameters = await client.getDefaultProvider().getTransactionParams().do()

    const transfer_txn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
        from: sender,
        amount: 0,
        to: sender,
        assetIndex: assetInfo['index'],
        suggestedParams: parameters
    })

    // Sign the transaction
    let groupedSignedTxns
    if(account) {
        groupedSignedTxns = transfer_txn.signTxn(account.sk)
    } else {
        let enc = new TextEncoder();
        const asset_config_txn = algosdk.makeAssetConfigTxnWithSuggestedParamsFromObject({
            from: sender,
            note: enc.encode(JSON.stringify(metadata)),
            assetIndex: assetInfo['index'],
            manager: assetInfo['params']['manager'],
            strictEmptyAddressChecking: false,
            suggestedParams: parameters
        })

        algosdk.assignGroupID([transfer_txn, asset_config_txn])

        groupedSignedTxns = await client.signTransaction([transfer_txn, asset_config_txn])
    }

    // Submit the transaction
    let tx = await client.getDefaultProvider().sendRawTransaction(groupedSignedTxns).do()
    // Wait for confirmation
    await waitForConfirmation(client.getDefaultProvider(), tx.txId, TIME_OUT)
    // display results
    const transactionResponse = await client.getDefaultProvider().pendingTransactionInformation(tx.txId).do()
    console.log('Called app-id:', transactionResponse)
    return transactionResponse
}

/**
 * @description Calls application & passes arguements
 * @async
 * @param {Object} client Client Constructor for connecting to test environment
 * @param account
 * @param {String} sender Wallet SK obtained from mnemonic
 * @param assetInfo
 */
export async function assetTransfer(
    client: AlgorandNetwork,
    account: Account,
    sender: string,
    assetInfo: Record<string, any>
): Promise<Record<string, any>> {

    const optedInAsset = await isOptedInAsset(client.getDefaultProvider(),assetInfo,sender)
    if(!optedInAsset) {
        console.log('optedInAsset:', optedInAsset)
        await assetOptIn(client, sender, assetInfo)
    }

    // get node suggested parameters
    const parameters = await client.getDefaultProvider().getTransactionParams().do()
    // comment out the next two lines to use suggested fee
    parameters.fee = 1000
    parameters.flatFee = true
    console.log('account.addr:', account.addr)
    console.log('assetInfo[\'index\']', assetInfo['index'])
    console.log('sender:', sender)

    const asset_config_txn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
        from: account.addr,
        amount: 1,
        to: sender,
        assetIndex: assetInfo['index'],
        suggestedParams: parameters
    })

    const signedTxn = asset_config_txn.signTxn(account.sk)

    // Submit the transaction
    let tx = await client.getDefaultProvider().sendRawTransaction(signedTxn).do()
    // Wait for confirmation
    await waitForConfirmation(client.getDefaultProvider(), tx.txId, TIME_OUT)
    await waitForConfirmation(client.getDefaultProvider(), tx.txId, TIME_OUT)
    // display results
    const transactionResponse = await client.getDefaultProvider().pendingTransactionInformation(tx.txId).do()
    console.log('Called app-id:', transactionResponse)
    return transactionResponse
}

// Function used to wait for a tx confirmation
const waitForConfirmation2 = async function (algodclient: AlgodClient,
                                             txId: string) {
    let response = await algodclient.status().do();
    let lastround = response["last-round"];
    while (true) {
        const pendingInfo = await algodclient.pendingTransactionInformation(txId).do();
        if (pendingInfo["confirmed-round"] !== null && pendingInfo["confirmed-round"] > 0) {
            //Got the completed Transaction
            console.log("Transaction " + txId + " confirmed in round " + pendingInfo["confirmed-round"]);
            break;
        }
        lastround++;
        await algodclient.statusAfterBlock(lastround).do();
    }
};

/**
 * @description Calls application & passes arguements
 * @async
 * @param {Object} client Client Constructor for connecting to test environment
 * @param {String} sender Wallet SK obtained from mnemonic
 * @param {Number} appId Number identifier for application
 * @param {Number} price Mint Price for application
 * @param {Number} amount Amount of tokens
 */
export async function safeBatchMint(
    client: AlgorandNetwork,
    sender: string,
    appId: number,
    price: number,
    amount: number,
): Promise<TAssetInfoResult[]> {
    console.log('sender:', sender)

    // get node suggested parameters
    const parameters = await client.getDefaultProvider().getTransactionParams().do()
    // comment out the next two lines to use suggested fee
    parameters.fee = 1000
    parameters.flatFee = true
    const fund_app_txn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
        from: sender,
        to: getApplicationAddress(appId),
        amount: price * amount,
        closeRemainderTo: undefined,
        note: undefined,
        suggestedParams: parameters,
    })

    // create unsigned transaction
    const mint_txn = await makeApplicationCallTransaction(client.getDefaultProvider(), sender, appId, [
        decode(btoa('safe_batch_mint')),
        intToBinaryArray(amount),
    ])

    algosdk.assignGroupID([fund_app_txn, mint_txn])
    console.log('assignGroupID')

    // Sign the transaction
    const groupedSignedTxns = await client.signTransaction([fund_app_txn, mint_txn])

    // Submit the transaction
    const tx = await client.getDefaultProvider().sendRawTransaction(groupedSignedTxns).do()
    console.log('Transaction:', tx)

    // Wait for confirmation
    const result = await waitForConfirmation(client.getDefaultProvider(), tx.txId, TIME_OUT)
    console.log('result', result)

    // display results
    const transactionResponse = await client.getDefaultProvider().pendingTransactionInformation(tx.txId).do()

    if (transactionResponse['global-state-delta'] !== undefined) {
        console.log('Global State updated:', transactionResponse['global-state-delta'])
    }
    if (transactionResponse['local-state-delta'] !== undefined) {
        console.log('Local State updated:', transactionResponse['local-state-delta'])
    }

    await waitForConfirmation2(client.getDefaultProvider(), mint_txn.txID().toString())

    // Get the new asset's information from the creator account
    let ptx = await client.getDefaultProvider().pendingTransactionInformation(mint_txn.txID().toString()).do();
    console.log('ptx:', ptx['inner-txns'])

    return ptx['inner-txns']
}

async function makeApplicationCallTransaction(
    client: AlgodClient,
    sender: string,
    appId: number,
    appArguments: Uint8Array[] | undefined,
) {
    const parameters = await client.getTransactionParams().do()
    return algosdk.makeApplicationNoOpTxn(sender, parameters, appId, appArguments)
}
