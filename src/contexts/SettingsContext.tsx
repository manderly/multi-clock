import { FC, createContext, useState } from 'react';

interface ISettingsContext {
  hoursPref: number;
  handleSetHours: (newPref: number) => void;
}
// context consumer and provider
export const SettingsContext = createContext<ISettingsContext>({
  hoursPref: 12,
  handleSetHours: () => null
});

const SettingsProvider: FC = ({children}) => {
  const [hoursPref, setHoursPref] = useState(12);

  const handleSetHours = (newPref: number) => {
    setHoursPref(newPref);
  }

  const value = {
    hoursPref, handleSetHours
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
      </SettingsContext.Provider>
  )
}

export default SettingsProvider;