import { DefaultTheme } from 'styled-components'

const darkTheme: DefaultTheme = {
    theme: 'acs-dark',
    variables: {
        colorPrimary: '#57023D',
        colorBackground: '#000000',
        colorText: '#ffffff',
        colorGray: {
            primary: '#959595',
            secondary: '#ebebeb',
        },
        colorDanger: {
            primary: '#F90215',
            secondary: '#232323',
        },
        colorWarning: {
            primary: '#F6851B',
            secondary: '#232323',
        },
        fontFamily: 'Spartan, system-ui, sans-serif',
        borderRadius: '100px',
        boxShadow: '0 0 0 0.25rem rgb(87 2 61 / 50%)',
    },
}

export default darkTheme
