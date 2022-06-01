import { Button } from 'react-bootstrap'
import styled from 'styled-components'

const MintButton = styled(Button)`
    font-family: ${properties => properties.theme.variables.fontFamily};
    margin: 2rem 0;
    height: 60px;
    width: -webkit-fill-available;
    background: ${properties => properties.theme.variables.colorPrimary};
    border: 1px solid ${properties => properties.theme.variables.colorPrimary};
    box-sizing: border-box;
    border-radius: ${properties => properties.theme.variables.borderRadius};
    box-shadow: ${properties => properties.theme.variables.boxShadow};
    text-transform: uppercase;
    color: ${properties => properties.theme.variables.colorBackground};
    &:hover {
        color: ${properties => properties.theme.variables.colorBackground};
        background-color: ${properties => properties.theme.variables.colorPrimary};
        border-color: ${properties => properties.theme.variables.colorPrimary};
        opacity: 0.8;
    }
    &:focus {
        color: ${properties => properties.theme.variables.colorBackground};
        background-color: ${properties => properties.theme.variables.colorPrimary};
        border-color: ${properties => properties.theme.variables.colorPrimary};
        /* box-shadow: ${properties => properties.theme.variables.boxShadow}; */
        box-shadow: 0 0 0 0.25rem rgb(0 214 50 / 50%);
    }
    &:active {
        color: ${properties => properties.theme.variables.colorBackground};
        background-color: ${properties => properties.theme.variables.colorPrimary};
        border-color: ${properties => properties.theme.variables.colorPrimary};
    }
    &:active:focus {
        /* box-shadow: ${properties => properties.theme.variables.boxShadow}; */
        box-shadow: 0 0 0 0.25rem rgb(0 214 50 / 50%);
    }
    &:disabled {
        background-color: ${properties => properties.theme.variables.colorGray.secondary};
        border-color: ${properties => properties.theme.variables.colorGray.secondary};
    }
`

export default MintButton
