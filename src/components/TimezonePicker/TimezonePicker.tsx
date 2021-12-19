import { useEffect, useState, useRef } from 'react';
import FormControl from 'react-bootstrap/FormControl';
import { FC } from 'react';
import { TimezoneOption, allTimezones, usTimeZones } from '../../data';
import { keyBy } from 'lodash';
import { findDOMNode } from 'react-dom';

interface ITimezonePicker {
  changeTimezone: (tz: TimezoneOption) => void;
  defaultTimezone: TimezoneOption;
}

const TimezonePicker: FC<ITimezonePicker> = ({changeTimezone, defaultTimezone}) => {
  const [focused, setFocused] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [timezone, setTimezone] = useState(defaultTimezone);
  const [isOpen, setIsOpen] = useState(false);
  const [filteredTimezones, setFilteredTimezones] = useState(allTimezones);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const handleSelectTimezone = (tz: TimezoneOption, idx: number) => {
    setTimezone(tz); // local
    changeTimezone(tz); // fire method passed in 
    setUserInput(tz.label);
    setFocused(idx);
  }

  const renderTimezoneList = Object.values(filteredTimezones).map((zone, idx) => {
    const focusedItem = idx === focused;
    return (
      <li 
        key={`tz-${zone.label}-${idx}`}
        className={`timezone-picker-list-item ${focusedItem ? 'timezone-picker-list-item-focused' : ''}`}
        onMouseDown={() => { handleSelectTimezone(zone, idx); }}
      >
        {`(GMT ${zone.utc}) ${zone.label}`}
      </li>
    )
  })

  useEffect(() => {
    if (userInput) {
      // as user input changes, filter timezones 
      let updatedTimezones = allTimezones.filter((tz) => {
        return tz.label.toLowerCase().includes(userInput.toLowerCase());
      });
      setFilteredTimezones(updatedTimezones);
    } else {
      setFilteredTimezones(allTimezones);
    }
  }, [userInput])

  const handleFocus = (e: any) => {
    setIsOpen(true);
    setUserInput('');
    scrollToIndex(focused);
  }

  const handleInputChange = (e: any) => {
    setUserInput(e.target.value as string);
  }

  const handleInputBlur = () => {
    setIsOpen(false);
  }

  const scrollToIndex = (idx: number) => {
    const index = Math.max(0, idx-3);
    if (listRef.current) {
      listRef.current.scrollTop = (listRef.current.children[index] as HTMLLIElement).offsetTop;
    }
  }

  const handleKeyDown = (e: any) => {
    e.preventDefault();
    if (e.key === 'Enter') {
      setIsOpen(false);
    } else if (e.keyCode === 40) {
      // down
      let newFocusedIdx = focused === allTimezones.length - 1 ? 0 : focused + 1;
      console.log("Focused: " + filteredTimezones[focused].label);
      setFocused(newFocusedIdx);
      scrollToIndex(newFocusedIdx);
    } else if (e.keyCode === 38) {
      // up
      let newFocusedIdx = focused === 0 ? 0 : focused - 1;
      console.log("Focused: " + filteredTimezones[focused].label);
      setFocused(newFocusedIdx);
      scrollToIndex(newFocusedIdx);
    } else if (e.key === 'Enter') {
      console.log("enter (13)");
      console.log("selecting timezone: " + filteredTimezones[focused]);
      handleSelectTimezone(filteredTimezones[focused], focused);
      setIsOpen(false);
    } else if (e.keyCode === 27) {
      console.log("esc (27), do not change selected timezone");
      setIsOpen(false);
    } else {
      setUserInput(e.target.value);
    } 
  }

  return (
    <>
    <label data-testid='current timezone'>Current: {`(GMT ${timezone.utc}) ${timezone.label}`}</label>
    <FormControl
      className='timezone-input'
      aria-label='choose timezone'
      ref={inputRef} 
      type="text" 
      value={userInput} 
      onFocus={handleFocus}
      onKeyDown={handleKeyDown}
      onChange={handleInputChange} 
      onBlur={handleInputBlur} 
      placeholder='Change timezone...'
    />
    {isOpen && (
      <ul className='timezone-picker-list' aria-label='timezones' ref={listRef}>
        {renderTimezoneList}
      </ul>
    )}
    </>
  );
}

export default TimezonePicker;