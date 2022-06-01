/* eslint-disable @typescript-eslint/naming-convention */
import 'styled-components'

import lightTheme from '../init/themes/lightTheme'

export type TTheme = typeof lightTheme

declare module 'styled-components' {
    export interface DefaultTheme extends TTheme {
        theme: string
        variables: {
            colorPrimary: string
            colorBackground: string
            colorText: string
            colorGray: {
                primary: string
                secondary: string
            }
            colorDanger: {
                primary: string
                secondary: string
            }
            colorWarning: {
                primary: string
                secondary: string
            }
            fontFamily: string
            borderRadius: string
            boxShadow: string
        }
    }
}
