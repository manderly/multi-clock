import { FC, useState } from 'react';
import ClockDisplay from '../../components/ClockDisplay/ClockDisplay';
import { NorthAmerica, defaultTimeZones } from '../../data';
import { Button } from 'react-bootstrap';

const Clocks: FC = () => {

  const emptyClock = defaultTimeZones[0];
  const [clocks, setClocks] = useState(defaultTimeZones);
  const handleSetAllToUSClick = () => {
    let usTimeZones = [NorthAmerica[0],NorthAmerica[1],NorthAmerica[2],NorthAmerica[3]];
    setClocks(usTimeZones);
  }

  const addClock = () => {
    if (clocks.length < 10) {
      setClocks((prev) => {
        // concat on new clock
        return [...prev, emptyClock];
      })
    }
  }

  const removeClock = (idxToRemove: number) => {
    console.log("Before:")
    console.log(clocks);
    let newArr = clocks.filter((clock, i) => {
      return i !== idxToRemove ? clock : null;
    });
    setClocks(newArr);
    console.log("After:")
    console.log(newArr);
  }

  return (
    <>
      <div className="clocks-quick-options">
        <div className="clocks-quick-options-item"><Button variant="outline-primary" type="button" onClick={handleSetAllToUSClick}>🇺🇸 Set all to U.S.</Button></div>
        <div className="clocks-quick-options-item"><Button variant="primary" onClick={addClock}>Add Clock</Button></div>
      </div>  

      <div className="clocks-row-container">
        {clocks.map((tz, idx) => (
          <ClockDisplay key={`clock-display-${idx}-${JSON.stringify(tz)}`} defaultTimeZone={tz} handleRemoveClock={() => removeClock(idx)}/>
        ))}
      </div>
      
    </>
  )
}

export default Clocks;