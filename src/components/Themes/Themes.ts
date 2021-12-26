import { DefaultTheme } from 'styled-components';

export const lightTheme: DefaultTheme = {
  palette: {
    bg: '#ffffff',
    text: '#2E3440',
    modalBackground: '#ffffff',
    button: "#D8DEE9",
    buttonHover: "#afc9e3",
    buttonActive: "#81A1C1",
  }
}
export const darkTheme: DefaultTheme = {
  palette: {
    bg: '#252932',
    text: '#ECEFF4',
    modalBackground: '#4C566A',
    button: "#3B4252",
    buttonHover: "#4C566A",
    buttonActive: "#434C5E",
  }
}

export const berryTheme: DefaultTheme = {
  palette: {
    bg: '#351930',
    text: '#bb9faa',
    modalBackground: '#351930',
    button: "#571c3c",
    buttonActive: "#7a1e47",
    buttonHover: "#af4972",
  }
}

export const blueTheme: DefaultTheme = {
  palette: {
    bg: '#033f63',
    text: '#b5b682',
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
