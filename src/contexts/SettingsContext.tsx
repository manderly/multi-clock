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
  const [hoursPref, setHoursPref] = useState(12);
  const [showSecondsPref, setShowSecondsPref] = useState(false);

  const handleSetHours = (newPref: number) => {
    setHoursPref(newPref);
  }

  const handleShowSeconds = (newPref: boolean) => {
    setShowSecondsPref(newPref);
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