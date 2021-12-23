import { FC, useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';

import ClockDisplay from '../../components/ClockDisplay/ClockDisplay';
import { usTimeZones, defaultTimeZones, TimezoneOption } from '../../data';

interface IClock {
  timezone: TimezoneOption;
  name: string;
  uniqueID: number;
}

const USCityNames = ["Seattle, WA", "Denver, CO", "Chicago, IL", "New York, NY"]

const createDefaultClocks = () => {
  // use default clock data exported by data file
  let clocks: IClock[] = [];
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
  // createDefaultClocks
  const [clocks, setClocks] = useState(() => {
    // get from localstorage if possible
    const saved = localStorage.getItem("clocks") as string;
    const initialValue = JSON.parse(saved);
    return initialValue || createDefaultClocks();
  });

  useEffect(() => {
    //console.log("re-writing localstorage clock data");
    localStorage.setItem("clocks", JSON.stringify(clocks));
  }, [clocks])

  const handleSetAllToUSClick = () => {
    localStorage.removeItem("clocks");
    // set existing clocks or create new ones to get to 4 clocks representing 4 US time zones
    //console.log("Setting first four clocks to US timezones");

    // not this idea, instead ... create new clocks from existing data? 
    const USClocks = [];

    for (let i = 0; i < 4; i++) {
        let USClock = createClock(usTimeZones[i], USCityNames[i]);
        USClocks.push(USClock);
    }
    setClocks(USClocks);
  }

  const addClock = () => {
    if (clocks.length < 10) {
      setClocks((prev: any) => {
        // concat on new clock
        return [...prev, createClock(usTimeZones[0])];
      })
    }
  }

  const removeClock = (removeID: number) => {
    let newArr = clocks.filter((clock: any) => {
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
        {clocks.map((data: any) => (
          <ClockDisplay 
            name={data.name}
            key={data.uniqueID}
            uniqueID={data.uniqueID}
            defaultTimeZone={data.timezone} 
            handleRemoveClock={() => removeClock(data.uniqueID)}/>
          ))}
      </div>
    </>
  )
}

export default Clocks;