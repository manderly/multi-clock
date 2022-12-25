import { FC, CSSProperties, useState, useEffect, useContext, useRef } from 'react';

import { TimezoneOption } from '../../data';

import { useFormatDate } from '../../hooks/useFormatDate';
import { Button } from 'react-bootstrap';

import { SettingsContext } from '../../contexts/SettingsContext';
import { TimeContext } from '../../contexts/TimeContext';
import TimezonePicker  from '../../components/TimezonePicker/TimezonePicker';

import { Modal } from '../../components';
import TextField from '@mui/material/TextField';

import Nickname from './components/Nickname';
import Timezone from './components/Timezone';
import TimeOfDay from '../../components/TimeOfDay/TimeOfDay';
import DateDisplay from './components/DateDisplay';
import PreviewTime from './components/PreviewTime';

interface IClockSingle {
  name: string,
  uniqueID: number,
  clockTimezone: TimezoneOption,
  userTimezone: TimezoneOption,
  showPreviewTimeGlobal: boolean;
  handleRemoveClock: (e: any) => void,
}

const ClockSingle: FC<IClockSingle> = ({ name, uniqueID, clockTimezone, userTimezone, showPreviewTimeGlobal, handleRemoveClock }) => {

  const randomPlaceholders = ["Chicago, IL", "San Diego, CA", "Anchorage, AK", "Seattle, WA", "West Coast team", "Friends", "Family", "Colleagues", "Seattle Team", "Europe Team", "East Coast team", "Home"];

  const { hoursPref, showOtherSecondsPref } = useContext(SettingsContext);
  const { now, previewTime, previewTimezone} = useContext(TimeContext);

  const [nickname, setNickname] = useState(name);
  const [editingNickname, setEditingNickname] = useState(false);
  const [timezone, setTimezone] = useState(clockTimezone);
  const [offset, setOffset] = useState('');
  const [showClockSettingsModal, setShowClockSettingsModal] = useState(false);
  const [randomNicknamePlaceholder, setRandomNicknamePlaceholder] = useState(randomPlaceholders[1]);

  const [showPreviewTimeLocal, setShowPreviewTimeLocal] = useState(showPreviewTimeGlobal);

  useEffect(() => {
    setShowPreviewTimeLocal(showPreviewTimeGlobal);
  }, [showPreviewTimeGlobal])

  const previewTimeAsDate = new Date(previewTime);
  previewTimeAsDate.setSeconds(0);

  // makes the "main" clock, the one that shows right now in that time zone
  const {
    formattedDateClock,
    formattedTime,
    meridiem,
    formattedPreviewTime,
    formattedPreviewMeridiem,
    timezoneAdjustedPreviewTime,
    timezoneAdjustedPreviewTimeMeridiem,
    timePalette } = useFormatDate(now, timezone.value, hoursPref, showOtherSecondsPref, previewTimeAsDate);

  const nicknameRef = useRef<HTMLInputElement | null>(null);

  const calculateOffset = (userTimezone: TimezoneOption) => {
    const userTimezoneParts = userTimezone.utc.split(':');
    const parsedUserTimezoneUTCOffset = parseInt(userTimezoneParts[0]);

    const clockTimezoneParts = timezone.utc.split(':');
    const parsedClockTimezoneUTCOffset = parseInt(clockTimezoneParts[0]);

    let diff = 0;
    if (parsedUserTimezoneUTCOffset > parsedClockTimezoneUTCOffset) {
      // user is "west" of clock's timezone
      diff = parsedUserTimezoneUTCOffset - parsedClockTimezoneUTCOffset;
    } else {
      // user is "east" of clock's timezone
      diff = parsedClockTimezoneUTCOffset - parsedUserTimezoneUTCOffset;
    }

    if (diff === 0) {
      return '';
    } else {
      const sign = parsedUserTimezoneUTCOffset > parsedClockTimezoneUTCOffset ? '-' : '+';
      return `${sign}${diff} hr${diff > 1 ? 's' : ''}`;
    }
  }

  useEffect(() => {
    setOffset(calculateOffset(userTimezone));
  }, [userTimezone])

  useEffect(() => {
    if (nickname) {
      try {
        const saved = localStorage.getItem("clocks") as string;
        if (saved) {
          const parsed = JSON.parse(saved);
          const indexToEdit = parsed.findIndex((clock: any) => clock.uniqueID === uniqueID);
          if (indexToEdit >= 0) {
            parsed[indexToEdit].name = nickname;
            localStorage.setItem("clocks", JSON.stringify(parsed));
          }
        }
      } catch(e) {
        console.log(e);
      }
    }
  }, [nickname]);

  useEffect(() => {
    if (timezone) {
      try {
        const saved = localStorage.getItem("clocks") as string;
        if (saved) {
          const parsed = JSON.parse(saved);
          const indexToEdit = parsed.findIndex((clock: any) => clock.uniqueID === uniqueID);

          if (~indexToEdit) {
            parsed[indexToEdit].timezone = timezone;
            localStorage.setItem("clocks", JSON.stringify(parsed));
          }
        }
      } catch(e) {
        console.log(e);
      }
    }
  }, [timezone]);

  // "Rainbow clock" palette is separate from app-wide styles found in themes.ts
  const clockTimePaletteStyles: CSSProperties = {
    backgroundColor: timePalette.bg,
    color: timePalette.text,
    borderColor: timePalette.text,
  };

  const handleNicknameChange = (e: any) => {
    setNickname(e.target.value as string);

    // so we get a different nickname every time the user clears the field
    if (nickname.length === 0) {
      const randIdx = Math.floor(Math.random()*randomPlaceholders.length);
      setRandomNicknamePlaceholder(randomPlaceholders[randIdx]);
    }
  }

  const handleNicknameKeyDown = (e: any) => {
    if (e.key === 'Enter') {
      setEditingNickname(false);
    } else if (e.key === 'Escape') {
      setNickname(e.target.value);
      setEditingNickname(false);
    } else {
      setNickname(e.target.value);
    } 
  }

  useEffect(() => {
    if (nicknameRef && nicknameRef.current) {
      nicknameRef.current.focus();
    }
  }, [editingNickname]);

  const handleEditingNicknameBlur = (e: any) => {
    if (nickname.length === 0) {
      setNickname(clockTimezone.label);
    }
  }

  const handleTimezoneChange = (option: any) => {
    setTimezone(option);
  }

  const handleTogglePreviewTime = () => {
    setShowPreviewTimeLocal(!showPreviewTimeLocal);
  }

  const meridiemValue = hoursPref === 12 ? meridiem : '';

  const bigTime = showPreviewTimeLocal ? timezoneAdjustedPreviewTime : formattedTime;
  return (
    <>
      <div className='clock-container' data-testid={'single-clock'} style={clockTimePaletteStyles}>
        <Nickname text={nickname} onClick={() => setShowClockSettingsModal(true)} styles={clockTimePaletteStyles}/>
        <TimeOfDay time={bigTime} meridiem={meridiemValue} onClick={() => setShowClockSettingsModal(true)} styles={clockTimePaletteStyles}/>
        <div className='clock-extra-info-container' data-testid={'toggle-preview-time'} onClick={handleTogglePreviewTime}>
          {!showPreviewTimeLocal && <DateDisplay date={formattedDateClock} offset={offset} />}
          {showPreviewTimeLocal && <PreviewTime
              previewTime={formattedPreviewTime}
              previewMeridiem={formattedPreviewMeridiem}
              previewTimezoneLabel={previewTimezone.label}
              timezoneAdjustedPreviewTime={timezoneAdjustedPreviewTime}
              timezoneAdjustedPreviewTimeMeridiem={timezoneAdjustedPreviewTimeMeridiem}
          />}
        </div>
        <Timezone text={timezone.label} onClick={() => setShowClockSettingsModal(true)} styles={clockTimePaletteStyles}/>
      </div>

      <Modal
        show={showClockSettingsModal}
        onHide={() => setShowClockSettingsModal(false)}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
      <Modal.Header closeButton>
        <Modal.Title id="example-custom-modal-styling-title">
          Manage clock
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>

      <div className="edit-clock-name-row">
        <TextField
            id="outlined-basic"
            label="Clock nickname"
            variant="outlined"
            onKeyDown={handleNicknameKeyDown}
            onChange={handleNicknameChange}
            onBlur={handleEditingNicknameBlur}
            placeholder={randomNicknamePlaceholder}
            value={nickname}/>
        </div>
      
        <div className="modal-line">
          <TimezonePicker changeTimezone={handleTimezoneChange} defaultTimezone={clockTimezone}/>
          <br/>
          <div className="delete-clock-div">
            <Button size="sm" variant="link" aria-label="delete clock button" onClick={handleRemoveClock}>Delete clock</Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
    </>
  )
}

export default ClockSingle;

