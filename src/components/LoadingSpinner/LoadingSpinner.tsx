import React from 'react'

import { LoadingWrap, Spinner, SpinnerWrapper } from './styles'

const LoadingSpinner: React.FC = () => {
    return (
        <LoadingWrap className="wrap">
            <SpinnerWrapper className="spinner-wrap">
                <Spinner className="spinner">
                    <i></i>
                    <i></i>
                    <i></i>
                    <i></i>
                    <i></i>
                    <i></i>
                    <i></i>
                    <i></i>
                </Spinner>
            </SpinnerWrapper>
        </LoadingWrap>
    )
}

export default LoadingSpinner
