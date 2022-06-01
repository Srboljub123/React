import { createGlobalStyle } from 'styled-components'

import AdieuBold from '@public/fonts/AdieuBold.ttf'
import SpartanRegular from '@public/fonts/SpartanRegular.ttf'

export const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'Adieu';
    /* src: url('../../../public/fonts/SpartanRegular.ttf') format('truetype'); */
    src: url(${AdieuBold}) format('truetype');
  }


  @font-face {
    font-family: ${properties => properties.theme.variables.fontFamily};
    src: url(${SpartanRegular}) format('truetype');
    /* src: '/src/common/public/fonts/SpartanRegular.ttf' format('truetype'); */
  }

  :root{
    --black: ${properties => properties.theme.variables.colorText};
    --white: ${properties => properties.theme.variables.colorBackground};
    --gray: ${properties => properties.theme.variables.colorGray.primary};

    --font-Hoefler: 'Hoefler Text';
    --font-Sofia: 'Sofia Pro';
    --font-Spartan: 'Spartan';
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    font-family: --font-Spartan;
    font-style: normal;
    font-weight: normal;
    background: ${properties => properties.theme.variables.colorBackground};
    color: var(--black);
  }
`
