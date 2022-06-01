import React from 'react'

import ProgressRing from './ProgressRing'

interface IProgressRoundedProperties {
    limit: number
    remainedTokenCount: number
}

const ProgressRounded: React.FC<IProgressRoundedProperties> = ({ limit, remainedTokenCount }) => {
    const [progress, setProgress] = React.useState(0)

    React.useEffect(() => {
        const interval = setTimeout(() => {
            if (progress === limit) {
                clearTimeout(interval)
            } else {
                setProgress(state => state + remainedTokenCount)
            }
        }, __ONE_SECOND__)

        return () => clearTimeout(interval)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [limit])

    return <ProgressRing radius={24} stroke={6} progress={progress} limit={limit} />
}

export default ProgressRounded
