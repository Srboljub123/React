import styled from 'styled-components'

export const TicketReceivedContainer = styled.div`
    margin-right: 1rem;
    & button {
        border: none;
        cursor: pointer;
        position: fixed;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 1.5rem;
        top: 2rem;
        right: 2rem;
    }
    & button svg {
        color: black;
    }
`
