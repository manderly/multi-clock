import { FC, createContext, useState } from 'react';
interface ISettingsContext {
  hoursPref: number;
  showSecondsPref: boolean;
  handleSetHours: (newPref: number) => void;
  handleShowSeconds: (newPref: boolean) => void;
}
// context consumer and provider
export const SettingsContext = createContext<ISettingsContext>({
  hoursPref: 12,
  showSecondsPref: false,
  handleSetHours: () => null,
  handleShowSeconds: () => null
});

const SettingsProvider: FC = ({children}) => {
  const [hoursPref, setHoursPref] = useState(() => {
    const saved = localStorage.getItem("hoursPref") as string;
    return parseInt(saved) || 12;
  });

  const [showSecondsPref, setShowSecondsPref] = useState(() => {
    const saved = localStorage.getItem("showSecondsPref") as string;
    return JSON.parse(saved) || false;
  });

  const handleSetHours = (newPref: number) => {
    setHoursPref(newPref);
    localStorage.setItem("hoursPref", JSON.stringify(newPref));
  }

  const handleShowSeconds = (newPref: boolean) => {
    setShowSecondsPref(newPref);
    localStorage.setItem("showSecondsPref", JSON.stringify(newPref));
  }

  const value = {
    hoursPref, handleSetHours,
    showSecondsPref, handleShowSeconds
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
      </SettingsContext.Provider>
  )
}

export default SettingsProvider;