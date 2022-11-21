import { FC, CSSProperties, useState, useEffect, useContext, useRef } from 'react';

import { TimezoneOption } from '../../data';

import { useFormatDate } from '../../hooks/useFormatDate';
import { Button } from 'react-bootstrap';

import { SettingsContext } from '../../contexts/SettingsContext';
import { TimeContext } from '../../contexts/TimeContext';
import TimezonePicker  from '../../components/TimezonePicker/TimezonePicker';

import { Modal } from '../../components';
import { ThemeButton } from '../../components';

import ClearIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';

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
  showPreviewTime: boolean;
  handleTogglePreviewTime: () => void,
  handleRemoveClock: (e: any) => void,
}

const ClockSingle: FC<IClockSingle> = ({ name, uniqueID, clockTimezone, userTimezone, showPreviewTime, handleTogglePreviewTime, handleRemoveClock }) => {

  const { hoursPref, showOtherSecondsPref } = useContext(SettingsContext);
  const { now, previewTime, previewTimezone} = useContext(TimeContext);

  const [nickname, setNickname] = useState(name);
  const [editingNickname, setEditingNickname] = useState(false);
  const [timezone, setTimezone] = useState(clockTimezone);
  const [offset, setOffset] = useState('');
  const [showClockSettingsModal, setShowClockSettingsModal] = useState(false);

  const previewTimeAsDate = new Date(previewTime);
  previewTimeAsDate.setSeconds(0);

  // makes the "main" clock, the one that shows right now in that time zone
  const { formattedDateHeader, formattedDateClock, formattedTime, meridiem, formattedPreviewTime, timezoneAdjustedPreviewTime, timePalette } = useFormatDate(now, timezone.value, hoursPref, showOtherSecondsPref, previewTimeAsDate);

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
    const sign = parsedUserTimezoneUTCOffset > parsedClockTimezoneUTCOffset ? '-' : '+' 
    return `${sign}${diff} hr${diff > 1 ? 's' : ''}`;
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
          parsed[indexToEdit].name = nickname;
          localStorage.setItem("clocks", JSON.stringify(parsed));
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

  const clockTimePaletteStyles: CSSProperties = {
    backgroundColor: timePalette.bg,
    color: timePalette.text,
    borderColor: timePalette.text,
  };

  const handleNicknameChange = (e: any) => {
    setNickname(e.target.value as string);
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

  const handleClearNicknameClick = (e: any) => {
    // clear nickname, use timezone label
    setNickname(clockTimezone.label);
  }

  const handleEditingNicknameClick = (e: any) => {
    setEditingNickname(!editingNickname);
  }

  const handleEditingNicknameBlur = (e: any) => {
    setEditingNickname(!editingNickname);
  }

  const handleTimezoneChange = (option: any) => {
    setTimezone(option);
  }

  const meridiemValue = hoursPref === 12 ? meridiem : '';

  const bigTime = showPreviewTime ? timezoneAdjustedPreviewTime : formattedTime;
  return (
    <>
      <div className='clock-container' style={clockTimePaletteStyles}>
        <Nickname text={nickname} onClick={() => setShowClockSettingsModal(true)} styles={clockTimePaletteStyles}/>
        <Timezone text={timezone.label} onClick={() => setShowClockSettingsModal(true)} styles={clockTimePaletteStyles}/>
        <TimeOfDay time={bigTime} meridiem={meridiemValue} onClick={() => setShowClockSettingsModal(true)} styles={clockTimePaletteStyles}/>
        <div className='clock-extra-info-container' onClick={handleTogglePreviewTime}>
          {!showPreviewTime && <DateDisplay date={formattedDateClock} offset={offset} />}
          {showPreviewTime && <PreviewTime previewTime={formattedPreviewTime} previewTimezoneLabel={previewTimezone.label} timezoneAdjustedPreviewTime={timezoneAdjustedPreviewTime}/>}
        </div>
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
    
      <label className="modal-label">Nickname</label>
      <div className="modal-line">
      {editingNickname ? 
            <input ref={nicknameRef} type="text" aria-label="nickname clock" value={nickname} onKeyDown={handleNicknameKeyDown} onChange={handleNicknameChange} onBlur={handleEditingNicknameBlur}/>
            : 
            <div className="edit-clock-name-row">

              <div>
                <Button type='button' variant="link" className="nickname-button" onClick={handleEditingNicknameClick}>{nickname === '' ? `${timezone.label}` : `${nickname}`}</Button>
              </div>

              <div className="edit-clock-name-buttons">
                <ThemeButton type='button' size="sm" aria-label="clear nickname" onClick={handleClearNicknameClick}><ClearIcon/></ThemeButton>
                <ThemeButton type='button' size="sm" aria-label="edit nickname" onClick={handleEditingNicknameClick}><EditIcon/></ThemeButton>
              </div>

            </div>
          }
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

