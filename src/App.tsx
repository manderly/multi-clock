import { useState, useContext } from 'react';
import SettingsProvider from './contexts/SettingsContext';
import TimeProvider from './contexts/TimeContext';
import Routes from './Routes';
import { ThemeProvider } from 'styled-components';
import { themeNames, themeMap } from './components/Themes/Themes';
import localStorageUtils from './utils/localStorage';
import { polyfillCountryFlagEmojis } from "country-flag-emoji-polyfill";
import './App.css';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import MuiThemeProvider from '@mui/material/styles/ThemeProvider';

function App() {
  //const [theme, setTheme] = useState(palettes.light);
  const [theme, setTheme] = useState(() => {
    const saved = localStorageUtils.get("themePref");
    return themeMap[saved] || themeMap[themeNames.light];
  });

  const [muiTheme, setMuiTheme] = useState(() => {
    const saved = localStorageUtils.get("themePref");
    return themeMap[saved].mui || themeMap[themeNames.light].mui;
  });

  const handleSetPaletteInApp = (themeName: string) => {
    setTheme(themeMap[themeName]);
    setMuiTheme(themeMap[themeName].mui);
  }

  polyfillCountryFlagEmojis();

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <MuiThemeProvider theme={muiTheme}>
        <ThemeProvider theme={theme}>
          <SettingsProvider handleSetTheme={handleSetPaletteInApp}>
            <TimeProvider>
              <Routes/>
            </TimeProvider>
          </SettingsProvider>
        </ThemeProvider>
      </MuiThemeProvider>
    </LocalizationProvider>
  );
}

export default App;
