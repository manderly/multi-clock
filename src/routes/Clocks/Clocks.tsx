import { FC, useState } from 'react';
import ClockDisplay from '../../components/ClockDisplay/ClockDisplay';
import { NorthAmerica, usTimeZones, defaultTimeZones, TimezoneOption } from '../../data';
import { Button } from 'react-bootstrap';
interface IClock {
  timezone: TimezoneOption;
  name: string;
  uniqueID: number;
}

const USCityNames = ["Seattle, WA", "Denver, CO", "Chicago, IL", "New York, NY"]

const createDefaultClocks = () => {
  // use default clock data exported by data file
  let clocks: IClock[] = new Array();
  defaultTimeZones.forEach((data) => {
    clocks.push(createClock(data));
  })
  return clocks;
}

const createClock = (tz: TimezoneOption, name?: string, uniqueID?: number): IClock => {
  return {
    timezone: tz,
    name: name ? name: '',
    uniqueID: uniqueID ? uniqueID : Math.random()
  }
}

const Clocks: FC = () => {
  // create an array of clock objects, feeding it default time zones
  const [clocks, setClocks] = useState(createDefaultClocks);

  const handleSetAllToUSClick = () => {
    // set existing clocks or create new ones to get to 4 clocks representing 4 US time zones
    console.log("Setting first four clocks to US timezones");

    // not this idea, instead ... create new clocks from existing data? 
    const USClocks = new Array();

    for (let i = 0; i < 4; i++) {
        let USClock = createClock(usTimeZones[i], USCityNames[i]);
        USClocks.push(USClock);
    }
    setClocks(USClocks);
  }

  const addClock = () => {
    if (clocks.length < 10) {
      setClocks((prev) => {
        // concat on new clock
        return [...prev, createClock(usTimeZones[0])];
      })
    }
  }

  const removeClock = (removeID: number) => {
    let newArr = clocks.filter((clock) => {
      return clock.uniqueID !== removeID ? clock : null;
    }); 
    setClocks(newArr);
  }

  return (
    <>
      <div className="clocks-quick-options">
        <div className="clocks-quick-options-item"><Button variant="outline-primary" type="button" onClick={handleSetAllToUSClick}>🇺🇸 U.S. Timezones</Button></div>
        <div className="clocks-quick-options-item"><Button variant="primary" aria-label="button-add-clock" onClick={addClock}>Add Clock</Button></div>
      </div>  

      <div className="clocks-row-container">
        {clocks.map((data) => (
          <ClockDisplay 
            name={data.name}
            key={data.uniqueID} //{`clock-display-${idx}-${JSON.stringify(data.timezone)}`}
            uniqueID={data.uniqueID}
            defaultTimeZone={data.timezone} 
            handleRemoveClock={() => removeClock(data.uniqueID)}/>
          ))}
      </div>
    </>
  )
}

export default Clocks;