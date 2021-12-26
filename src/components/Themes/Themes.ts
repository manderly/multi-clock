import { DefaultTheme } from 'styled-components';

export const lightTheme: DefaultTheme = {
  palette: {
    body: '#FFF',
    text: '#363537',
    background: '#363537',
    button: "#e1e1e1",
    buttonActive: "pink",
    buttonHover: "red",
  }
}
export const darkTheme: DefaultTheme = {
  palette: {
    body: '#363537',
    text: '#ECEFF4',
    background: '#4C566A',
    button: "#3B4252",
    buttonHover: "#4C566A",
    buttonActive: "#434C5E",
  }
}
export const iceTheme: DefaultTheme = {
  palette: {
    body: '#5E81AC',
    text: '#8FBCBB',
    background: '#BF616A',
    button: "#ECEFF4",
    buttonHover: "red",
    buttonActive: "pink",
  }
}

export const berryTheme: DefaultTheme = {
  palette: {
    body: '#351930',
    text: '#bb9faa',
    background: '#351930',
    button: "#571c3c",
    buttonActive: "#7a1e47",
    buttonHover: "af4972",
  }
}

export const blueTheme: DefaultTheme = {
  palette: {
    body: '#5E81AC',
    text: '#8FBCBB',
    background: '#BF616A',
    button: "#ECEFF4",
    buttonActive: "pink",
    buttonHover: "#fff",
  }
}

export const palettes = {
  light:lightTheme,
  dark:darkTheme,
  ice:iceTheme,
  berry:berryTheme,
  blue:blueTheme,
} as const;
