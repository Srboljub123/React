import React from 'react'

import { useTimerContext } from '@contexts/TimerContext'

import { TimerContainer, TimerTitle } from './styles'

interface ITimerProperties {
    timeEndPoints?: Date[]
}

const Timer: React.FC<ITimerProperties> = () => {
    const { timeDifference, isTimeout, message } = useTimerContext()
    console.log('isTimeout', isTimeout)
    return (
        <TimerContainer>
            {!isTimeout && <TimerTitle>{message}</TimerTitle>}
            <p>
                {!isTimeout && timeDifference?.hours !== 0 && <span>{timeDifference?.hours}h :</span>}
                {!isTimeout && timeDifference?.mins !== 0 && <span>{timeDifference?.mins}m :</span>}
                {!isTimeout && timeDifference?.sec !== 0 && <span>{timeDifference?.sec}s</span>}
            </p>
        </TimerContainer>
    )
}

export default Timer
