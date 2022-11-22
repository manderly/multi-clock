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
      primary: {
        main: '#ffffff'
      }
      bg: string
      a?: string
      textCopy: string
      textHeader: string
      modalBackground: string
      button: string
      buttonHover: string
      buttonActive: string
      buttonDisabled: string
    },
    mui: typeof muiTheme,
  }
}