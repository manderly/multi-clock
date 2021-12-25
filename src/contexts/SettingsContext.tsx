import { FC, createContext, useState } from 'react';
import { NorthAmerica, TimezoneOption, allTimezones } from '../data';

import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from '../components/GlobalStyles/GlobalStyles';
import { lightTheme, darkTheme } from '../components/Themes/Themes';
interface ISettingsContext {
  userTimezone: TimezoneOption;
  handleSetUserTimezone: (tz: TimezoneOption) => void;
  hoursPref: number;
  handleSetHours: (newPref: number) => void;
  showMySecondsPref: boolean;
  handleShowMySeconds: (newPref: boolean) => void;
  showOtherSecondsPref: boolean;
  handleShowOtherSeconds: (newPref: boolean) => void;
  getBrowserTZ: () => TimezoneOption;
}

// context consumer and provider
export const SettingsContext = createContext<ISettingsContext>({
  userTimezone: NorthAmerica[0],
  handleSetUserTimezone: () => null,
  hoursPref: 12,
  handleSetHours: () => null,
  showMySecondsPref: false,
  handleShowMySeconds: () => null,
  showOtherSecondsPref: false,
  handleShowOtherSeconds: () => null,
  getBrowserTZ: () => NorthAmerica[0],
});

const SettingsProvider: FC = ({children}) => {

  const getBrowserTZ = () => {
    const tzString = Intl.DateTimeFormat().resolvedOptions().timeZone;
    let match;
    allTimezones.map((tz) => tzString === tz.value ? match = tz : '')
    return match || NorthAmerica[0];
  }

  const [theme, setTheme] = useState('light');
  const [userTimezone, setUserTimezone] = useState(getBrowserTZ());

  const [hoursPref, setHoursPref] = useState(() => {
    const saved = localStorage.getItem("hoursPref") as string;
    return parseInt(saved) || 12;
  });

  const [showMySecondsPref, setShowMySecondsPref] = useState(() => {
    const saved = localStorage.getItem("showMySecondsPref") as string;
    return JSON.parse(saved) || false;
  });

  const [showOtherSecondsPref, setShowOtherSecondsPref] = useState(() => {
    const saved = localStorage.getItem("showOtherSecondsPref") as string;
    return JSON.parse(saved) || false;
  });

  const handleSetUserTimezone = (tz: TimezoneOption) => {
    setUserTimezone(tz);
    // todo: save this to localstorage 
  }

  const handleSetHours = (newPref: number) => {
    setHoursPref(newPref);
    localStorage.setItem("hoursPref", JSON.stringify(newPref));
  }

  const handleShowMySeconds = (newPref: boolean) => {
    setShowMySecondsPref(newPref);
    localStorage.setItem("showMySecondsPref", JSON.stringify(newPref));
  }

  const handleShowOtherSeconds = (newPref: boolean) => {
    setShowOtherSecondsPref(newPref);
    localStorage.setItem("showOtherSecondsPref", JSON.stringify(newPref));
  }

  const value = {
    userTimezone,
    handleSetUserTimezone,
    hoursPref, 
    handleSetHours,
    showMySecondsPref, 
    handleShowMySeconds,
    showOtherSecondsPref, 
    handleShowOtherSeconds,
    getBrowserTZ
  };

  return (
    <SettingsContext.Provider value={value}>
      <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
        <GlobalStyles/>
        {children}
      </ThemeProvider>
    </SettingsContext.Provider>

  )
}

export default SettingsProvider;