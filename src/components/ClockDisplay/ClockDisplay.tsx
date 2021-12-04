import { FC, CSSProperties, useState, useEffect, useContext, useRef } from 'react';
import ReactDOM from 'react-dom';

import Select from 'react-select';

import { TimezoneOption, GroupedOption, groupedOptions } from '../../data';

import { useFormatDate } from '../../hooks/useFormatDate';
import { Button, Modal } from 'react-bootstrap';

import { SettingsContext } from '../../contexts/SettingsContext';
import { TimeContext } from '../../contexts/TimeContext';

import PublicIcon from '@mui/icons-material/Public';

//import * as $ from 'jquery';
interface IClockDisplay {
  name: string,
  uniqueID: number;
  defaultTimeZone: TimezoneOption;
  handleRemoveClock: (e: any) => void;
}

const ClockDisplay: FC<IClockDisplay> = ({ name, uniqueID, defaultTimeZone, handleRemoveClock }) => {

  const { hoursPref, showSecondsPref } = useContext(SettingsContext);
  const { now } = useContext(TimeContext);

  const [nickname, setNickname] = useState(name);
  const [editingNickname, setEditingNickname] = useState(false);
  const [timeZone, setTimeZone] = useState(defaultTimeZone);

  const [showMapModal, setShowMapModal] = useState(false);

  const { formattedDateHeader, formattedDateClock, formattedTime, timePalette } = useFormatDate(now, timeZone.value, hoursPref, showSecondsPref);

  const nicknameRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
  }, [now]);

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

  const formatGroupLabel = (data: GroupedOption) => (
    <div style={groupBadgeStyles}>
      <span>{data.label}</span>
      <span style={groupBadgeStyles}>{data.options.length}</span>
    </div>
  );

    return (
      <>
        <div className={`clock-container`} style={clockTimePaletteStyles}>
          <div className="clock-top-row-container">
            <div className="clock-top-row-item">
            {editingNickname ? 
              <input ref={nicknameRef} type="text" value={nickname} onKeyPress={handleNicknameKeyPress} onChange={handleNicknameChange}/>
              : 
              nickname === '' ? 
                <Button type='button' size="sm" variant="link" style={clockTimePaletteStyles} className="name-clock-link" onClick={handleEditingNicknameClick}>{timeZone.value} UTC {timeZone.utc}</Button>
                : <Button type='button' size="sm" variant="link" className="name-clock-link" style={clockTimePaletteStyles} onClick={handleEditingNicknameClick}>{nickname}</Button>
            }
            </div>
          </div>
        
          <div className="time-col-container">
            <label className="timestamp time-item time-stamp-display">{formattedTime}</label>
            <h2 className="clock-display-date time-item" aria-label="clock date display">{formattedDateClock}</h2>
            <div className="clock-manage-button-container">
              <Button 
                style={clockTimePaletteStyles}
                size="sm" 
                className="timezone-select-button"
                onClick={() => setShowMapModal(true)}
                >
                  UTC {timeZone.utc}<PublicIcon/>
              </Button>
            </div>
            <div className="timezone-select-menu"> 
            
          </div>
          <div className="clock-top-row-item"><Button size="sm" variant="outline" aria-label="delete clock button" onClick={handleRemoveClock}>x</Button></div>
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
            Choose timezone
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div id="attach-map-here">
              <Select<TimezoneOption, false, GroupedOption>
                defaultValue={defaultTimeZone}
                options={groupedOptions}
                formatGroupLabel={formatGroupLabel}
                onChange={handleChange}
                value={timeZone}
                className="select-timezone"
              />
            </div>
        </Modal.Body>
      </Modal>
      </>
    )
}

export default ClockDisplay;

