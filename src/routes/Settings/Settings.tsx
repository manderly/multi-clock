import { FC, useContext, useState } from 'react';
import { Form } from 'react-bootstrap';
import { SettingsContext } from '../../contexts/SettingsContext';

import { TimezoneOption } from '../../data';
import { TimezonePicker } from '../../components';

import PublicIcon from '@mui/icons-material/Public';

import { Modal } from '../../components';

import { themeNames } from '../../components/Themes/Themes';
import { ThemeButton } from '../../components';

const Settings: FC = () => {
  // these methods and variables are passed in from settings context
  const { 
    userTimezone, 
    handleSetUserTimezone, 
    hoursPref, 
    handleSetHours,
    showMySecondsPref, 
    handleShowMySeconds,
    showOtherSecondsPref, 
    handleShowOtherSeconds,
    getBrowserTZ,
    handleSetPaletteButton} = useContext(SettingsContext);

  const [showTimezoneModal, setShowTimezoneModal] = useState(false);

  const handleFormChange = (e: any) => {
    handleSetHours(Number(e?.target?.value));
  }

  const handleMySecondsCheckbox = (e: any) => {
    handleShowMySeconds(!showMySecondsPref);
  }

  const handleOtherSecondsCheckbox = (e: any) => {
    handleShowOtherSeconds(!showOtherSecondsPref);
  }

  const handleTimezoneModal = () => {
    setShowTimezoneModal(!showTimezoneModal);
  }

  const handleTimezoneChange = (tz: TimezoneOption) => {
    handleSetUserTimezone(tz);
  }

  const handleSetToBrowserTimezone = () => {
    const browserTZ = getBrowserTZ();
    handleSetUserTimezone(browserTZ);
  }

  const handlePaletteClick = (choice: string) => {
    // this method was passed in from settingsContext
    handleSetPaletteButton(choice);
  }

  return (
    <>
      <div className="settings-container">
        <h2>Time Display Preferences</h2>
        <Form>
          <Form.Check 
            inline
            onChange={handleFormChange}
            checked={hoursPref === 12}
            value={12}
            aria-label='option-12-hours'
            label='12 hour clocks'
            name='group1'
            type='radio'
            id='clock-type-12-hour'
          />
          <Form.Check
            inline
            onChange={handleFormChange}
            checked={hoursPref === 24}
            value={24}
            aria-label='option-24-hours'
            label='24 hour clocks'
            name='group1'
            type='radio'
            id='clock-type-24-hour'
          />
        </Form>
        <br/>
        <Form>
          <Form.Check 
            onChange={handleMySecondsCheckbox}
            checked={showMySecondsPref}
            aria-label='option-show-my-seconds'
            label='Show seconds on my clock'
            type='checkbox'
          />
        </Form>

        <Form>
          <Form.Check 
            onChange={handleOtherSecondsCheckbox}
            checked={showOtherSecondsPref}
            aria-label='option-show-other-seconds'
            label='Show seconds on other clocks'
            type='checkbox'
          />
        </Form>
        <br/>
        <ThemeButton onClick={handleTimezoneModal}><PublicIcon/> Change my timezone</ThemeButton>
        <br/><br/>
        <hr/>
        <h3>App color theme</h3>
        <ul className="hidden-li app-theme-choices">
          <li><ThemeButton onClick={() => handlePaletteClick(themeNames.light)}>THEME: LIGHT</ThemeButton></li>
          <li><ThemeButton onClick={() => handlePaletteClick(themeNames.dark)}>THEME: DARK</ThemeButton></li>
          <li><ThemeButton onClick={() => handlePaletteClick(themeNames.berry)}>THEME: Berry</ThemeButton></li>
          <li><ThemeButton onClick={() => handlePaletteClick(themeNames.blue)}>THEME: Blue</ThemeButton></li>
          </ul>
      </div>

      <Modal
        show={showTimezoneModal}
        onHide={() => setShowTimezoneModal(false)}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
        >

      <Modal.Header closeButton>
        <Modal.Title id="example-custom-modal-styling-title">
          Set your timezone
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="modal-line timezone-modal">
          <div className="change-timezone modal-line">
            <TimezonePicker changeTimezone={handleTimezoneChange} defaultTimezone={userTimezone}/>
          </div>
          <br/>
          <ThemeButton onClick={handleSetToBrowserTimezone}>Use Browser Timezone</ThemeButton>
          </div>
      </Modal.Body>
    </Modal>
  </>
  )
}

export default Settings;