import {createTheme} from "@mui/material";

declare module 'styled-components';

// styled.d.ts
import 'styled-components';
import {lightTheme} from "./components/Themes/Themes";
interface IPalette {
  main: string
  contrastText: string
}

const muiTheme = createTheme(lightTheme.mui)

declare module 'styled-components' {
  export interface DefaultTheme {
    palette: {
      utilitiesBar: {
        bg: string
        thermometerBg: string
        mercury: string
        bigLine: string
        thinLine: string
        number: string
      }
      bgClocks: string
      bgInfo: string
      a?: string
      textCopy: string
      textHeader: string
      button: {
        bg: string
        text: string
        active: string
        hover: string
        disabled: string
      },
    },
    mui: typeof muiTheme,
  }
}