import React from 'react'

import { useWindowSize } from '@common/hooks'

interface IMobileSwap {
    componentA: React.ReactNode
    componentB: React.ReactNode
}

const MAX_WIDTH = 900

const MobileSwap: React.FC<IMobileSwap> = ({ componentA, componentB }) => {
    const [width] = useWindowSize()
    return (
        <>
            {width > MAX_WIDTH ? (
                <>
                    <>{componentA}</>
                    <>{componentB}</>
                </>
            ) : (
                <>
                    <>{componentB}</>
                    <>{componentA}</>
                </>
            )}
        </>
    )
}

export default MobileSwap
