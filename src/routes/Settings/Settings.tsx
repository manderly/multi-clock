import { FC, useContext, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { SettingsContext } from '../../contexts/SettingsContext';

import { TimezoneOption } from '../../data';
import TimezonePicker from '../../components/TimezonePicker/TimezonePicker';

import PublicIcon from '@mui/icons-material/Public';

const Settings: FC = () => {

  const { userTimezone, handleSetUserTimezone } = useContext(SettingsContext);
  const { hoursPref, handleSetHours } = useContext(SettingsContext);
  const { showMySecondsPref, handleShowMySeconds } = useContext(SettingsContext);
  const { showOtherSecondsPref, handleShowOtherSeconds } = useContext(SettingsContext);

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

  return (
    <>
      <div className="settings-container">
        <h2>Settings & Preferences</h2>
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
        <Button onClick={handleTimezoneModal}><PublicIcon/>{userTimezone.label}</Button>
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
          <label>Timezone</label>
          <div className="change-timezone modal-line">
            <TimezonePicker changeTimezone={handleTimezoneChange} defaultTimezone={userTimezone}/>
          </div>
          </div>
      </Modal.Body>
    </Modal>
  </>
  )
}

export default Settings;