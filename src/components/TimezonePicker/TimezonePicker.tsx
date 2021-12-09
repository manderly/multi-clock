import { useEffect, useState, useRef } from 'react';
import FormControl from 'react-bootstrap/FormControl';
import { FC } from 'react';
import { listTimeZones, findTimeZone } from 'timezone-support';
import { TimezoneOption, allTimezones } from '../../data';

interface ITimezonePicker {
  changeTimezone: (tz: TimezoneOption) => void;
  defaultTimezone: TimezoneOption;
}

const TimezonePicker: FC<ITimezonePicker> = ({changeTimezone, defaultTimezone}) => {
  const [userInput, setUserInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [timezone, setTimezone] = useState(defaultTimezone);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleSelectTimezone = (tz: TimezoneOption) => {
    changeTimezone(tz);
    setUserInput(tz.label);
  }

  const timezones = Object.values(allTimezones).map((zone, idx) => {
    return (
      <li 
        key={`tz-${zone.label}-${idx}`}
        className="timezone-picker-list-item"
        onMouseDown={() => { handleSelectTimezone(zone); }}
      >
        {`(GMT ${zone.utc}) ${zone.label}`}
      </li>
    )
  })

  useEffect(() => {
    console.log("Searching for: " + userInput);
    const timeZones = listTimeZones();
    //console.log(timeZones);
  }, [userInput])

  useEffect(() => {
    if (inputRef && inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleFocus = (e: any) => {
    setIsOpen(true);
  }

  const handleInputChange = (e: any) => {
    setUserInput(e.target.value as string);
  }

  const handleInputBlur = () => {
    setIsOpen(false);
  }

  const handleKeyPress = (e: any) => {
    if (e.key === 'Enter') {
      //setEditingNickname(false);
    } else if (e.key === 'Escape') {
      //setNickname('');
      //setEditingNickname(false);
    } else {
      setUserInput(e.target.value);
    } 
  }

  return (
    <>
    <FormControl 
      ref={inputRef} 
      type="text" 
      value={userInput} 
      onFocus={handleFocus}
      onKeyPress={handleKeyPress} 
      onChange={handleInputChange} 
      onBlur={handleInputBlur} 
      placeholder={timezone.label}
    />
    {isOpen && (
      <ul className='timezone-picker-list'>
        {timezones}
      </ul>
    )}
    </>
  );
}

export default TimezonePicker;