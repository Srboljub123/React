import { compareAsc } from 'date-fns'
import moment from 'moment-timezone'

import AlgorandNetwork from '@providers/AlgorandNetwork'

export const validateTimer = (lists: ITimerEndPoint[], listsPosition: number): boolean => {
    moment.tz.setDefault('America/Mexico_City')
    const nowOb = moment.now()

    if (lists.length === 1) {
        const currentEndPointOb = moment({
            year: lists[listsPosition]?.date.year,
            month: lists[listsPosition]?.date.month - 1,
            day: lists[listsPosition]?.date.day,
            hour: lists[listsPosition]?.date.hour,
            minute: lists[listsPosition]?.date.minute,
            second: lists[listsPosition]?.date.second,
        })
        const isCurrentEndPointPast = compareAsc(currentEndPointOb.toDate(), nowOb)

        return isCurrentEndPointPast <= 0
    }
    const currentEndPointOb = moment({
        year: lists[listsPosition - 1]?.date.year,
        month: lists[listsPosition - 1]?.date.month - 1,
        day: lists[listsPosition - 1]?.date.day,
        hour: lists[listsPosition - 1]?.date.hour,
        minute: lists[listsPosition - 1]?.date.minute,
        second: lists[listsPosition - 1]?.date.second,
    })

    moment.tz.setDefault('America/Mexico_City')
    const isCurrentEndPointPast = compareAsc(currentEndPointOb.toDate(), nowOb)

    return isCurrentEndPointPast <= 0
}

export const validateLists = async (
    lists: ITimerEndPoint[],
    listsPosition: number,
    selectedAddresses: string,
): Promise<boolean> => {
    const results = []

    const currentLists = lists.length === 1 ? lists : lists.slice(0, listsPosition)

    for (const list of currentLists) {
        const validateAddress = list.whitelist.find(
            (addressInWhiteList: string) => addressInWhiteList.toLowerCase() === selectedAddresses.toLowerCase(),
        )
        validateAddress ? results.push(true) : results.push(false)
    }
    return results.includes(true)
}

export const getCurrentListPosition = (lists: ITimerEndPoint[]): number => {
    moment.tz.setDefault('America/Mexico_City')
    const nowOb = moment.now()
    let currentPosition = 0
    for (const list of lists) {
        const currentEndPointOb = moment({
            year: list?.date.year,
            month: list?.date.month - 1,
            day: list?.date.day,
            hour: list?.date.hour,
            minute: list?.date.minute,
            second: list?.date.second,
        })
        const isCurrentEndPointPast = compareAsc(currentEndPointOb.toDate(), nowOb)
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

const handleWhiteListsController = async (lists: ITimerEndPoint[], provider: AlgorandNetwork): Promise<boolean> => {
    const listsCurrentPosition = getCurrentListPosition(lists)
    console.log('listsCurrentPosition', listsCurrentPosition)
    const isTimeToMint = validateTimer(lists, listsCurrentPosition)
    console.log('isTimeToMint', isTimeToMint)
    const account = await provider.getCurrentAccount()
    const isInWhiteList = await validateLists(lists, listsCurrentPosition, account[0])
    console.log('isInWhiteList', isInWhiteList)

    console.log(
        'lists[listsCurrentPosition].whitelist.length === 0',
        lists[listsCurrentPosition].whitelist.length === 0,
    )
    if (isTimeToMint && lists[listsCurrentPosition].whitelist.length === 0) {
        return true
    }
    if (isTimeToMint && isInWhiteList) {
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
    return false
}

export default handleWhiteListsController
