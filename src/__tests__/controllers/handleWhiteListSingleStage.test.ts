import {
    getCurrentListPosition,
    validateLists,
    validateTimer,
} from '@controllers/AlgorandController/Private/handleWhiteLists.controller'

import * as timer from '../mocks/whiteLists'
const {
    singleStageComingSoon,
    singleStageTimeToMint,
    singleStageTimeToMintEmptyWhiteList,
    dualStageComingSoon,
    dualStageTimeToMint,
    dualStageTimeToMintEmptyWhiteList,
    multipleStageComingSoon,
    multipleStageTimeToMint,
    multipleStageEmptyWhiteList,
    useCase1,
    useCase2,
    useCase3,
    useCase4,
    useCase5,
    recentDays1,
    recentDays2,
} = timer

const mockedGetCurrentAccount1 = async () => {
    return ['hugoleonardodev']
}
const mockedGetCurrentAccount2 = async () => {
    return ['mataide']
}
const mockedGetCurrentAccount3 = async () => {
    return ['john']
}
const mockedGetCurrentAccount4 = async () => {
    return ['monica']
}

const handleWhiteListsController = async (
    lists: ITimerEndPoint[],
    getCurrentAccount: () => Promise<string[]>,
): Promise<boolean> => {
    const listsCurrentPosition = getCurrentListPosition(lists)
    console.log('listsCurrentPosition', listsCurrentPosition)
    const isTimeToMint = validateTimer(lists, listsCurrentPosition)
    console.log('isTimeToMint', isTimeToMint)
    const account = await getCurrentAccount()
    const isInWhiteList = await validateLists(lists, listsCurrentPosition, account[0])
    console.log('isInWhiteList', isInWhiteList)

    if (isTimeToMint && (lists.length === 0 || lists[listsCurrentPosition].whitelist.length === 0)) {
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

// IF YOU WANT TO CHECK THE RESULTS OF A ISOLOTED TEST USE it.only

// it.only('return false when the user is in white list, and it is NOT time to mint (stage === 0):', async () => {
//     const isInWhiteList = await handleWhiteListsController(recentDays2.endPoints, mockedGetCurrentAccount1)
//     expect(isInWhiteList).toBe(false)
// })

describe('Single stage behavior for different users:', () => {
    // User is in white list
    it('Account1: return false when given address is in white list, and it is NOT time to mint (stage === 0)', async () => {
        const isInWhiteList = await handleWhiteListsController(
            singleStageComingSoon.endPoints,
            mockedGetCurrentAccount1,
        )
        expect(isInWhiteList).toBe(false)
    })
    it('Account1: return true when given address is in white list, and it is time to mint (stage > 0):', async () => {
        const isInWhiteList = await handleWhiteListsController(
            singleStageTimeToMint.endPoints,
            mockedGetCurrentAccount1,
        )
        expect(isInWhiteList).toBe(true)
    })
    it('Account1: return true when the white list is empty, and it is time to mint (stage > 0):', async () => {
        const isInWhiteList = await handleWhiteListsController(
            singleStageTimeToMintEmptyWhiteList.endPoints,
            mockedGetCurrentAccount1,
        )
        expect(isInWhiteList).toBe(true)
    })

    // User is NOT in white list
    it('Account2: return false when given address is NOT in white list, and it is NOT time to mint (stage === 0):', async () => {
        const isInWhiteList = await handleWhiteListsController(
            singleStageComingSoon.endPoints,
            mockedGetCurrentAccount2,
        )
        expect(isInWhiteList).toBe(false)
    })
    it('Account2: return false when given address is NOT in white list, and it is time to mint (stage > 0):', async () => {
        const isInWhiteList = await handleWhiteListsController(
            singleStageTimeToMint.endPoints,
            mockedGetCurrentAccount2,
        )
        expect(isInWhiteList).toBe(false)
    })
})

describe('Dual stages behavior for different users:', () => {
    // User is in white list
    it('Account1: return false when given address is in white list, and it is NOT time to mint (stage === 0):', async () => {
        const isInWhiteList = await handleWhiteListsController(dualStageComingSoon.endPoints, mockedGetCurrentAccount1)
        expect(isInWhiteList).toBe(false)
    })
    it('Account1: return true when given address is in white list, and it is time to mint (stage > 0):', async () => {
        const isInWhiteList = await handleWhiteListsController(dualStageTimeToMint.endPoints, mockedGetCurrentAccount1)
        expect(isInWhiteList).toBe(true)
    })
    it('Account1: return true when the white list is empty, and it is time to mint (stage > 0):', async () => {
        const isInWhiteList = await handleWhiteListsController(
            dualStageTimeToMintEmptyWhiteList.endPoints,
            mockedGetCurrentAccount1,
        )
        expect(isInWhiteList).toBe(true)
    })

    // User is NOT in white list
    it('Account2: return false when given address is NOT in white list, and it is NOT time to mint (stage === 0):', async () => {
        const isInWhiteList = await handleWhiteListsController(dualStageComingSoon.endPoints, mockedGetCurrentAccount2)
        expect(isInWhiteList).toBe(false)
    })
    it('Account2: return false when given address is NOT in white list, and it is NOT time to mint (stage > 0):', async () => {
        const isInWhiteList = await handleWhiteListsController(dualStageTimeToMint.endPoints, mockedGetCurrentAccount2)
        expect(isInWhiteList).toBe(false)
    })
})

describe('Multiple stages behavior for different users:', () => {
    // User is in white list
    it('Account1: return false when given address is in white list, and it is NOT time to mint (stage === 0):', async () => {
        const isInWhiteList = await handleWhiteListsController(
            multipleStageComingSoon.endPoints,
            mockedGetCurrentAccount1,
        )
        expect(isInWhiteList).toBe(false)
    })
    it('Account1: return true when given address is in white list, and it is time to mint (stage > 0):', async () => {
        const isInWhiteList = await handleWhiteListsController(
            multipleStageTimeToMint.endPoints,
            mockedGetCurrentAccount1,
        )
        expect(isInWhiteList).toBe(true)
    })
    it('Account1: return true when the white list is empty, and it is time to mint (stage > 0):', async () => {
        const isInWhiteList = await handleWhiteListsController(
            multipleStageEmptyWhiteList.endPoints,
            mockedGetCurrentAccount1,
        )
        expect(isInWhiteList).toBe(true)
    })

    // User is NOT in white list
    it('Account2: return false when given address is NOT in white list, and it is NOT time to mint (stage === 0):', async () => {
        const isInWhiteList = await handleWhiteListsController(
            multipleStageComingSoon.endPoints,
            mockedGetCurrentAccount2,
        )
        expect(isInWhiteList).toBe(false)
    })
    it('Account2: return false when given address is NOT in white list, and it is time to mint (stage > 0):', async () => {
        const isInWhiteList = await handleWhiteListsController(
            multipleStageTimeToMint.endPoints,
            mockedGetCurrentAccount2,
        )
        expect(isInWhiteList).toBe(false)
    })
    it('Account2: return true when the white list is empty, and it is time to mint (stage > 0):', async () => {
        const isInWhiteList = await handleWhiteListsController(
            multipleStageEmptyWhiteList.endPoints,
            mockedGetCurrentAccount2,
        )
        expect(isInWhiteList).toBe(true)
    })
})

describe('Empty White Lists behavior', () => {
    // Single stage
    it('Account1: return false when the white list is empty, and it is NOT time to mint (stage === 0):', async () => {
        const isInWhiteList = await handleWhiteListsController(
            singleStageComingSoon.endPoints,
            mockedGetCurrentAccount1,
        )
        expect(isInWhiteList).toBe(false)
    })
    it('Account1: return true when the white list is empty, and it is time to mint (stage > 0):', async () => {
        const isInWhiteList = await handleWhiteListsController(
            singleStageTimeToMintEmptyWhiteList.endPoints,
            mockedGetCurrentAccount1,
        )
        expect(isInWhiteList).toBe(true)
    })
    it('Account2: return true when the white list is empty, and it is time to mint (stage > 0):', async () => {
        const isInWhiteList = await handleWhiteListsController(
            singleStageTimeToMintEmptyWhiteList.endPoints,
            mockedGetCurrentAccount2,
        )
        expect(isInWhiteList).toBe(true)
    })
    it('Account3: return true when the white list is empty, and it is time to mint (stage > 0):', async () => {
        const isInWhiteList = await handleWhiteListsController(
            singleStageTimeToMintEmptyWhiteList.endPoints,
            mockedGetCurrentAccount3,
        )
        expect(isInWhiteList).toBe(true)
    })

    // Dual stages
    it('Account1: return false when the white list is empty, and it is NOT time to mint (stage === 0):', async () => {
        const isInWhiteList = await handleWhiteListsController(dualStageComingSoon.endPoints, mockedGetCurrentAccount1)
        expect(isInWhiteList).toBe(false)
    })
    it('Account1: return true when the white list is empty, and it is time to mint (stage > 0):', async () => {
        const isInWhiteList = await handleWhiteListsController(
            dualStageTimeToMintEmptyWhiteList.endPoints,
            mockedGetCurrentAccount1,
        )
        expect(isInWhiteList).toBe(true)
    })
    it('Account2: return true when the white list is empty, and it is time to mint (stage > 0):', async () => {
        const isInWhiteList = await handleWhiteListsController(
            dualStageTimeToMintEmptyWhiteList.endPoints,
            mockedGetCurrentAccount2,
        )
        expect(isInWhiteList).toBe(true)
    })
    it('Account3: return true when the white list is empty, and it is time to mint (stage > 0):', async () => {
        const isInWhiteList = await handleWhiteListsController(
            dualStageTimeToMintEmptyWhiteList.endPoints,
            mockedGetCurrentAccount3,
        )
        expect(isInWhiteList).toBe(true)
    })

    // Multiple stages
    it('Account1: return true when the white list is empty, and it is time to mint (stage > 0):', async () => {
        const isInWhiteList = await handleWhiteListsController(
            multipleStageEmptyWhiteList.endPoints,
            mockedGetCurrentAccount1,
        )
        expect(isInWhiteList).toBe(true)
    })
    it('Account2: return true when the white list is empty, and it is time to mint (stage > 0):', async () => {
        const isInWhiteList = await handleWhiteListsController(
            multipleStageEmptyWhiteList.endPoints,
            mockedGetCurrentAccount2,
        )
        expect(isInWhiteList).toBe(true)
    })
    it('Account3: return true when the white list is empty, and it is time to mint (stage > 0):', async () => {
        const isInWhiteList = await handleWhiteListsController(
            dualStageTimeToMintEmptyWhiteList.endPoints,
            mockedGetCurrentAccount3,
        )
        expect(isInWhiteList).toBe(true)
    })
})

describe('Use case for account 1, in different dates:', () => {
    it('return false when the user is in white list, and it NOT is time to mint (stage === 0):', async () => {
        const isInWhiteList = await handleWhiteListsController(useCase1.endPoints, mockedGetCurrentAccount1)
        expect(isInWhiteList).toBe(false)
    })
    it('return true when the user is in white list, and it is time to mint (stage === 1):', async () => {
        const isInWhiteList = await handleWhiteListsController(useCase2.endPoints, mockedGetCurrentAccount1)
        expect(isInWhiteList).toBe(true)
    })
    it('return true when the user is in white list, and it is time to mint (stage === 2):', async () => {
        const isInWhiteList = await handleWhiteListsController(useCase3.endPoints, mockedGetCurrentAccount1)
        expect(isInWhiteList).toBe(true)
    })
    it('return true when the user is in white list, and it is time to mint (stage === 3):', async () => {
        const isInWhiteList = await handleWhiteListsController(useCase4.endPoints, mockedGetCurrentAccount1)
        expect(isInWhiteList).toBe(true)
    })
    it('return true when the user is in white list, and it is time to mint (stage === 3):', async () => {
        const isInWhiteList = await handleWhiteListsController(useCase5.endPoints, mockedGetCurrentAccount1)
        expect(isInWhiteList).toBe(true)
    })
})

describe('Use case for account 2, in different dates:', () => {
    it('return false when the user is in white list, and it NOT is time to mint:', async () => {
        const isInWhiteList = await handleWhiteListsController(useCase1.endPoints, mockedGetCurrentAccount2)
        expect(isInWhiteList).toBe(false)
    })
    it('return false when the user is NOT in white list, and it is time to mint (stage === 0):', async () => {
        const isInWhiteList = await handleWhiteListsController(useCase2.endPoints, mockedGetCurrentAccount2)
        expect(isInWhiteList).toBe(false)
    })
    it('return true when the user is in white list, and it is time to mint (stage === 1):', async () => {
        const isInWhiteList = await handleWhiteListsController(useCase3.endPoints, mockedGetCurrentAccount2)
        expect(isInWhiteList).toBe(true)
    })
    it('return true when the user is in white list, and it is time to mint (stage === 2):', async () => {
        const isInWhiteList = await handleWhiteListsController(useCase4.endPoints, mockedGetCurrentAccount2)
        expect(isInWhiteList).toBe(true)
    })
    it('return true when the user is in white list, and it is time to mint (stage === 3):', async () => {
        const isInWhiteList = await handleWhiteListsController(useCase5.endPoints, mockedGetCurrentAccount2)
        expect(isInWhiteList).toBe(true)
    })
})

describe('Use case for account 3, in different dates:', () => {
    it('return false when the user is in white list, and it NOT is time to mint:', async () => {
        const isInWhiteList = await handleWhiteListsController(useCase1.endPoints, mockedGetCurrentAccount3)
        expect(isInWhiteList).toBe(false)
    })
    it('return false when the user is NOT in white list, and it is time to mint (stage === 0):', async () => {
        const isInWhiteList = await handleWhiteListsController(useCase2.endPoints, mockedGetCurrentAccount3)
        expect(isInWhiteList).toBe(false)
    })
    it('return false when the user is NOT in white list, and it is time to mint (stage === 1):', async () => {
        const isInWhiteList = await handleWhiteListsController(useCase3.endPoints, mockedGetCurrentAccount3)
        expect(isInWhiteList).toBe(false)
    })
    it('return true when the user is in white list, and it is time to mint (stage === 2):', async () => {
        const isInWhiteList = await handleWhiteListsController(useCase4.endPoints, mockedGetCurrentAccount3)
        expect(isInWhiteList).toBe(true)
    })
    it('return true when the user is in white list, and it is time to mint (stage === 3):', async () => {
        const isInWhiteList = await handleWhiteListsController(useCase5.endPoints, mockedGetCurrentAccount3)
        expect(isInWhiteList).toBe(true)
    })
})

describe('Use case for account 4, in different dates:', () => {
    it('return false when the user is in white list, and it NOT is time to mint (stage === 0):', async () => {
        const isInWhiteList = await handleWhiteListsController(useCase1.endPoints, mockedGetCurrentAccount4)
        expect(isInWhiteList).toBe(false)
    })
    it('return false when the user is NOT in white list, and it is time to mint (stage === 1):', async () => {
        const isInWhiteList = await handleWhiteListsController(useCase2.endPoints, mockedGetCurrentAccount4)
        expect(isInWhiteList).toBe(false)
    })
    it('return false when the user is NOT in white list, and it is time to mint (stage === 2):', async () => {
        const isInWhiteList = await handleWhiteListsController(useCase3.endPoints, mockedGetCurrentAccount4)
        expect(isInWhiteList).toBe(false)
    })
    it('return false when the user is NOT in white list, and it is time to mint (stage === 3):', async () => {
        const isInWhiteList = await handleWhiteListsController(useCase4.endPoints, mockedGetCurrentAccount4)
        expect(isInWhiteList).toBe(false)
    })
    it('return true when the user is in white list, and it is time to mint (stage === 4):', async () => {
        const isInWhiteList = await handleWhiteListsController(useCase5.endPoints, mockedGetCurrentAccount4)
        expect(isInWhiteList).toBe(true)
    })
})

describe('Tests for the current days (must change the dates before run):', () => {
    it('return false when the user is in white list, and it is NOT time to mint (stage === 0):', async () => {
        const isInWhiteList = await handleWhiteListsController(recentDays1.endPoints, mockedGetCurrentAccount1)
        expect(isInWhiteList).toBe(false)
    })
    it('return false when the user is NOT in white list, and it is NOT time to mint (stage === 0):', async () => {
        const isInWhiteList = await handleWhiteListsController(recentDays1.endPoints, mockedGetCurrentAccount2)
        expect(isInWhiteList).toBe(false)
    })
    it('return false when the user is NOT in white list, and it is NOT time to mint (stage === 0):', async () => {
        const isInWhiteList = await handleWhiteListsController(recentDays1.endPoints, mockedGetCurrentAccount3)
        expect(isInWhiteList).toBe(false)
    })
    it('return false when the user is NOT in white list, and it is NOT time to mint (stage === 0):', async () => {
        const isInWhiteList = await handleWhiteListsController(recentDays1.endPoints, mockedGetCurrentAccount4)
        expect(isInWhiteList).toBe(false)
    })

    // SKIPPED TESTS MUST BE HANDLED WITH UPDATED RECENTE DAYS OBJECT

    it.skip('return false when the user is in white list, and it is NOT time to mint (stage === 0):', async () => {
        const isInWhiteList = await handleWhiteListsController(recentDays2.endPoints, mockedGetCurrentAccount1)
        expect(isInWhiteList).toBe(false)
    })
    it.skip('return false when the user is NOT in white list, and it is NOT time to mint (stage === 0):', async () => {
        const isInWhiteList = await handleWhiteListsController(recentDays2.endPoints, mockedGetCurrentAccount2)
        expect(isInWhiteList).toBe(false)
    })
    it.skip('return false when the user is NOT in white list, and it is NOT time to mint (stage === 0):', async () => {
        const isInWhiteList = await handleWhiteListsController(recentDays2.endPoints, mockedGetCurrentAccount3)
        expect(isInWhiteList).toBe(false)
    })
    it.skip('return false when the user is NOT in white list, and it is NOT time to mint (stage === 0):', async () => {
        const isInWhiteList = await handleWhiteListsController(recentDays2.endPoints, mockedGetCurrentAccount4)
        expect(isInWhiteList).toBe(false)
    })
})
