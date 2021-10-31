import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom';
import Clocks  from './routes/Clocks/Clocks';
import Settings from './routes/Settings/Settings';
import SettingsProvider from './contexts/SettingsContext';

import './App.css';

function App() {

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
          
        </div>
      </Router>
    </SettingsProvider>
  );
}

export default App;
