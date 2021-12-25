import { useEffect, useState, useRef } from 'react';
import FormControl from 'react-bootstrap/FormControl';
import { FC } from 'react';
import { TimezoneOption, allTimezones } from '../../data';

const SCROLL_OFFSET = 3; 
interface ITimezonePicker {
  changeTimezone: (tz: TimezoneOption) => void;
  defaultTimezone: TimezoneOption;
}

const TimezonePicker: FC<ITimezonePicker> = ({changeTimezone, defaultTimezone}) => {
  const [focused, setFocused] = useState(0);
  const [prevFocused, setPrevFocused] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [timezone, setTimezone] = useState(defaultTimezone);
  const [isOpen, setIsOpen] = useState(false);
  const [filteredTimezones, setFilteredTimezones] = useState(allTimezones);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const listRef = useRef<HTMLUListElement>(null);

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
      const updatedTimezones = allTimezones.filter((tz) => {
        return tz.label.toLowerCase().includes(userInput.toLowerCase());
      });
      setFilteredTimezones(updatedTimezones);
    } else {
      setFilteredTimezones(allTimezones);
    }
  }, [userInput])

  useEffect(() => {
    // when the passed-in "default timezone" changes, update local timezone
    setTimezone(defaultTimezone);
  }, [defaultTimezone])

  useEffect(() => {
    // timezone changed, recalculate focused index"
    let trueFocusIdx = calculateFocused();
    setFocused(trueFocusIdx);
    setPrevFocused(trueFocusIdx);
  }, [timezone])

  const handleSelectTimezone = (tz: TimezoneOption, idx: number) => {
    setTimezone(tz); // local label 
    changeTimezone(tz); // fire method passed in
    setIsOpen(false);
  }

  useEffect(() => {
    if (isOpen) {
      scrollToIndex(focused);
    }
  }, [isOpen])

  const calculateFocused = (): number => {
    // determine the selected timezone's index in the complete list of timezones
    let trueIdx = 0;
    allTimezones.map((tz, idx) => {
      if (tz.value === timezone.value) {
        trueIdx = idx;
      }
    })
    return trueIdx;
  }

  const handleFocus = (e: any) => {
    setIsOpen(true);
    setUserInput('');
  }

  const handleInputChange = (e: any) => {
    setUserInput(e.target.value as string);
  }

  const handleInputBlur = () => {
    setUserInput('');
    setFocused(prevFocused); // reset list scrolling to match current timezone's idx
    setIsOpen(false);
  }

  const scrollToIndex = (idx: number) => {
    const index = Math.max(0, idx - SCROLL_OFFSET);
    if (listRef.current) {
      listRef.current.scrollTop = (listRef.current.children[index] as HTMLLIElement)?.offsetTop;
    }
  }

  const handleKeyDown = (e: any) => {
    if (e.key === 'Enter') {
      if (isOpen) {
        handleSelectTimezone(filteredTimezones[focused], focused);
        setUserInput('');
      } else {
        // handles case where field is already focused and 'enter' should reopen the list 
        setIsOpen(true);
      }
    } else if (e.keyCode === 40) {
      // down
      e.preventDefault();
      let newFocusedIdx = 0;
      if (userInput === '') {
        newFocusedIdx = focused === allTimezones.length - 1 ? allTimezones.length - 1 : focused + 1;
      } else {
        newFocusedIdx = focused === filteredTimezones.length - 1 ? filteredTimezones.length - 1 : focused + 1;
      }
      setFocused(newFocusedIdx);
      scrollToIndex(newFocusedIdx);
    } else if (e.keyCode === 38) {
      // up
      e.preventDefault();
      let newFocusedIdx = 0;
      if (userInput === '') {
        newFocusedIdx = focused === 0 ? 0 : focused - 1;
      } else {
        newFocusedIdx = focused === 0 ? 0 : focused - 1;
      }
      setFocused(newFocusedIdx);
      scrollToIndex(newFocusedIdx);
      
      //console.log("Focused: " + filteredTimezones[newFocusedIdx].label);
    } else if (e.keyCode === 27) {
      //console.log("esc (27), do not change selected timezone");
      setIsOpen(false);
    } else {
      setUserInput(e.target.value);
      setFocused(0);
      scrollToIndex(0);
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