import { useEffect, useState, useRef, useMemo } from 'react';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';

import { FC } from 'react';
import { TimezoneOption, allTimezones } from '../../data';

const SCROLL_OFFSET = 3; 
interface ITimezonePicker {
  changeTimezone: (tz: TimezoneOption) => void;
  defaultTimezone: TimezoneOption;
}

const TimezonePicker: FC<ITimezonePicker> = ({changeTimezone, defaultTimezone}) => {

  const formatTimezoneLabel = (zone: TimezoneOption): string => {
    return `(GMT ${zone.utc}) ${zone.label}`;
  }

  const handleSelectTimezone = (tz: TimezoneOption, idx: number) => {
    setTimezone(tz); // local label 
    changeTimezone(tz); // fire method passed in
    setIsOpen(false);
  }

  const [focused, setFocused] = useState(0);
  const [prevFocused, setPrevFocused] = useState(0);
  const [userInput, setUserInput] = useState(formatTimezoneLabel(defaultTimezone));
  const [timezone, setTimezone] = useState(defaultTimezone);
  const [isOpen, setIsOpen] = useState(false);
  const [filteredTimezones, setFilteredTimezones] = useState(allTimezones);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const renderTimezoneList = useMemo(() => Object.values(filteredTimezones).map((zone, idx) => {
    const focusedItem = idx === focused;
    return (
      <MenuItem
        key={`tz-${zone.label}-${idx}`}
        value={formatTimezoneLabel(zone)}
        className={`timezone-picker-list-item ${focusedItem ? 'timezone-picker-list-item-focused' : ''}`}
        onMouseDown={() => { handleSelectTimezone(zone, idx); }}
      >
        {formatTimezoneLabel(zone)}
      </MenuItem>
    )
  }), []);

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

  const handleInputChange = (e: any) => {
    setUserInput(e.target.value as string);
  }

  const scrollToIndex = (idx: number) => {
    const index = Math.max(0, idx - SCROLL_OFFSET);
    if (listRef.current) {
      listRef.current.scrollTop = (listRef.current.children[index] as HTMLLIElement)?.offsetTop;
    }
  }

  return (
    <div>
    <FormControl fullWidth>
        <InputLabel id="time-zone-input">Time zone</InputLabel>
        <Select
          data-testid={"timezone-picker"}
          aria-label='choose timezone'
          label="Timezone"
          value={userInput}
          size={"small"}
          onChange={handleInputChange} 
          //onBlur={handleInputBlur} 
          variant="outlined"
        >
          {
          renderTimezoneList
          }
        </Select>
        </FormControl>
    </div>
  );
}

export default TimezonePicker;