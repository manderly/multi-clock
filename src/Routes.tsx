import { FC, CSSProperties, useContext, useState } from 'react';
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom';
import { Modal, TimezonePicker } from './components';
import Clocks from './routes/Clocks/Clocks';
import Settings from './routes/Settings/Settings';
import Utils from './routes/Utils/Utils';
import { useFormatDate } from './hooks/useFormatDate';

import { TimeContext } from './contexts/TimeContext';
import { SettingsContext } from './contexts/SettingsContext';

import SettingsIcon from '@mui/icons-material/Settings';
import GitHubIcon from '@mui/icons-material/GitHub';

import TimeOfDay from './components/TimeOfDay/TimeOfDay';
import TextField from '@mui/material/TextField';
import {TimePicker} from '@mui/x-date-pickers/TimePicker';
import { ThemeButton } from './components';

import { TimezoneOption } from './data';

const Routes: FC = () => {

  const { hoursPref, showMySecondsPref, userTimezone } = useContext(SettingsContext);
  const { now, handlePreviewTimeChange, previewTime } = useContext(TimeContext);

  const [showPreviewTimeModal, setShowPreviewTimeModal] = useState(false);
  const [showPreviewTime, setShowPreviewTime] = useState(true);
  const [previewTimezone, setPreviewTimezone] = useState(userTimezone);

  const { formattedDateHeader: browserDate, formattedTime: browserTime, meridiem, timePalette } = useFormatDate(now, userTimezone.value, hoursPref, showMySecondsPref)

  const clockTimePaletteStyles: CSSProperties = {
    backgroundColor: timePalette.bg,
    color: timePalette.text,
  };

  const onClickMyOwnTime = () => {
    setShowPreviewTimeModal(true);
  }

  const handlePreviewTimezoneChange = (tz: TimezoneOption) => {
    setPreviewTimezone(tz);
  }

  const handleShowTimePreviews = (value: boolean) => {
    setShowPreviewTime(value);
  }

  const handleTogglePreviewTime = () => {
    setShowPreviewTime(prev => !prev)
  }

  return (
    <Router>
      <div className="App">
        <header style={clockTimePaletteStyles}>
          <div className="header-clock-container">
            <div>
              {userTimezone.label}
            </div>
            <div className="header-clock-and-date" onClick={() => onClickMyOwnTime()}>
              <TimeOfDay time={browserTime} meridiem={meridiem} styles={clockTimePaletteStyles}/>
              <div className="browser-date">{browserDate}</div> 
            </div>
          </div>

          <div className="pull-right">
            <Link to="/settings" style={clockTimePaletteStyles} className="header-button"><SettingsIcon/></Link>
            <Link to="/" style={clockTimePaletteStyles}>Multi Clock</Link>
          </div>
        </header>

        <Modal
        show={showPreviewTimeModal}
        onHide={() => setShowPreviewTimeModal(false)}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Preview a time
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="preview-timezone-modal-contents">
            <TimePicker
              label="Choose a time"
              value={previewTime}
              minutesStep={5}
              renderInput={(props) => <TextField {...props} type="time"/>}
              onChange={handlePreviewTimeChange}
            />
            <TimezonePicker changeTimezone={handlePreviewTimezoneChange} defaultTimezone={previewTimezone}/>
          <div className="modal-bottom-buttons">
            <ThemeButton onClick={() => handleShowTimePreviews(false)}>Hide Previews</ThemeButton>
            <ThemeButton onClick={() => handleShowTimePreviews(true)}>Show Previews</ThemeButton>
          </div>
        </div>
        </Modal.Body>
      </Modal>
        <div className="page">
          <Switch>
            <Route exact path="/">
              <Clocks showPreviewTime={showPreviewTime} handleTogglePreviewTime={handleTogglePreviewTime}/>
            </Route>

            <Route path="/settings">
              <Settings />
            </Route>

            <Route path="/utils">
              <Utils />
            </Route>

          </Switch>
        </div>

        <footer className="footer">
          <div><a href="https://github.com/manderly/multi-clock" className="no-underline">Mandi Burley 2022</a></div> 
          <div><a href="https://github.com/manderly/multi-clock"><GitHubIcon/></a></div>
        </footer>

      </div>
    </Router>
  )
}

export default Routes;
