import { intervalToDuration, compareAsc } from 'date-fns'
import moment from 'moment-timezone'
import React from 'react'

interface ITimerProviderProperties {
    children: React.ReactNode
    stage: number
    setStage: React.Dispatch<React.SetStateAction<number>>
    timeEndPoints: ITimerEndPoint[]
}
//
// type THours = {
//     hours?: number | string
//     mins?: number | string
//     sec?: number | string
// }

interface ITimeDifference {
    years?: number | string
    months?: number | string
    days?: number | string
    hours?: number | string
    mins?: number | string
    sec?: number | string
}

interface ITimerContextData {
    timeDifference?: ITimeDifference
    maxLists: number
    isTimeout: boolean
    message: string
}

export const TimerContext = React.createContext({} as ITimerContextData)

const getTimeObject = (time: Duration) => {
    return {
        years: Number(time.years) < __TEN__ ? '0' + time.years : time.years,
        months: Number(time.months) < __TEN__ ? '0' + time.months : time.months,
        days: Number(time.days) < __TEN__ ? '0' + time.days : time.days,
        hours: Number(time.hours) < __TEN__ ? '0' + time.hours : time.hours,
        mins: Number(time.minutes) < __TEN__ ? '0' + time.minutes : time.minutes,
        sec: Number(time.seconds) < __TEN__ ? '0' + time.seconds : time.seconds,
    }
}

const defaultTimer: ITimeDifference = { years: 0, months: 0, days: 0, hours: 0, mins: 0, sec: 0 }

export const TimerProvider: React.FC<ITimerProviderProperties> = ({ children, stage, setStage, timeEndPoints }) => {
    // const [hours, setHours] = React.useState<THours>()
    // const [maxLists, setMaxLists] = React.useState(0)
    const [timeDifference, setTimeDifference] = React.useState<ITimeDifference>(defaultTimer)
    const [isTimeout, setIsTimeout] = React.useState(false)
    const [message, setMessage] = React.useState('')

    // const { stage, setStage } = useMainContext()

    React.useEffect(() => {
        if (timeDifference === defaultTimer) {
            setIsTimeout(true)
        } else {
            setIsTimeout(false)
        }
        return () => setIsTimeout(true)
    }, [timeDifference])

    React.useEffect(() => {
        const lsStage = Number(localStorage.getItem('stage'))
        if (lsStage > 0 && lsStage <= timeEndPoints.length - 1) {
            setStage(lsStage)
        } else if (lsStage === timeEndPoints.length) {
            localStorage.removeItem('stage')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    React.useEffect(() => {
        const oneSecondTimer = setTimeout(() => {
            moment.tz.setDefault('America/Mexico_City')
            const nowOb = moment.now()

            let time: Duration = intervalToDuration({
                end: nowOb,
                start: nowOb,
            })

            for (let index = 0; index < timeEndPoints.length; index++) {
                if (stage < timeEndPoints.length) {
                    const currentEndPointOb = moment({
                        year: timeEndPoints[stage]?.date.year,
                        month: timeEndPoints[stage]?.date.month - 1,
                        day: timeEndPoints[stage]?.date.day,
                        hour: timeEndPoints[stage]?.date.hour,
                        minute: timeEndPoints[stage]?.date.minute,
                        second: timeEndPoints[stage]?.date.second,
                    })
                    time = intervalToDuration({
                        end: currentEndPointOb.toDate(),
                        start: nowOb,
                    })
                    const isPast = compareAsc(currentEndPointOb.toDate(), nowOb)
                    if (isPast === -1) {
                        setStage(stage + 1)
                        stage = stage + 1
                    }
                }
            }
            if (stage < timeEndPoints.length) {
                setTimeDifference(getTimeObject(time))
                setMessage(timeEndPoints[stage]?.message)
            } else {
                setTimeDifference(defaultTimer)
                setMessage('')
            }
        }, __ONE_SECOND__)

        return () => clearTimeout(oneSecondTimer)
    }, [timeEndPoints, stage, setStage, timeDifference, message])

    const timerContext = React.useMemo(
        () => ({
            timeDifference,
            maxLists: timeEndPoints.length,
            isTimeout,
            message,
        }),
        [timeDifference, timeEndPoints.length, isTimeout],
    )

    return <TimerContext.Provider value={timerContext}>{children}</TimerContext.Provider>
}

export const useTimerContext = (): ITimerContextData => {
    const context = React.useContext(TimerContext)
    if (!context) throw new Error('useTimerContext must be used within an TimerProvider')
    return context
}
