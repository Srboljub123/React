import { Container, Row } from 'react-bootstrap'
import styled from 'styled-components'

export const HomePageContainer = styled(Container)`
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;

    @media only screen and (max-width: 912px) {
        height: -webkit-fill-available;
    }
`

export const HomePageMain = styled(Row)`
    width: 60vw;
    gap: 2rem;

    @media only screen and (max-width: 1460px) {
        width: 70vw;
    }
    @media only screen and (max-width: 1246px) {
        width: 80vw;
    }
    @media only screen and (max-width: 1094px) {
        width: 90vw;
    }
    @media only screen and (max-width: 970px) {
        width: 100vw;
    }
    @media only screen and (max-width: 912px) {
        width: 64vw;
    }
    @media only screen and (max-width: 828px) {
        width: 70vw;
    }
    @media only screen and (max-width: 768px) {
        width: 70vw;
    }
    @media only screen and (max-width: 540px) {
        width: 90vw;
    }
`
