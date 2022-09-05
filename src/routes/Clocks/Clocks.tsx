import { FC, useState, useEffect, useContext } from 'react';
import ClockDisplay from '../../components/ClockDisplay/ClockDisplay';
import Thermometer from '../../components/Thermometer/Thermometer';
import { usTimeZones, defaultTimeZones, TimezoneOption } from '../../data';
import { ThemeButton } from '../../components';
import localStorageUtils from '../../utils/localStorage';
import { SettingsContext } from '../../contexts/SettingsContext';
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
  const { userTimezone } = useContext(SettingsContext);

  const [clocks, setClocks] = useState(() => {
    const initialValue = localStorageUtils.get("clocks");
    return initialValue || createDefaultClocks();
  });

  useEffect(() => {
    localStorageUtils.put("clocks", clocks);
  }, [clocks])

  const handleSetAllToUSClick = () => {
    localStorageUtils.delete("clocks");
    // set existing clocks or create new ones to get to 4 clocks representing 4 US time zones
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
        <div className="clocks-quick-options-item"><ThemeButton variant="outline-primary" type="button" onClick={handleSetAllToUSClick}>🇺🇸 U.S. Timezones</ThemeButton></div>
        <div className="clocks-quick-options-item"><ThemeButton variant="primary" aria-label="button-add-clock" onClick={addClock}>Add Clock</ThemeButton></div>
      </div>  

      <div className="clocks-row-container">
        {clocks.map((data: any) => (
          <ClockDisplay 
            name={data.name}
            key={data.uniqueID}
            uniqueID={data.uniqueID}
            defaultTimezone={data.timezone}
            userTimezone={userTimezone}
            handleRemoveClock={() => removeClock(data.uniqueID)}/>
          ))}
      </div>

      <Thermometer smallestF={-20} largestF={110}/>
    </>
  )
}

export default Clocks;