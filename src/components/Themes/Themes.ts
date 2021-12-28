import { DefaultTheme } from 'styled-components';

export const lightTheme: DefaultTheme = {
  palette: {
    bg: '#ffffff',
    textCopy: '#2E3440',
    textHeader: "#1a1e25",
    modalBackground: '#ffffff',
    button: "#D8DEE9",
    buttonHover: "#afc9e3",
    buttonActive: "#81A1C1",
  }
}
export const darkTheme: DefaultTheme = {
  palette: {
    bg: '#252932',
    a: "#fff",
    textCopy: '#ECEFF4',
    textHeader: "#ffffff",
    modalBackground: '#4C566A',
    button: "#3B4252",
    buttonHover: "#4C566A",
    buttonActive: "#434C5E",
  }
}

export const berryTheme: DefaultTheme = {
  palette: {
    bg: '#351930',
    a: "#af4972",
    textCopy: '#d9bbc7',
    textHeader: "#f1cedc",
    modalBackground: '#351930',
    button: "#571c3c",
    buttonActive: "#7a1e47",
    buttonHover: "#af4972",
  }
}

export const blueTheme: DefaultTheme = {
  palette: {
    bg: '#033f63',
    textCopy: '#b5b682',
    textHeader: '#f2f3bd',
    modalBackground: '#033f63',
    button: "#28666e",
    buttonActive: "#7c9885",
    buttonHover: "#b5b682",
  }
}

export const palettes = {
  light:lightTheme,
  dark:darkTheme,
  berry:berryTheme,
  blue:blueTheme,
} as const;

export const enum themeNames {
  light = "light",
  dark = "dark",
  berry = "berry",
  blue = "blue",
}

export const themeMap: {[key: string]: DefaultTheme} = {
  "light":lightTheme,
  "dark":darkTheme,
  "berry":berryTheme,
  "blue":blueTheme,
}