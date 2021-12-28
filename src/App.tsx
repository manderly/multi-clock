import { useState } from 'react';
import SettingsProvider from './contexts/SettingsContext';
import TimeProvider from './contexts/TimeContext';
import Routes from './Routes';

import { ThemeProvider } from 'styled-components';
import { themeNames, themeMap } from './components/Themes/Themes';
import localStorageUtils from './utils/localStorage';

import './App.css';

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

  return (
    <ThemeProvider theme={theme}>
      <SettingsProvider handleSetTheme={handleSetPaletteInApp}>
        <TimeProvider>
          <Routes/>
        </TimeProvider>
      </SettingsProvider>
    </ThemeProvider>
  );
}

export default App;
