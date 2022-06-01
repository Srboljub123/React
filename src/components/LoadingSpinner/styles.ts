import styled, { keyframes } from 'styled-components'

const spin = keyframes`
	from { transform: rotate(0deg); }
	to { transform: rotate(360deg); }
`

export const LoadingWrap = styled.div`
    width: 100%;
    position: absolute;
    top: 50%;
    transform: translateY(-6rem);
    display: flex;
    justify-content: center;
    align-items: center;
`

export const SpinnerWrapper = styled.div`
    /* margin: auto;
    position: absolute;
    left: 50%;
    transform: translateX(-50%); */

    .spinner i:nth-child(1) {
        opacity: 0.08;
    }
    .spinner i:nth-child(2) {
        transform: rotate(45deg);
        opacity: 0.167;
    }
    .spinner i:nth-child(3) {
        transform: rotate(90deg);
        opacity: 0.25;
    }
    .spinner i:nth-child(4) {
        transform: rotate(135deg);
        opacity: 0.33;
    }
    .spinner i:nth-child(5) {
        transform: rotate(180deg);
        opacity: 0.5;
    }
    .spinner i:nth-child(6) {
        transform: rotate(225deg);
        opacity: 0.67;
    }
    .spinner i:nth-child(7) {
        transform: rotate(270deg);
        opacity: 0.833;
    }
    .spinner i:nth-child(8) {
        transform: rotate(315deg);
        opacity: 1;
    }
`

export const Spinner = styled.div`
    height: 100px;
    width: 100px;
    display: inline-block;
    margin: -80px auto 0;
    animation: ${spin} 1.2s steps(8, end) infinite;
    /* transform: translateY(-1rem); */
    &:first-child {
        /* margin-right: 50px; */
    }

    i {
        height: 30px;
        width: 6px;
        margin-left: -3px;
        display: block;
        transition: height 1.2s;
        position: absolute;
        left: 50%;
        transform-origin: center 50px;
        background: #f6851b;
        box-shadow: 0 0 3px rgba(255, 255, 255, 0.7);
        border-radius: 3px;
    }

    &:nth-child(2) i {
        height: 6px;
    }
    &:hover {
        i {
            height: 6px;
        }

        &:nth-child(2) i {
            height: 30px;
        }
    }
`

export const LoadingMessageText = styled.h2`
    position: absolute;
`
