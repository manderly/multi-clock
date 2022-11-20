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

function App() {
  //const [theme, setTheme] = useState(palettes.light);
  const [theme, setTheme] = useState(() => {
    const saved = localStorageUtils.get("themePref");
    return themeMap[saved] || themeMap[themeNames.light];
  });

  const handleSetPaletteInApp = (themeName: string) => {
    let theme = themeMap[themeName];
    setTheme(theme);
  }

  polyfillCountryFlagEmojis();

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <ThemeProvider theme={theme}>
        <SettingsProvider handleSetTheme={handleSetPaletteInApp}>
          <TimeProvider>
            <Routes/>
          </TimeProvider>
        </SettingsProvider>
      </ThemeProvider>
    </LocalizationProvider>
  );
}

export default App;
