import SettingsProvider from './contexts/SettingsContext';
import TimeProvider from './contexts/TimeContext';

import Routes from './Routes';

import './App.css';

function App() {
  return (
    <SettingsProvider>
      <TimeProvider>
        <Routes/>
      </TimeProvider>
    </SettingsProvider>
  );
}

export default App;
