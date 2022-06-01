import React from 'react'

import { RotateSvg } from './styles'

interface IProgressRingProperties {
    radius: number
    stroke: number
    progress: number
    limit: number
}

const ProgressRing: React.FC<IProgressRingProperties> = ({ radius, stroke, progress, limit }) => {
    const normalizedRadius = radius - stroke * __TWO__
    const circumference = normalizedRadius * __TWO__ * Math.PI
    const strokeDashoffset =
        progress > 1 && limit > 1 ? circumference - (progress / limit) * circumference : circumference
    console.log(strokeDashoffset)
    return (
        <RotateSvg height={radius * __TWO__} width={radius * __TWO__}>
            <circle
                fill="transparent"
                strokeWidth={stroke}
                strokeDasharray={circumference + ' ' + circumference}
                // eslint-disable-next-line react-perf/jsx-no-new-object-as-prop
                style={{ strokeDashoffset: '0' }}
                r={normalizedRadius}
                cx={radius}
                cy={radius}
                className="background-circle"
            />
            <circle
                stroke="black"
                fill="transparent"
                strokeWidth={stroke}
                strokeDasharray={circumference + ' ' + circumference}
                // eslint-disable-next-line react-perf/jsx-no-new-object-as-prop
                style={{ strokeDashoffset }}
                r={normalizedRadius}
                cx={radius}
                cy={radius}
                className="foreground-circle"
            />
        </RotateSvg>
    )
}

export default ProgressRing
