import { useState } from 'react';
import SettingsProvider from './contexts/SettingsContext';
import TimeProvider from './contexts/TimeContext';
import Routes from './Routes';

import { DefaultTheme, ThemeProvider } from 'styled-components';
import { palettes } from './components/Themes/Themes';

import './App.css';

function App() {

  const [theme, setTheme] = useState(palettes.light);

  const handleSetPaletteInApp = (palette: DefaultTheme) => {
    setTheme(palette);
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
