import React from 'react';
import logo from './logo.svg';
import './App.css';
import ClockDisplay from './components/ClockDisplay/ClockDisplay';

function App() {

  return (
    <div className="App">
      <header className="App-header">
          <h1>Multi Clock</h1>
          
      </header>
      
      <div className="container">
        <ClockDisplay/>
        <ClockDisplay/>
        <ClockDisplay/>
        <ClockDisplay/>
      </div>
    </div>
  );
}

export default App;
