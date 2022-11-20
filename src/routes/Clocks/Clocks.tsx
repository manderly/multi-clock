import { FC, useState, useEffect, useContext } from 'react';
import Thermometer from '../../components/Thermometer/Thermometer';
import { usTimeZones, defaultTimeZones, TimezoneOption } from '../../data';
import { Modal, TimezonePicker } from '../../components';
import { ThemeButton } from '../../components';
import localStorageUtils from '../../utils/localStorage';

import { SettingsContext } from '../../contexts/SettingsContext';
import { TimeContext } from '../../contexts/TimeContext';

import ClockDisplay from '../../components/ClockDisplay/ClockDisplay';
import TextField from '@mui/material/TextField';
import {TimePicker} from '@mui/x-date-pickers/TimePicker';

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
  const { handlePreviewTimeChange, previewTime } = useContext(TimeContext);

  const [clocks, setClocks] = useState(() => {
    const initialValue = localStorageUtils.get("clocks");
    return initialValue || createDefaultClocks();
  });
  const [showPreviewTimeModal, setShowPreviewTimeModal] = useState(false);

  //const [previewTimeCandidate, setPreviewTimeCandidate] = useState(startingTimeForPreview.toString());
  const [showPreviewTime, setShowPreviewTime] = useState(true);
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

  const handlePreviewTimezoneChange = (tz: TimezoneOption) => {
    setPreviewTimezone(tz);
  }

  const handleShowTimePreviews = (showPreviews: boolean) => {
    // todo: sanitize candidate value? 
    setShowPreviewTime(showPreviews);
    setShowPreviewTimeModal(false);
  }

  const handleTogglePreviewTime = () => {
    setShowPreviewTime(prev => !prev)
  }

  return (
    <>
      <div className="clocks-quick-options">
        <ThemeButton onClick={() => setShowPreviewTimeModal(true)}>Preview a time</ThemeButton>
        <div className="clocks-quick-options-item"><ThemeButton variant="primary" aria-label="button-add-clock" onClick={addClock}>Add Clock</ThemeButton></div>
        <div className="clocks-quick-options-item"><ThemeButton variant="outline-primary" type="button" onClick={handleSetAllToUSClick}>🇺🇸 U.S. Timezones</ThemeButton></div>
      </div>  

      <div className="clocks-row-container">
        {clocks.map((data: any) => (
          <ClockDisplay 
            name={data.name}
            key={data.uniqueID}
            uniqueID={data.uniqueID}
            defaultTimezone={data.timezone}
            userTimezone={userTimezone}
            previewTime={previewTime.toString()}
            previewTimezone={previewTimezone}
            showPreviewTime={showPreviewTime}
            handleTogglePreviewTime={handleTogglePreviewTime}
            handleRemoveClock={() => removeClock(data.uniqueID)}/>
          ))}
      </div>

      <Modal
        show={showPreviewTimeModal}
        onHide={() => setShowPreviewTimeModal(false)}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Preview a time
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="preview-timezone-modal-contents">
            <TimePicker
              label="Choose a time"
              value={previewTime}
              minutesStep={5}
              renderInput={(props) => <TextField {...props} type="time"/>}
              onChange={handlePreviewTimeChange}
            />
            <TimezonePicker changeTimezone={handlePreviewTimezoneChange} defaultTimezone={previewTimezone}/>
          <div className="modal-bottom-buttons">
            <ThemeButton onClick={() => handleShowTimePreviews(false)}>Hide Previews</ThemeButton>
            <ThemeButton onClick={() => handleShowTimePreviews(true)}>Show Previews</ThemeButton>
          </div>
        </div>
        </Modal.Body>
      </Modal>

      <Thermometer smallestF={-20} largestF={120}/>
    </>
  )
}

export default Clocks;