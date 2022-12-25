import {FC, CSSProperties, useContext, useState, useEffect} from 'react';
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom';
import { Modal } from './components';
import Clocks from './routes/Clocks/Clocks';
import Settings from './routes/Settings/Settings';
import { useFormatDate } from './hooks/useFormatDate';

import { TimeContext } from './contexts/TimeContext';
import { SettingsContext } from './contexts/SettingsContext';

import SettingsIcon from '@mui/icons-material/Settings';
import GitHubIcon from '@mui/icons-material/GitHub';

import ManageClockSettings from './components/ManageClockSettings/ManageClockSettings';
import TimeOfDay from './components/TimeOfDay/TimeOfDay';

import {Tooltip} from "@mui/material";
import localStorageUtils from "./utils/localStorage";

const Routes: FC = () => {

  const { hoursPref, showMySecondsPref, userTimezone } = useContext(SettingsContext);
  const { now } = useContext(TimeContext);

  const [showPreviewTimeModal, setShowPreviewTimeModal] = useState(false);
  const [showPreviewTimeGlobal, setShowPreviewTimeGlobal] = useState(() => {
    const initialValue = localStorageUtils.get("showPreviewModeGlobal") as boolean;
    return initialValue || false;
  });

  const { formattedDateHeader: browserDate, formattedTime: browserTime, meridiem, timePalette } = useFormatDate(now, userTimezone.value, hoursPref, showMySecondsPref)

  const clockTimePaletteStyles: CSSProperties = {
    backgroundColor: timePalette.bg,
    color: timePalette.text,
  };

  const onClickMyOwnTime = () => {
    setShowPreviewTimeModal(true);
  }

  const handleTogglePreviewTimeGlobal = () => {
    setShowPreviewTimeGlobal(prev => !prev);
    localStorageUtils.put("showPreviewModeGlobal", !showPreviewTimeGlobal);
  }

  return (
    <Router>
      <div className="App">
        <header style={clockTimePaletteStyles}>
          <div className="header-clock-container">
            <div className="header-app-link">
              <Link to="/" style={clockTimePaletteStyles}>Multi Clock</Link>
            </div>

            <div className="header-clock-and-date my-clock" onClick={() => onClickMyOwnTime()}>
              <Tooltip title={userTimezone.label}>
                <TimeOfDay
                    data-testid={"users-time"}
                    time={browserTime}
                    meridiem={meridiem}
                    styles={clockTimePaletteStyles}/>
              </Tooltip>
              <div className="browser-date">{browserDate}</div>
            </div>

            <div className="header-settings-gear">
              <Link to="/settings" style={clockTimePaletteStyles} className="header-button"><SettingsIcon/></Link>
            </div>
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
              <Settings/>
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
