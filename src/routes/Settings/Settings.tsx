import { FC, useContext } from 'react';
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
    <div className="settings-page">
      <div className="settings-container">
        <h3>App color theme</h3>
        <ul className="hidden-li app-theme-choices">
          <li><ThemeButton
              onClick={() => handlePaletteClick(themeNames.light)}
              className={"settings-theme-button"}>THEME: Light</ThemeButton></li>
          <li><ThemeButton
              onClick={() => handlePaletteClick(themeNames.dark)}
              className={"settings-theme-button"}>THEME: Dark</ThemeButton></li>
          <li><ThemeButton
              onClick={() => handlePaletteClick(themeNames.berry)}
              className={"settings-theme-button"}>THEME: Berry</ThemeButton></li>
          <li><ThemeButton
              onClick={() => handlePaletteClick(themeNames.blue)}
              className={"settings-theme-button"}>THEME: Blue</ThemeButton></li>
          </ul>
      </div>
    </div>
  )
}

export default Settings;