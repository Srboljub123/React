import { DefaultTheme } from 'styled-components'

const defaultTheme: DefaultTheme = {
    theme: 'acs',
    variables: {
        colorPrimary: '#000000',
        colorBackground: '#ffffff',
        colorText: '#000000',
        colorGray: {
            primary: '#F5F5F5',
            secondary: '#BFBFBF',
        },
        colorDanger: {
            primary: '#F90215',
            secondary: '#FFECED',
        },
        colorWarning: {
            primary: '#F6851B',
            secondary: '#FFFCF9',
        },
        fontFamily: 'Spartan, system-ui, sans-serif',
        borderRadius: '4px',
        boxShadow: '',
    },
}

export default defaultTheme
