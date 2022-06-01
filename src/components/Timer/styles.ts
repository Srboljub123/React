import styled from 'styled-components'

// import { FlexColumnAlignCenter } from '@common/styles/mixins'

export const TimerContainer = styled.div`
    /* display: flex;
    justify-content: center; */
    /* min-height: 72px; */
    p {
        font-size: 0.75rem;
        font-family: ${properties => properties.theme.variables.fontFamily};
        color: ${properties => properties.theme.variables.colorText};
        span {
            /* font-weight: bold; */
            margin-right: 0.4rem;
            font-size: 24px;
        }
    }
`

export const TimerTitle = styled.h4`
    margin-top: 0.5rem;
    height: 16px;
    display: flex;
    width: max-content;
    font-family: ${properties => properties.theme.variables.fontFamily};
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    color: ${properties => properties.theme.variables.colorText};

    @media only screen and (max-width: 900px) {
        font-size: 12px;
    }
`
