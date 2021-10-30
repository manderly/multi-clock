import React from 'react';
import './App.css';
import ClockDisplay from './components/ClockDisplay/ClockDisplay';
import { Europe, NorthAmerica } from './data';

function App() {

  return (
    <div className="App">
      <header className="App-header">
          <h1>Multi Clock</h1>
          
      </header>
      
      <div className="clocks-row-container">
        <ClockDisplay defaultTimeZone={NorthAmerica[0]}/>
        <ClockDisplay defaultTimeZone={NorthAmerica[2]}/>
        <ClockDisplay defaultTimeZone={Europe[1]}/>
        <ClockDisplay defaultTimeZone={Europe[2]}/>
      </div>
    </div>
  );
}

export default App;
