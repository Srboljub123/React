import algosdk from 'algosdk'
import sha512 from 'js-sha512'
import { createHash } from 'sha256-uint8array'

const { fromCharCode } = String

export const encode = (uint8array: Uint8Array): string => {
    const output = []
    for (let index = 0, { length } = uint8array; index < length; index++) output.push(fromCharCode(uint8array[index]))
    return btoa(output.join(''))
}
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const decode = (chars: string): Uint8Array => Uint8Array.from(atob(chars), asCharCode)

const asCharCode = (c: string) => c.codePointAt(0)

export async function readGlobalState(
    client: algosdk.Algodv2,
    appId: number,
): Promise<{ [key: string]: string | number }> {
    const app = await client.getApplicationByID(appId).do()
    return decodeState(app.params['global-state'])
}

export function decodeState(stateArray: any[]): { [key: string]: string | number } {
    const state: { [key: string]: string | number } = {}
    const PAIR_VALUE = 2
    for (const pair of stateArray) {
        const key = atob(pair.key)
        state[key] = pair.value.type == PAIR_VALUE ? pair.value.uint : pair.value.bytes
    }

    return state
}

// export async function readLocalState(
//     client: algosdk.Algodv2,
//     appId: number,
//     account: string,
// ): Promise<{ [key: string]: string | number } | undefined> {
//     const ai = await client.accountInformation(account).do()
//     for (const app of ai['apps-local-state']) {
//         if (app.id == appId) {
//             return decodeState(app['key-value'])
//         }
//     }
// }

export function makeHashIterate(secret: string | Uint8Array, k: number): Uint8Array {
    let v: Uint8Array = createHash()
        .update(secret as any)
        .digest()
    for (let index = 0; index < k - 1; ++index) {
        v = createHash().update(v).digest()
    }
    return v
}

export function concatUint8Arrays(a1: Uint8Array, a2: Uint8Array): Uint8Array {
    const temporary = new Uint8Array(a1.length + a2.length)
    temporary.set(a1)
    temporary.set(a2, a1.length)
    return temporary
}

export function base64Encode(value: string): string {
    return Buffer.from(value, 'ascii').toString('base64')
}

export function base64Decode(value: string): string {
    return Buffer.from(value, 'base64').toString('ascii')
}

export function binaryToInt(bin: string): number {
    return algosdk.decodeUint64(Buffer.from(bin), algosdk.IntDecoding.SAFE)
}

export function intToBinary(index: number): string {
    return Buffer.from(intToBinaryArray(index)).toString('ascii')
}

export function intToBinaryArray(index: number): Uint8Array {
    return algosdk.encodeUint64(index)
}

export function base64ToAddress(b64: string): string {
    const buf = Buffer.from(b64, 'base64')
    return algosdk.encodeAddress(new Uint8Array(buf))
}

export function camelSentence(blockchain: string): string {
    return (' ' + blockchain)
        .toLowerCase()
        .replace(/[^\dA-Za-z]+(.)/g, function (_match, chr) {
            return chr.toUpperCase()
        })
        .replace('net', 'Net')
}

export function checksum(content: string): number[] {
    return sha512.sha512_256.array(content)
}

export function ipfsToHTTP(image: string): string {
    return image.startsWith('ipfs') ? image.replaceAll('ipfs://', 'https://faktura.mypinata.cloud/ipfs/') : image
}
