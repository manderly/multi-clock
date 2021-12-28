import { FC, createContext, useState } from 'react';
import { NorthAmerica, TimezoneOption, allTimezones } from '../data';

import { GlobalStyles } from '../components/GlobalStyles/GlobalStyles';
import localStorageUtils from '../utils/localStorage';
interface ISettingsContext {
  userTimezone: TimezoneOption;
  handleSetUserTimezone: (tz: TimezoneOption) => void;
  hoursPref: number;
  handleSetHours: (newPref: number) => void;
  showMySecondsPref: boolean;
  handleShowMySeconds: (newPref: boolean) => void;
  showOtherSecondsPref: boolean;
  handleShowOtherSeconds: (newPref: boolean) => void;
  handleSetPaletteButton: (name: string) => void;
  getBrowserTZ: () => TimezoneOption;
}

interface ISettingProvider {
  handleSetTheme: (themeName: string) => void;
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
  handleSetPaletteButton: () => null
});

const SettingsProvider: FC<ISettingProvider> = ({children, handleSetTheme}) => {

  const getBrowserTZ = () => {
    const tzString = Intl.DateTimeFormat().resolvedOptions().timeZone;
    let match;
    allTimezones.map((tz) => tzString === tz.value ? match = tz : '')
    return match || NorthAmerica[0];
  }

  const [userTimezone, setUserTimezone] = useState(getBrowserTZ());

  const [hoursPref, setHoursPref] = useState(() => {
    const saved = localStorageUtils.get("hoursPref");
    return parseInt(saved) || 12;
  });

  const [showMySecondsPref, setShowMySecondsPref] = useState(() => {
    const saved = localStorageUtils.get("showMySecondsPref");
    return JSON.parse(saved) || false;
  });

  const [showOtherSecondsPref, setShowOtherSecondsPref] = useState(() => {
    const saved = localStorageUtils.get("showOtherSecondsPref");
    return JSON.parse(saved) || false;
  });

  const handleSetUserTimezone = (tz: TimezoneOption) => {
    setUserTimezone(tz);
    // todo: save this to localstorage 
  }

  const handleSetHours = (newPref: number) => {
    setHoursPref(newPref);
    localStorageUtils.put("hoursPref", newPref);
  }

  const handleShowMySeconds = (newPref: boolean) => {
    setShowMySecondsPref(newPref);
    localStorageUtils.put("showMySecondsPref", newPref);
  }

  const handleShowOtherSeconds = (newPref: boolean) => {
    setShowOtherSecondsPref(newPref);
    localStorageUtils.put("showOtherSecondsPref", newPref);
  }

  const handleSetPaletteButton = (themeName: string) => {
    // send just the name up, the matching to an actual theme happens up in App.tsx
    handleSetTheme(themeName);
    localStorageUtils.put("themePref", themeName);
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
    getBrowserTZ,
    handleSetPaletteButton
  };

  return (
    <SettingsContext.Provider value={value}>
        <GlobalStyles/>
        {children}
    </SettingsContext.Provider>

  )
}

export default SettingsProvider;