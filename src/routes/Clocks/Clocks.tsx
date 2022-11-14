import { FC, useState, useEffect, useContext } from 'react';
import Thermometer from '../../components/Thermometer/Thermometer';
import { usTimeZones, defaultTimeZones, TimezoneOption } from '../../data';
import { Modal, TimezonePicker } from '../../components';
import { ThemeButton } from '../../components';
import localStorageUtils from '../../utils/localStorage';
import { SettingsContext } from '../../contexts/SettingsContext';
import ClockDisplay from '../../components/ClockDisplay/ClockDisplay';
import TextField from '@mui/material/TextField';

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
  const [showPreviewTimeModal, setShowPreviewTimeModal] = useState(false);
  const [previewTime, setPreviewTime] = useState('07:30');
  const [previewTimeCandidate, setPreviewTimeCandidate] = useState('');
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

  // todo: remove this method, move to handleShowTimePreviews
  // goal is to make it so time doesn't update until user closes modal 
  const handlePreviewTimeChange = (e: any) => {
    setPreviewTimeCandidate(e.target.value);
  }

  const handlePreviewTimezoneChange = (tz: TimezoneOption) => {
    setPreviewTimezone(tz);
  }

  const handleShowTimePreviews = (showPreviews: boolean) => {
    // todo: ssanitize candidate value? 
    setPreviewTime(previewTimeCandidate);
    setShowPreviewTime(showPreviews);
    setShowPreviewTimeModal(false);
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
            previewTime={previewTime}
            previewTimezone={previewTimezone}
            showPreviewTime={showPreviewTime}
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
            <TextField
              id="time"
              label="Choose a time"
              type="time"
              defaultValue={previewTime}
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                step: 300, // 5 min
              }}
              sx={{ width: 150 }}
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