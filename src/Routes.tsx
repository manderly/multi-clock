import { FC, CSSProperties, useState, useContext } from 'react';
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom';
import Clocks from './routes/Clocks/Clocks';
import Settings from './routes/Settings/Settings';
import Utils from './routes/Utils/Utils';
import { useFormatDate } from './hooks/useFormatDate';

import { TimeContext } from './contexts/TimeContext';
import { SettingsContext } from './contexts/SettingsContext';


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
          <div className="header-row-container">
            <div className="header-row-item">
              <h1 className="app-title"><Link to="/">Multi Clock</Link></h1>
              <h2 className="app-subtitle">v. 0.1</h2>
            </div>

            <div className="header-row-item">
              <div className="browser-date">{browserDate}</div> 
              <div className="browser-time">{browserTime}</div>
            </div>

            <div className="header-row-item">
              <nav className="navigation-links">
                <ul>
                  <li>
                    <Link to="/settings">Settings</Link>
                  </li>
                  <li>
                    <Link to="/utils">Utilities</Link>
                  </li>
                </ul>
              </nav>
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
          2021
        </footer>

      </div>
    </Router>
  )
}

export default Routes;
