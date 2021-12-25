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
      toggleBorder: string
      background: string
    }
  }
}