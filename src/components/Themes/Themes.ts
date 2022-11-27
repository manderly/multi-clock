import { DefaultTheme } from 'styled-components';
import {createTheme} from "@mui/material";

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

const getTextColor = (name: keyof typeof colors) => {
  return name === 'light' ? colors[name].darkestColor : colors[name].brightestColor;
}

const getBGColor = (name: keyof typeof colors) => {
  return name === 'light' ? colors[name].brightestColor : colors[name].darkestColor;
}

const muiObj = (name: keyof typeof colors) => {
  return {
    MuiOutlinedInput: colorObj(getTextColor(name), getBGColor(name)),
    MuiInputLabel: colorObj(getTextColor(name)),
    MuiSvgIcon: colorObj(getTextColor(name)),
    MuiMenuItem: {
      styleOverrides: {
        root: {
          color: getTextColor(name),
          backgroundColor: colors[name].darkestColor,
          "&.Mui-selected": {
            color: getTextColor(name),
            backgroundColor: colors[name].lightColor,
            "&.Mui-focusVisible": {
              // the currently selected option in the list of options
              color: getTextColor(name),
              background: colors[name].contrast
            }
          },
          "&:hover": {
            color: colors[name].brightestColor,
            backgroundColor: colors[name].lightColor,
          }
        }
      }
    }
  }
}

const colors = {
  light: {
    brightestColor: '#ffffff',
    lightColor: '#d1d1d1',
    darkColor: '#787777',
    darkestColor: '#353838',
    disabledButton: '#58758a',
    contrast: '#bd102d',
  },
  berry: {
    brightestColor: '#db97b7',
    lightColor: '#883240', //'#af4972',
    darkColor: '#520f20',
    darkestColor: '#2b0710',
    disabledButton: '#170711',
    contrast: '#bd102d',
  },
  blue: {
    brightestColor: '#eaeaea',
    lightColor: '#5c86d6',
    darkColor: '#1b376e',
    darkestColor: '#0e2245',
    disabledButton: '#080f1c',
    contrast: '#ee6c4d',
  }
} as const;

export const lightTheme: DefaultTheme = {
  palette: {
    utilitiesBar: {
      bg: colors.light.lightColor,
      thermometerBg: colors.light.brightestColor,
      mercury: colors.light.contrast,
      bigLine: colors.light.brightestColor,
      thinLine: colors.light.lightColor,
      number: colors.light.brightestColor,
    },
    bgClocks: colors.light.brightestColor,
    bgInfo: colors.light.lightColor,
    a: colors.light.contrast,
    textCopy: colors.light.brightestColor,
    textHeader: colors.light.brightestColor,
    button: colors.light.contrast,
    buttonActive: colors.light.lightColor,
    buttonHover: colors.light.contrast,
    buttonDisabled: colors.light.darkestColor,
  },
  mui: {
    ...createTheme({
      components: muiObj('light')
    })
  }
  };

export const darkTheme: DefaultTheme = {
  palette: {
    utilitiesBar: {
      bg: '#ffffff',
      thermometerBg: '#ffffff',
      mercury: '#ffffff',
      bigLine: '#ffffff',
      thinLine: '#efefef',
      number: '#efefef',
    },
    bgClocks: '#252932',
    bgInfo: '#000fff',
    a: '#ffffff',
    textCopy: '#ECEFF4',
    textHeader: "#ffffff",
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

export const berryTheme: DefaultTheme = {
  palette: {
    utilitiesBar: {
      bg: colors.berry.darkColor,
      thermometerBg: colors.berry.darkestColor,
      mercury: colors.berry.contrast,
      bigLine: colors.berry.brightestColor,
      thinLine: colors.berry.lightColor,
      number: colors.berry.brightestColor,
    },
    bgClocks: colors.berry.darkestColor,
    bgInfo: colors.berry.darkColor,
    a: colors.berry.contrast,
    textCopy: colors.berry.brightestColor,
    textHeader: colors.berry.brightestColor,
    button: colors.berry.lightColor,
    buttonActive: colors.berry.lightColor,
    buttonHover: colors.berry.contrast,
    buttonDisabled: colors.berry.disabledButton,
  },
  mui: {
    ...createTheme({
      components: muiObj('berry')
    })
  }
};

// todo: make a const that returns inverted / non inverted themes
export const blueTheme: DefaultTheme = {
  palette: {
    utilitiesBar: {
      bg: colors.blue.darkColor,
      thermometerBg: colors.blue.darkestColor,
      mercury: colors.blue.contrast,
      bigLine: colors.blue.brightestColor,
      thinLine: colors.blue.lightColor,
      number: colors.blue.brightestColor,
    },
    bgClocks: colors.blue.darkestColor,
    bgInfo: colors.blue.darkColor,
    a: colors.blue.contrast,
    textCopy: colors.blue.brightestColor,
    textHeader: colors.blue.brightestColor,
    button: colors.blue.lightColor,
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