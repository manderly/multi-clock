declare module 'styled-components';

// styled.d.ts
import 'styled-components';
interface IPalette {
  main: string
  contrastText: string
}

declare module 'styled-components' {
  export interface DefaultTheme {
    palette: {
      bg: string
      text: string
      modalBackground: string
      button: string
      buttonHover: string
      buttonActive: string
    }
  }
}