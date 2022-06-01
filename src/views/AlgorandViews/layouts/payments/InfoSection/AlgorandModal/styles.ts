import styled, { keyframes } from 'styled-components'

const rightToLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

export const Container = styled.main`
    background: ${properties => properties.theme.variables.colorBackground};
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
`

export const Wrapper = styled.div`
    position: fixed;
    top: 27vh;
    left: 33vw;
    z-index: 100;
    overflow: hidden;
    animation: ${rightToLeft} 0.8s;

    background: ${properties => properties.theme.variables.colorBackground};
    box-shadow: 0px 38px 80px rgba(0, 0, 0, 0.2), 0px 19.2375px 34.875px rgba(0, 0, 0, 0.135),
        0px 7.6px 13px rgba(0, 0, 0, 0.1), 0px 1.6625px 4.625px rgba(0, 0, 0, 0.065);
`

export const BackDrop = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    z-index: 10;
    background: rgba(0, 0, 0, 0.75);
    animation: ${fadeIn} 0.8s;
`

export const Header = styled.header`
    padding: 1rem;
    display: flex;
    justify-content: space-between;
`

export const CloseButton = styled.button`
    background: transparent;
    border: none;
    cursor: pointer;
`

export const Body = styled.section`
    background: ${properties => properties.theme.variables.colorBackground};
    padding: 1rem;
`

export const Footer = styled.footer`
    gap: 1rem;
    padding: 1rem;
    display: flex;
    justify-content: flex-end;
`

export const Title = styled.h2`
    margin: 0;
    height: 27px;

    font-family: ${properties => properties.theme.variables.fontFamily};
    font-style: normal;
    font-weight: 600;
    font-size: 24px;
    line-height: 27px;
    /* identical to box height */

    color: ${properties => properties.theme.variables.colorText};
`

export const Message = styled.p`
    height: 54px;

    font-family: ${properties => properties.theme.variables.fontFamily};
    font-style: normal;
    font-weight: normal;
    font-size: 20px;
    line-height: 150%;

    color: ${properties => properties.theme.variables.colorText};
`

export const Span = styled.span`
    color: ${properties => properties.theme.variables.colorText};
`

export const Icon = styled.span`
    font-family: 'Material Icons';
    font-size: 24px;
`

export const Action = styled.span`
    font-size: 24px;
`

export const ConfirmActioButton = styled.button`
    width: -webkit-fill-available;
    height: 59px;
    background: #f90215;
    border: 1px solid #f90215;
    box-sizing: border-box;
    font-family: ${properties => properties.theme.variables.fontFamily};
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 18px;
    text-align: center;
    color: #ffffff;
    cursor: pointer;
`
export const CancelActionButton = styled.button`
    height: 59px;
    width: -webkit-fill-available;
    background: transparent;
    border: 1px solid ${properties => properties.theme.variables.colorGray.primary};
    box-sizing: border-box;

    font-family: ${properties => properties.theme.variables.fontFamily};
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 18px;
    text-align: center;
    cursor: pointer;
    color: ${properties => properties.theme.variables.colorText};
`
