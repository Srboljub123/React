const singleStageComingSoon = {
    endPoints: [
        {
            date: {
                year: 2022,
                month: 12,
                day: 21,
                hour: 18,
                minute: 6,
                second: 10,
            },
            message: 'Coming soon...',
            whitelist: ['hugoleonardodev'],
        },
    ],
}

const singleStageTimeToMint = {
    endPoints: [
        {
            date: {
                year: 2022,
                month: 2,
                day: 21,
                hour: 18,
                minute: 6,
                second: 10,
            },
            message: 'Coming soon...',
            whitelist: ['hugoleonardodev'],
        },
    ],
}

const singleStageTimeToMintEmptyWhiteList = {
    endPoints: [
        {
            date: {
                year: 2022,
                month: 1,
                day: 21,
                hour: 18,
                minute: 6,
                second: 10,
            },
            message: 'Coming soon...',
            whitelist: [],
        },
    ],
}

const dualStageComingSoon = {
    endPoints: [
        {
            date: {
                year: 2022,
                month: 12,
                day: 21,
                hour: 18,
                minute: 6,
                second: 10,
            },
            message: 'Coming soon...',
            whitelist: ['hugoleonardodev'],
        },
        {
            date: {
                year: 2022,
                month: 12,
                day: 22,
                hour: 18,
                minute: 6,
                second: 10,
            },
            message: 'If you own a Curse Ticket NFT, you can now mint until the timer runs out:',
            whitelist: ['mataide'],
        },
    ],
}

const dualStageTimeToMint = {
    endPoints: [
        {
            date: {
                year: 2022,
                month: 1,
                day: 21,
                hour: 18,
                minute: 6,
                second: 10,
            },
            message: 'Coming soon...',
            whitelist: ['hugoleonardodev'],
        },
        {
            date: {
                year: 2022,
                month: 12,
                day: 21,
                hour: 19,
                minute: 6,
                second: 10,
            },
            message: 'If you own a Curse Ticket NFT, you can now mint until the timer runs out:',
            whitelist: ['mataide'],
        },
    ],
}

const dualStageTimeToMintEmptyWhiteList = {
    endPoints: [
        {
            date: {
                year: 2022,
                month: 1,
                day: 21,
                hour: 18,
                minute: 6,
                second: 10,
            },
            message: 'Coming soon...',
            whitelist: [],
        },
        {
            date: {
                year: 2022,
                month: 12,
                day: 21,
                hour: 19,
                minute: 6,
                second: 10,
            },
            message: 'If you own a Curse Ticket NFT, you can now mint until the timer runs out:',
            whitelist: [],
        },
    ],
}

const multipleStageComingSoon = {
    endPoints: [
        {
            date: {
                year: 2022,
                month: 12,
                day: 21,
                hour: 18,
                minute: 6,
                second: 10,
            },
            message: 'Coming soon...',
            whitelist: ['hugoleonardodev'],
        },
        {
            date: {
                year: 2022,
                month: 12,
                day: 21,
                hour: 19,
                minute: 6,
                second: 10,
            },
            message: 'If you own a Curse Ticket NFT, you can now mint until the timer runs out:',
            whitelist: ['mataide'],
        },
        {
            date: {
                year: 2022,
                month: 12,
                day: 21,
                hour: 20,
                minute: 6,
                second: 10,
            },
            message: 'If you are in our whitelist, you can mint now!',
            whitelist: ['john'],
        },
    ],
}

const multipleStageTimeToMint = {
    endPoints: [
        {
            date: {
                year: 2022,
                month: 1,
                day: 21,
                hour: 18,
                minute: 6,
                second: 10,
            },
            message: 'Coming soon...',
            whitelist: ['hugoleonardodev'],
        },
        {
            date: {
                year: 2022,
                month: 12,
                day: 21,
                hour: 19,
                minute: 6,
                second: 10,
            },
            message: 'If you own a Curse Ticket NFT, you can now mint until the timer runs out:',
            whitelist: ['mataide'],
        },
        {
            date: {
                year: 2022,
                month: 12,
                day: 21,
                hour: 20,
                minute: 6,
                second: 10,
            },
            message: 'If you are in our whitelist, you can mint now!',
            whitelist: ['john'],
        },
    ],
}

const multipleStageEmptyWhiteList = {
    endPoints: [
        {
            date: {
                year: 2022,
                month: 1,
                day: 21,
                hour: 18,
                minute: 6,
                second: 10,
            },
            message: 'Coming soon...',
            whitelist: [],
        },
        {
            date: {
                year: 2022,
                month: 12,
                day: 21,
                hour: 19,
                minute: 6,
                second: 10,
            },
            message: 'If you own a Curse Ticket NFT, you can now mint until the timer runs out:',
            whitelist: [],
        },
        {
            date: {
                year: 2022,
                month: 12,
                day: 21,
                hour: 19,
                minute: 6,
                second: 10,
            },
            message:
                'If you are among the top 1,000 people in our whitelist, you can now mint until the timer runs out:',
            whitelist: [],
        },
    ],
}

const useCase1 = {
    endPoints: [
        {
            date: {
                year: 2022,
                month: 12,
                day: 21,
                hour: 18,
                minute: 6,
                second: 10,
            },
            message: 'Coming soon...',
            whitelist: ['hugoleonardodev'],
        },
        {
            date: {
                year: 2022,
                month: 12,
                day: 22,
                hour: 19,
                minute: 6,
                second: 10,
            },
            message: 'If you own a Curse Ticket NFT, you can now mint until the timer runs out:',
            whitelist: ['mataide'],
        },
        {
            date: {
                year: 2022,
                month: 12,
                day: 23,
                hour: 19,
                minute: 6,
                second: 10,
            },
            message:
                'If you are among the top 1,000 people in our whitelist, you can now mint until the timer runs out:',
            whitelist: ['john'],
        },
        {
            date: {
                year: 2022,
                month: 12,
                day: 24,
                hour: 19,
                minute: 6,
                second: 10,
            },
            message:
                'If you are among the top 10,000 people in our whitelist, you can now mint until the timer runs out:',
            whitelist: ['monica'],
        },
    ],
}

const useCase2 = {
    endPoints: [
        {
            date: {
                year: 2022,
                month: 1,
                day: 21,
                hour: 18,
                minute: 6,
                second: 10,
            },
            message: 'Coming soon...',
            whitelist: ['hugoleonardodev'],
        },
        {
            date: {
                year: 2022,
                month: 12,
                day: 22,
                hour: 19,
                minute: 6,
                second: 10,
            },
            message: 'If you own a Curse Ticket NFT, you can now mint until the timer runs out:',
            whitelist: ['mataide'],
        },
        {
            date: {
                year: 2022,
                month: 12,
                day: 23,
                hour: 19,
                minute: 6,
                second: 10,
            },
            message:
                'If you are among the top 1,000 people in our whitelist, you can now mint until the timer runs out:',
            whitelist: ['john'],
        },
        {
            date: {
                year: 2022,
                month: 12,
                day: 24,
                hour: 19,
                minute: 6,
                second: 10,
            },
            message:
                'If you are among the top 10,000 people in our whitelist, you can now mint until the timer runs out:',
            whitelist: ['monica'],
        },
    ],
}

const useCase3 = {
    endPoints: [
        {
            date: {
                year: 2022,
                month: 1,
                day: 1,
                hour: 18,
                minute: 6,
                second: 10,
            },
            message: 'Coming soon...',
            whitelist: ['hugoleonardodev'],
        },
        {
            date: {
                year: 2022,
                month: 1,
                day: 22,
                hour: 19,
                minute: 6,
                second: 10,
            },
            message: 'If you own a Curse Ticket NFT, you can now mint until the timer runs out:',
            whitelist: ['mataide'],
        },
        {
            date: {
                year: 2022,
                month: 12,
                day: 23,
                hour: 19,
                minute: 6,
                second: 10,
            },
            message:
                'If you are among the top 1,000 people in our whitelist, you can now mint until the timer runs out:',
            whitelist: ['john'],
        },
        {
            date: {
                year: 2022,
                month: 12,
                day: 24,
                hour: 19,
                minute: 6,
                second: 10,
            },
            message:
                'If you are among the top 10,000 people in our whitelist, you can now mint until the timer runs out:',
            whitelist: ['monica'],
        },
    ],
}

const useCase4 = {
    endPoints: [
        {
            date: {
                year: 2022,
                month: 1,
                day: 21,
                hour: 18,
                minute: 6,
                second: 10,
            },
            message: 'Coming soon...',
            whitelist: ['hugoleonardodev'],
        },
        {
            date: {
                year: 2022,
                month: 1,
                day: 22,
                hour: 19,
                minute: 6,
                second: 10,
            },
            message: 'If you own a Curse Ticket NFT, you can now mint until the timer runs out:',
            whitelist: ['mataide'],
        },
        {
            date: {
                year: 2022,
                month: 1,
                day: 23,
                hour: 19,
                minute: 6,
                second: 10,
            },
            message:
                'If you are among the top 1,000 people in our whitelist, you can now mint until the timer runs out:',
            whitelist: ['john'],
        },
        {
            date: {
                year: 2022,
                month: 12,
                day: 24,
                hour: 19,
                minute: 6,
                second: 10,
            },
            message:
                'If you are among the top 10,000 people in our whitelist, you can now mint until the timer runs out:',
            whitelist: ['monica'],
        },
    ],
}

const useCase5 = {
    endPoints: [
        {
            date: {
                year: 2022,
                month: 1,
                day: 21,
                hour: 18,
                minute: 6,
                second: 10,
            },
            message: 'Coming soon...',
            whitelist: ['hugoleonardodev'],
        },
        {
            date: {
                year: 2022,
                month: 1,
                day: 22,
                hour: 19,
                minute: 6,
                second: 10,
            },
            message: 'If you own a Curse Ticket NFT, you can now mint until the timer runs out:',
            whitelist: ['mataide'],
        },
        {
            date: {
                year: 2022,
                month: 1,
                day: 23,
                hour: 19,
                minute: 6,
                second: 10,
            },
            message:
                'If you are among the top 1,000 people in our whitelist, you can now mint until the timer runs out:',
            whitelist: ['john'],
        },
        {
            date: {
                year: 2022,
                month: 1,
                day: 24,
                hour: 19,
                minute: 6,
                second: 10,
            },
            message:
                'If you are among the top 10,000 people in our whitelist, you can now mint until the timer runs out:',
            whitelist: ['monica'],
        },
    ],
}

const recentDays1 = {
    endPoints: [
        {
            date: {
                year: 2022,
                month: 2,
                day: 24,
                hour: 22,
                minute: 0,
                second: 0,
            },
            message: 'Coming soon...',
            whitelist: ['hugoleonardodev'],
        },
        {
            date: {
                year: 2022,
                month: 2,
                day: 25,
                hour: 21,
                minute: 59,
                second: 59,
            },
            message: 'If you own a Curse Ticket NFT, you can now mint until the timer runs out:',
            whitelist: ['mataide'],
        },
        {
            date: {
                year: 2022,
                month: 2,
                day: 26,
                hour: 22,
                minute: 0,
                second: 0,
            },
            message:
                'If you are among the top 1,000 people in our whitelist, you can now mint until the timer runs out:',
            whitelist: ['john'],
        },
        {
            date: {
                year: 2022,
                month: 2,
                day: 27,
                hour: 21,
                minute: 59,
                second: 59,
            },
            message:
                'If you are among the top 10,000 people in our whitelist, you can now mint until the timer runs out:',
            whitelist: ['monica'],
        },
    ],
}

const recentDays2 = {
    endPoints: [
        {
            date: {
                year: 2022,
                month: 2,
                day: 24,
                hour: 21,
                minute: 40,
                second: 0,
            },
            message: 'Coming soon...',
            whitelist: ['hugoleonardodev'],
        },
        {
            date: {
                year: 2022,
                month: 2,
                day: 24,
                hour: 21,
                minute: 45,
                second: 1,
            },
            message: 'If you own a Curse Ticket NFT, you can now mint until the timer runs out:',
            whitelist: ['mataide'],
        },
        {
            date: {
                year: 2022,
                month: 2,
                day: 24,
                hour: 12,
                minute: 50,
                second: 0,
            },
            message:
                'If you are among the top 1,000 people in our whitelist, you can now mint until the timer runs out:',
            whitelist: ['john'],
        },
        {
            date: {
                year: 2022,
                month: 2,
                day: 24,
                hour: 21,
                minute: 55,
                second: 0,
            },
            message:
                'If you are among the top 10,000 people in our whitelist, you can now mint until the timer runs out:',
            whitelist: ['monica'],
        },
    ],
}

export {
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
}
