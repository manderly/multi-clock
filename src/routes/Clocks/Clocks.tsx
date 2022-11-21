import {FC, useState, useEffect, useContext, CSSProperties} from 'react';
import Thermometer from '../../components/Thermometer/Thermometer';
import { usTimeZones, defaultTimeZones, TimezoneOption } from '../../data';
import {ThemeButton, TimezonePicker} from '../../components';
import localStorageUtils from '../../utils/localStorage';

import { SettingsContext } from '../../contexts/SettingsContext';

import ClockSingle from '../../components/ClockSingle/ClockSingle';
import FormControlLabel from "@mui/material/FormControlLabel";
import MUISwitch from "@mui/material/Switch";
import {TimePicker} from "@mui/x-date-pickers/TimePicker";
import TextField from "@mui/material/TextField";
import {TimeContext} from "../../contexts/TimeContext";
import {useTheme} from "styled-components";

interface IClocks {
  handleTogglePreviewTime: () => void;
  showPreviewTime: boolean;
}

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

const Clocks: FC<IClocks> = ({handleTogglePreviewTime, showPreviewTime}) => {
  // create an array of clock objects, feeding it default time zones
  // createDefaultClocks
  const { userTimezone } = useContext(SettingsContext);
  const { handlePreviewTimeChange, previewTime, handlePreviewTimezoneChange } = useContext(TimeContext);

  const [clocks, setClocks] = useState(() => {
    const initialValue = localStorageUtils.get("clocks");
    return initialValue || createDefaultClocks();
  });
  const [showPreviewTimeModal, setShowPreviewTimeModal] = useState(false);
  const [previewTimezone, setPreviewTimezone] = useState(userTimezone);

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
        return [...prev, createClock(usTimeZones[0], USCityNames[0])];
      })
    }
  }

  const removeClock = (removeID: number) => {
    let newArr = clocks.filter((clock: any) => {
      return clock.uniqueID !== removeID ? clock : null;
    }); 
    setClocks(newArr);
  }

  const customPalette = useTheme();
  const clockTimePaletteStyles: CSSProperties = {
    backgroundColor: customPalette.palette.button,
    color: customPalette.palette.textHeader,
  };

  return (
    <>
      <div className="clocks-quick-options">
        <div className="clocks-quick-options-item"><ThemeButton variant="primary" aria-label="button-add-clock" onClick={addClock}>Add Clock</ThemeButton></div>
      </div>  

      <div className="clocks-row-container">
        {clocks.map((data: any) => (
          <ClockSingle
            name={data.name}
            key={data.uniqueID}
            uniqueID={data.uniqueID}
            clockTimezone={data.timezone}
            userTimezone={userTimezone}
            showPreviewTime={showPreviewTime}
            handleTogglePreviewTime={handleTogglePreviewTime}
            handleRemoveClock={() => removeClock(data.uniqueID)}/>
          ))}
      </div>

      <div className={"width100 marginTop20"} style={clockTimePaletteStyles}>
        <div className={"preview-time-settings-dropdowns"}>
          <div className={"wide-input"}><FormControlLabel control={<MUISwitch defaultChecked color="default" />} onChange={handleTogglePreviewTime} label="Preview a time" /></div>
          <TimePicker
              label="Choose a time"
              value={previewTime}
              minutesStep={5}
              renderInput={(props) => <TextField {...props} type="time" size={"small"}/>}
              onChange={handlePreviewTimeChange}
          />
          <TimezonePicker changeTimezone={handlePreviewTimezoneChange} defaultTimezone={previewTimezone}/>
        </div>
        <Thermometer smallestF={-20} largestF={120}/>
      </div>
    </>
  )
}

export default Clocks;