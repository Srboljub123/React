import { compareAsc } from 'date-fns'

import EthereumNetwork from '@providers/EthereumNetwork'
import moment from 'moment-timezone'

export const validateTimer = (lists: ITimerEndPoint[], listsPosition: number): boolean => {
    const now = new Date()

    if (lists.length === 1) {
        const currentEndPointOb = new Date(
            lists[listsPosition]?.date.year,
            lists[listsPosition]?.date.month - 1,
            lists[listsPosition]?.date.day,
            lists[listsPosition]?.date.hour,
            lists[listsPosition]?.date.minute,
            lists[listsPosition]?.date.second,
        )
        const currentEndPoint = moment.utc(currentEndPointOb).tz('America/New_York')
        moment.tz.setDefault('America/New_York')
        const isCurrentEndPointPast = compareAsc(currentEndPoint.toDate(), now)

        return isCurrentEndPointPast <= 0
    }

    const currentEndPoint = new Date(
        lists[listsPosition - 1]?.date.year,
        lists[listsPosition - 1]?.date.month - 1,
        lists[listsPosition - 1]?.date.day,
        lists[listsPosition - 1]?.date.hour,
        lists[listsPosition - 1]?.date.minute,
        lists[listsPosition - 1]?.date.second,
    )
    const isCurrentEndPointPast = compareAsc(currentEndPoint, now)

    return isCurrentEndPointPast <= 0
}

export const validateLists = async (
    lists: ITimerEndPoint[],
    listsPosition: number,
    selectedAddresses: string,
): Promise<boolean> => {
    console.log('selectedAddresses', selectedAddresses)
    console.log('listsPosition', listsPosition)
    const results = []

    const currentLists = lists.length === 1 ? lists : lists.slice(0, listsPosition)

    for (const list of currentLists) {
        const validateAddress = list.whitelist.find(
            (addressInWhiteList: string) => addressInWhiteList.toLowerCase() === selectedAddresses.toLowerCase(),
        )
        validateAddress ? results.push(true) : results.push(false)
    }
    console.log(results)
    return results.includes(true)
}

export const getCurrentListPosition = (lists: ITimerEndPoint[]): number => {
    const now = new Date()
    let currentPosition = 0
    for (const list of lists) {
        const currentEndPoint = new Date(
            list?.date.year,
            list?.date.month,
            list?.date.day,
            list?.date.hour,
            list?.date.minute,
            list?.date.second,
        )
        const isCurrentEndPointPast = compareAsc(currentEndPoint, now)
        if (isCurrentEndPointPast >= 0) {
            currentPosition = lists.indexOf(list)
            break
        }
    }
    if (currentPosition === 0 && lists.length > 1) {
        currentPosition = lists.length - 1
        return currentPosition
    }
    return currentPosition
}

const handleWhiteListsController = async (lists: ITimerEndPoint[], provider: EthereumNetwork): Promise<boolean> => {
    const listsCurrentPosition = getCurrentListPosition(lists)
    console.log('listsCurrentPosition', listsCurrentPosition)
    const isTimeToMint = validateTimer(lists, listsCurrentPosition)
    console.log('isTimeToMint', isTimeToMint)
    const account = await provider.getCurrentAccount()
    const isInWhiteList = await validateLists(lists, listsCurrentPosition, account[0])
    console.log('isInWhiteList', isInWhiteList)

    if (lists.length === 0 || lists[listsCurrentPosition].whitelist.length === 0) {
        return true
    }
    if (listsCurrentPosition + 1 === lists.length && isTimeToMint) {
        console.log('listsCurrentPosition + 1 === lists.length')
        const isTime = validateTimer(lists, listsCurrentPosition + 1)
        console.log('isTime', isTime)
        const isInList = await validateLists(lists, listsCurrentPosition + 1, account[0])
        console.log('isInList', isInList)
        if (!isTime) {
            return isInWhiteList
        }
        return isTime && isInList
    }
    if (isTimeToMint && isInWhiteList) {
        return true
    }
    return false
}

export default handleWhiteListsController
