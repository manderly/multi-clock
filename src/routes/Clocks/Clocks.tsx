import { FC } from 'react';
import ClockDisplay from '../../components/ClockDisplay/ClockDisplay';
import { defaultTimeZones } from '../../data';
import { Button } from 'react-bootstrap';

const Clocks: FC = () => {

  const handleSetAllToUSClick = () => {
    console.log("set all to US");
  }

  return (
    <>
      <div className="clocks-quick-options">
        <div className="clocks-quick-options-item"><Button variant="outline-primary" type="button" onClick={handleSetAllToUSClick}>Set all to U.S.</Button></div>
        <div className="clocks-quick-options-item"><Button variant="primary">Add Clock</Button></div>
      </div>  

      <div className="clocks-row-container">
        {
        defaultTimeZones.map((tz, idx) => (
          <ClockDisplay key={`clock-display-${idx}`} defaultTimeZone={tz}/>))
        }
      </div>
      
    </>
  )
}

export default Clocks;