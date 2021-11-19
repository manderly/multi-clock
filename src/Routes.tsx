import { FC, CSSProperties, useState, useContext } from 'react';
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom';
import Clocks from './routes/Clocks/Clocks';
import Settings from './routes/Settings/Settings';
import Utils from './routes/Utils/Utils';
import CounterButton from './components/CounterButton/CounterButton';
import { useFormatDate } from './hooks/useFormatDate';

import { TimeContext } from './contexts/TimeContext';
import { SettingsContext } from './contexts/SettingsContext';


const getBrowserTZ = () => {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
}

const Routes: FC = () => {

  const { hoursPref, showSecondsPref } = useContext(SettingsContext);
  const { now } = useContext(TimeContext);

  const [count, setCount] = useState(0);
  const increaseCount = () => {
    setCount(count+1);
  }

  const { formattedDate: browserDate, formattedTime: browserTime, timePalette } = useFormatDate(now, getBrowserTZ(), hoursPref, showSecondsPref)

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
              <h1 className="app-title">Multi Clock</h1>
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
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link to="/settings">Settings</Link>
                  </li>
                  <li>
                    <Link to="/utils">Utils</Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </header>

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

        <footer className="footer">
          <div className="counter-container">
            <div className="counter-item">
              <CounterButton label="Increase Counter" onClickMethod={increaseCount} />
            </div>
            <div className="counter-item">
              <span>Counter: {count}</span>
            </div>
          </div>
        </footer>

      </div>
    </Router>
  )
}

export default Routes;
