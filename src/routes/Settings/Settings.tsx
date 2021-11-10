import { FC, useContext } from 'react';
import { Form } from 'react-bootstrap';
import { SettingsContext } from '../../contexts/SettingsContext';

const Settings: FC = () => {

  const { hoursPref, handleSetHours } = useContext(SettingsContext);
  const { showSecondsPref, handleShowSeconds } = useContext(SettingsContext);

  const handleFormChange = (e: any) => {
    handleSetHours(Number(e?.target?.value));
  }

  const handleSecondsCheckbox = (e: any) => {
    handleShowSeconds(!showSecondsPref);
  }

  return (
    <div className="settings-container">
      <h2>Settings & Preferences</h2>
      <Form>
        <Form.Check 
          inline
          onChange={handleFormChange}
          checked={hoursPref === 12}
          value={12}
          aria-label='option-12-hours'
          label='12 hour clock'
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
          label='24 hour clock'
          name='group1'
          type='radio'
          id='clock-type-24-hour'
        />
      </Form>

      <Form>
        <Form.Check 
          onChange={handleSecondsCheckbox}
          checked={showSecondsPref}
          aria-label='option-show-seconds'
          label='Show seconds'
          type='checkbox'
        />
      </Form>
    </div>
  )
}

export default Settings;