import styled from 'styled-components'

import { FlexColumnAlignCenter } from '@common/styles/mixins'

export const DescriptionContainer = styled.section`
    ${FlexColumnAlignCenter}
    margin-left: 1rem;
    justify-content: center;
    padding-bottom: 2rem;
    gap: 2rem;
    & > p {
        text-align: center;
        font-size: 1.5rem;
        font-weight: bold;
        margin-top: 1rem;
    }
    & > small {
        text-align: center;
        font-size: 1.2rem;
    }
    a {
        text-decoration: none;
        padding: 1.5rem 3rem;
        border: 0;
        background: var(--black);
        color: var(--white);
        font-size: 1.5rem;
    }
`
