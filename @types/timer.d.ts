declare interface ITimerEndPoint {
    date: {
        year: number
        month: number
        day: number
        hour: number
        minute: number
        second: number
    }
    message: string
    whitelist: string[]
}

declare interface ITimer {
    hasTimer: boolean
    endPoints: ITimerEndPoint[]
}
