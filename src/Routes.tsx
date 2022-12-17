import { FC, CSSProperties, useContext, useState } from 'react';
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom';
import { Modal } from './components';
import Clocks from './routes/Clocks/Clocks';
import Settings from './routes/Settings/Settings';
import Utils from './routes/Utils/Utils';
import { useFormatDate } from './hooks/useFormatDate';

import { TimeContext } from './contexts/TimeContext';
import { SettingsContext } from './contexts/SettingsContext';

import SettingsIcon from '@mui/icons-material/Settings';
import GitHubIcon from '@mui/icons-material/GitHub';

import ManageClockSettings from './components/ManageClockSettings/ManageClockSettings';
import TimeOfDay from './components/TimeOfDay/TimeOfDay';

import { TimezoneOption } from './data';

const Routes: FC = () => {

  const { hoursPref, showMySecondsPref, userTimezone } = useContext(SettingsContext);
  const { now, handlePreviewTimeChange, previewTime } = useContext(TimeContext);

  const [showPreviewTimeModal, setShowPreviewTimeModal] = useState(false);
  const [showPreviewTimeGlobal, setShowPreviewTimeGlobal] = useState(true);
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

  const handleTogglePreviewTimeGlobal = () => {
    setShowPreviewTimeGlobal(prev => !prev)
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
            Clock preferences
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ManageClockSettings />
        </Modal.Body>
      </Modal>
        <div className="page">
          <Switch>
            <Route exact path="/">
              <Clocks showPreviewTimeGlobal={showPreviewTimeGlobal} handleTogglePreviewTimeGlobal={handleTogglePreviewTimeGlobal}/>
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
