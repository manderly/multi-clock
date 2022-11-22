import { DefaultTheme } from 'styled-components';
import {createTheme} from "@mui/material";

export const lightTheme: DefaultTheme = {
  palette: {
    primary: {
      main: '#ffffff'
    },
    bg: '#ffffff',
    a: '#ffffff',
    textCopy: '#2E3440',
    textHeader: "#1a1e25",
    modalBackground: '#ffffff',
    button: "#D8DEE9",
    buttonHover: "#afc9e3",
    buttonActive: "#81A1C1",
    buttonDisabled: "#000000",
  },
  mui: {
    ...createTheme({
      components: {
        MuiOutlinedInput: {
          styleOverrides: {
            root: {
              color: 'blue',
              backgroundColor: '#ffffff',
            }
          }
        }
      }
    })
    }
  };

export const darkTheme: DefaultTheme = {
  palette: {
    primary: {
      main: '#ffffff'
    },
    bg: '#252932',
    a: '#ffffff',
    textCopy: '#ECEFF4',
    textHeader: "#ffffff",
    modalBackground: '#4C566A',
    button: "#3B4252",
    buttonHover: "#4C566A",
    buttonActive: "#434C5E",
    buttonDisabled: "#000000",
  },
  mui: {
    ...createTheme({
      components: {
        MuiOutlinedInput: {
          styleOverrides: {
            root: {
              color: 'red',
              backgroundColor: '#ffffff',
            }
          }
        }
      }
    })
  }
};
const colors = {
  berry: {
    brightestColor: '#ffbddc',
    lightColor: '#af4972',
    darkColor: '#351930',
    darkestColor: '#351930',
    disabledButton: '#351930',
    contrast: '#351930',
  },
  blue: {
    brightestColor: '#eaeaea',
    lightColor: '#98c1d9',
    darkColor: '#1b376e',
    darkestColor: '#0e2245',
    disabledButton: '#080f1c',
    contrast: '#ee6c4d',
  }
} as const;

const muiObj = (name: keyof typeof colors) => {
  return {
    MuiOutlinedInput: colorObj(colors[name].brightestColor, colors[name].darkestColor),
    MuiInputLabel: colorObj(colors[name].brightestColor),
    MuiSvgIcon: colorObj(colors[name].brightestColor),
    MuiMenuItem: {
      styleOverrides: {
        root: {
          color: colors[name].brightestColor,
          backgroundColor: colors[name].darkColor,
          "&.Mui-selected": {
            color: colors[name].darkestColor,
            backgroundColor: colors[name].lightColor,
            "&.Mui-focusVisible": {
              color: colors[name].darkestColor,
              background: colors[name].contrast
            }
          },
          "&:hover": {
            color: colors[name].brightestColor,
            backgroundColor: colors[name].darkestColor,
          }
        }
      }
    }
  }
}

const colorObj = (color: string, backgroundColor?: string) => {
  return {
    styleOverrides: {
      root: {
        ...(color && { color: color }),
        ...(backgroundColor && { backgroundColor: backgroundColor })
      }
    }
  };
}
export const berryTheme: DefaultTheme = {
  palette: {
    primary: {
      main: '#ffffff'
    },
    bg: colors.berry.darkColor,
    a: colors.berry.lightColor,
    textCopy: colors.berry.brightestColor,
    textHeader: colors.berry.brightestColor,
    modalBackground: '#351930',
    button: "#571c3c",
    buttonActive: "#7a1e47",
    buttonHover: "#af4972",
    buttonDisabled: colors.berry.darkColor,
  },
  mui: {
    ...createTheme({
      components: {
        MuiOutlinedInput: colorObj(colors.berry.brightestColor, colors.berry.darkColor),
        MuiInputLabel: colorObj(colors.berry.brightestColor),
        MuiSvgIcon: colorObj(colors.berry.brightestColor),
        MuiMenuItem: colorObj(colors.berry.brightestColor),
      }
    })
  }
};

export const blueTheme: DefaultTheme = {
  palette: {
    primary: {
      main: '#ffffff'
    },
    bg: colors.blue.darkestColor, //'#033f63',
    a: colors.blue.contrast,
    textCopy: colors.blue.brightestColor,
    textHeader: colors.blue.brightestColor,
    modalBackground: colors.blue.darkColor,
    button: colors.blue.darkColor,
    buttonActive: colors.blue.lightColor,
    buttonHover: colors.blue.contrast,
    buttonDisabled: colors.blue.disabledButton,
  },
  mui: {
    ...createTheme({
      components: muiObj('blue')
    })
  }
};

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