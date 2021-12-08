import { FC, CSSProperties, useContext } from 'react';
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom';
import Clocks from './routes/Clocks/Clocks';
import Settings from './routes/Settings/Settings';
import Utils from './routes/Utils/Utils';
import { useFormatDate } from './hooks/useFormatDate';

import { TimeContext } from './contexts/TimeContext';
import { SettingsContext } from './contexts/SettingsContext';

import SettingsIcon from '@mui/icons-material/Settings';
import CalculateIcon from '@mui/icons-material/Calculate';
import GitHubIcon from '@mui/icons-material/GitHub';

const getBrowserTZ = () => {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
}

const Routes: FC = () => {

  const { hoursPref, showSecondsPref } = useContext(SettingsContext);
  const { now } = useContext(TimeContext);

  const { formattedDateHeader: browserDate, formattedTime: browserTime, timePalette } = useFormatDate(now, getBrowserTZ(), hoursPref, showSecondsPref)

  const clockTimePaletteStyles: CSSProperties = {
    backgroundColor: timePalette.bg,
    color: timePalette.text,
  };

  return (
    <Router>
      <div className="App">
        <header style={clockTimePaletteStyles}>
          <div className="app-title-tiny">
            <div>
              <Link to="/" style={clockTimePaletteStyles}>Multi Clock</Link>
            </div>
            <div>
              <Link to="/settings" style={clockTimePaletteStyles} className="header-button"><SettingsIcon/></Link>
              <Link to="/utils" style={clockTimePaletteStyles} className="header-button"><CalculateIcon/></Link>
            </div>
          </div>
          <div className="header-clock-container">
            <div className="header-clock-and-date">
              <div className="browser-time">{browserTime}</div>
              <div className="browser-date">{browserDate}</div> 
            </div>
          </div>

        </header>

        <div className="page">
          <Switch>
            <Route exact path="/">
              <Clocks />
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
          <div>Mandi Burley 2021</div> 
          <div><a href="https://github.com/manderly/multi-clock"><GitHubIcon/></a></div>
        </footer>

      </div>
    </Router>
  )
}

export default Routes;
