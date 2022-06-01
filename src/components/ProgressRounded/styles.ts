import styled, { keyframes } from 'styled-components'

export const RotateSvg = styled.svg`
    transform: rotate(270deg);
    .foreground-circle {
        stroke: ${properties => properties.theme.variables.colorPrimary};
    }
    .background-circle {
        stroke: ${properties => properties.theme.variables.colorGray.secondary};
    }
`

export const CustomCircle = styled.circle`
    transition: stroke-dashoffset 0.35s;
    transform: rotate(-90deg);
    transform-origin: 50% 50%;
`

const loading1 = keyframes`
    0%{
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
    }
    100%{
        -webkit-transform: rotate(180deg);
        transform: rotate(180deg);
    }
`

const loading2 = keyframes`
    0%{
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
    }
    100%{
        -webkit-transform: rotate(144deg);
        transform: rotate(144deg);
    }
`

export const ProgressRoundedContainer = styled.div`
    .progress {
        width: 150px;
        height: 150px;
        line-height: 150px;
        background: none;
        margin: 0 auto;
        box-shadow: none;
        position: relative;
        @media only screen and (max-width: 990px) {
            margin-bottom: 20px;
        }
    }
    .progress:after {
        content: '';
        width: 100%;
        height: 100%;
        border-radius: 50%;
        border: 12px solid #fff;
        position: absolute;
        top: 0;
        left: 0;
    }
    .progress > span {
        width: 50%;
        height: 100%;
        overflow: hidden;
        position: absolute;
        top: 0;
        z-index: 1;
    }
    .progress .progress-left {
        left: 0;
    }
    .progress .progress-bar {
        width: 100%;
        height: 100%;
        background: none;
        border-width: 12px;
        border-style: solid;
        position: absolute;
        top: 0;
    }
    .progress .progress-left .progress-bar {
        left: 100%;
        border-top-right-radius: 80px;
        border-bottom-right-radius: 80px;
        border-left: 0;
        -webkit-transform-origin: center left;
        transform-origin: center left;
    }
    .progress .progress-right {
        right: 0;
    }
    .progress .progress-right .progress-bar {
        left: -100%;
        border-top-left-radius: 80px;
        border-bottom-left-radius: 80px;
        border-right: 0;
        -webkit-transform-origin: center right;
        transform-origin: center right;
        animation: ${loading1} 1.8s linear forwards;
    }
    .progress .progress-value {
        width: 90%;
        height: 90%;
        border-radius: 50%;
        background: ${properties => properties.theme.variables.colorBackground};
        font-size: 24px;
        color: #d10b4f;
        line-height: 135px;
        text-align: center;
        position: absolute;
        top: 5%;
        left: 5%;
    }
    .progress.blue .progress-bar {
        border-color: #d10b4f;
    }
    .progress.blue .progress-left .progress-bar {
        animation: ${loading2} 1.5s linear forwards 1.8s;
    }
`
