import { Container, Row } from 'react-bootstrap'
import styled from 'styled-components'

import { FlexColumnAlignCenter } from '@common/styles/mixins'

export const PaymentsContainer = styled.main`
    gap: 8rem;
    max-width: 1240px;
    width: 98%;
    /* height: 100vh; */
    margin: auto;
    padding: 2rem 0;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    @media only screen and (max-width: 960px) {
        ${FlexColumnAlignCenter}
        justify-content: flex-start;
        padding: 0;
        gap: 2rem;
    }
`

export const PaymentsHeader = styled(Container)`
    margin-top: 2rem;
`

export const PaymentsPageContainer = styled(Container)`
    display: flex;
    justify-content: center;
    align-items: center;
`

export const PaymentsPageMain = styled(Row)`
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
