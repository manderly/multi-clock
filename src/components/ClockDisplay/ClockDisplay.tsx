import { FC, CSSProperties, useState, useEffect, useContext, useRef } from 'react';

import { TimezoneOption, GroupedOption, groupedOptions } from '../../data';

import { useFormatDate } from '../../hooks/useFormatDate';
import { Button, Modal } from 'react-bootstrap';

import { SettingsContext } from '../../contexts/SettingsContext';
import { TimeContext } from '../../contexts/TimeContext';
import TimezonePicker  from '../../components/TimezonePicker/TimezonePicker';

import EditIcon from '@mui/icons-material/Edit';

//import * as $ from 'jquery';
interface IClockDisplay {
  name: string,
  uniqueID: number;
  defaultTimeZone: TimezoneOption;
  handleRemoveClock: (e: any) => void;
}

const ClockDisplay: FC<IClockDisplay> = ({ name, uniqueID, defaultTimeZone, handleRemoveClock }) => {

  const { hoursPref, showOtherSecondsPref } = useContext(SettingsContext);
  const { now } = useContext(TimeContext);

  const [nickname, setNickname] = useState(name);
  const [editingNickname, setEditingNickname] = useState(false);
  const [timeZone, setTimeZone] = useState(defaultTimeZone);

  const [showMapModal, setShowMapModal] = useState(false);

  const { formattedDateClock, formattedTime, timePalette } = useFormatDate(now, timeZone.value, hoursPref, showOtherSecondsPref);

  const nicknameRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (nickname) {
      try {
        const saved = localStorage.getItem("clocks") as string;
        const parsed = JSON.parse(saved);
        const indexToEdit = parsed.findIndex((clock: any) => clock.uniqueID === uniqueID);
        parsed[indexToEdit].name = nickname;
        localStorage.setItem("clocks", JSON.stringify(parsed));
      } catch(e) {
        console.log(e);
      }
      
    }
  }, [nickname]);

  useEffect(() => {
    if (timeZone) {
      try {
        const saved = localStorage.getItem("clocks") as string;
        const parsed = JSON.parse(saved);
        const indexToEdit = parsed.findIndex((clock: any) => clock.uniqueID === uniqueID);
        parsed[indexToEdit].timezone = timeZone;
        localStorage.setItem("clocks", JSON.stringify(parsed));
      } catch(e) {
        console.log(e);
      }
    }
  }, [timeZone]);

  const clockTimePaletteStyles: CSSProperties = {
    backgroundColor: timePalette.bg,
    color: timePalette.text,
    borderColor: timePalette.text,
  };

  const groupBadgeStyles: CSSProperties = {
    backgroundColor: '#EBECF0',
    borderRadius: '2em',
    color: '#172B4D',
    display: 'inline-block',
    fontSize: 12,
    fontWeight: 'normal',
    lineHeight: '1',
    minWidth: 1,
    padding: '0.16666666666667em 0.5em',
    textAlign: 'center',
  };

  const handleChange = (option: any) => {
    setTimeZone(option);
  }

  const handleNicknameChange = (e: any) => {
    setNickname(e.target.value as string);
  }

  const handleNicknameKeyPress = (e: any) => {
    if (e.key === 'Enter') {
      setEditingNickname(false);
    } else if (e.key === 'Escape') {
      setNickname('');
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

  const handleEditingNicknameClick = (e: any) => {
    setEditingNickname(!editingNickname);
  }

  const handleEditingNicknameBlur = (e: any) => {
    setEditingNickname(!editingNickname);
  }

  const formatGroupLabel = (data: GroupedOption) => (
    <div style={groupBadgeStyles}>
      <span>{data.label}</span>
      <span style={groupBadgeStyles}>{data.options.length}</span>
    </div>
  );

  const handleTimezoneChange = (option: any) => {
    setTimeZone(option);
  }

    return (
      <>
        <div className='clock-container' style={clockTimePaletteStyles}>
          <div className="time-col-container">
            {/* Nickname box */}
            <div>
            {editingNickname ? 
              <input ref={nicknameRef} type="text" value={nickname} onKeyPress={handleNicknameKeyPress} onChange={handleNicknameChange} onBlur={handleEditingNicknameBlur} />
              : 
              <Button type='button' variant="link" size="sm" style={clockTimePaletteStyles} className="name-clock-link" onClick={handleEditingNicknameClick}>{nickname === '' ? `${timeZone.value} UTC ${timeZone.utc}` : `${nickname}`}</Button>
            }
            </div>
            
            {/* Time of day */}
            <Button 
                style={clockTimePaletteStyles}
                size="sm" 
                className="timezone-select-button"
                onClick={() => setShowMapModal(true)}
                ><label className="timestamp time-item time-stamp-display">{formattedTime}</label>
            </Button>

            {/* Date */}
            <h2 className="clock-display-date time-item" aria-label="clock date display">{formattedDateClock}</h2>

          </div>
        </div>

        <Modal
        show={showMapModal}
        onHide={() => setShowMapModal(false)}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Manage clock
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
      
        <label className="modal-label">Clock name</label>
        <div className="modal-line">
        {editingNickname ? 
              <input ref={nicknameRef} type="text" value={nickname} onKeyPress={handleNicknameKeyPress} onChange={handleNicknameChange} onBlur={handleEditingNicknameBlur}/>
              : 
              <div className="edit-clock-name-buttons">
                <Button type='button' variant="link" className="nickname-button" onClick={handleEditingNicknameClick}>{nickname === '' ? `${timeZone.value} UTC ${timeZone.utc}` : `${nickname}`}</Button>
                <Button type='button' size="sm" onClick={handleEditingNicknameClick}><EditIcon/></Button>
                
              </div>
            }
        </div>
        

          <label className="modal-label">Timezone</label>
          <div className="modal-line">
            <span>Current: {`(GMT ${defaultTimeZone.utc}) ${defaultTimeZone.label}`}</span>
            <TimezonePicker changeTimezone={handleTimezoneChange} defaultTimezone={defaultTimeZone}/>
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

export default ClockDisplay;

