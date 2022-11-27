import { FC, useContext, useState } from 'react';
import { SettingsContext } from '../../contexts/SettingsContext';

import { themeNames } from '../../components/Themes/Themes';
import { ThemeButton } from '../../components';

const Settings: FC = () => {

    const {handleSetPaletteButton} = useContext(SettingsContext);

    const handlePaletteClick = (choice: string) => {
        // this method was passed in from settingsContext
        handleSetPaletteButton(choice);
    }

    return (
    <>
      <div className="settings-container">
        <h3>App color theme</h3>
        <ul className="hidden-li app-theme-choices">
          <li><ThemeButton onClick={() => handlePaletteClick(themeNames.light)}>THEME: LIGHT</ThemeButton></li>
          <li><ThemeButton onClick={() => handlePaletteClick(themeNames.dark)}>THEME: DARK</ThemeButton></li>
          <li><ThemeButton onClick={() => handlePaletteClick(themeNames.berry)}>THEME: Berry</ThemeButton></li>
          <li><ThemeButton onClick={() => handlePaletteClick(themeNames.blue)}>THEME: Blue</ThemeButton></li>
          </ul>
      </div>
  </>
  )
}

export default Settings;