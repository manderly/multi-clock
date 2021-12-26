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
      body: string
      text: string
      background: string
      button: string
      buttonHover: string
      buttonActive: string
    }
  }
}