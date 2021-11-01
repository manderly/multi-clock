import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom';
import Clocks  from './routes/Clocks/Clocks';
import Settings from './routes/Settings/Settings';
import SettingsProvider from './contexts/SettingsContext';
import { useState } from 'react';
import CounterButton from './components/CounterButton/CounterButton';

import './App.css';

function App() {
  const [count, setCount] = useState(0);
  const increaseCount = () => {
    setCount(count+1);
  }

  return (
    <SettingsProvider>
      <Router>
        <div className="App">
          <header className="App-header">
            <nav className="navigation-bar">
              <ul>
                <li>
                  <Link to ="/">Home</Link>
                </li>
                <li>
                  <Link to="/settings">Settings</Link>
                </li>
              </ul>
            </nav>
            <h1>Multi Clock</h1>
          </header>

          <Switch>
            <Route exact path="/">
              <Clocks />
            </Route>

            <Route path="/settings">
              <Settings />
            </Route>
          </Switch>
          
          <footer className="footer">
            <div className="counter-container">
              <div className="counter-item">
                <CounterButton label="Increase Counter" onClickMethod={increaseCount}/>
                </div>
                <div className="counter-item">
                  <span>Counter: {count}</span>
                </div>
            </div>
          </footer>

        </div>
      </Router>
    </SettingsProvider>
  );
}

export default App;
