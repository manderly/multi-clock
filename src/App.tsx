import React from 'react';
import './App.css';
import ClockDisplay from './components/ClockDisplay/ClockDisplay';
import { defaultTimeZones } from './data';

function App() {

  return (
    <div className="App">
      <header className="App-header">
          <h1>Multi Clock</h1>
      </header>
      
      <div className="clocks-row-container">
        {
        defaultTimeZones.map((tz) => (
          <ClockDisplay defaultTimeZone={tz}/>))
        }
      </div>
    </div>
  );
}

export default App;
