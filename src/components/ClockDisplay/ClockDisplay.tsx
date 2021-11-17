import { FC, CSSProperties, useState, useEffect, useContext, useRef } from 'react';
import Select from 'react-select';
import { TimezoneOption, GroupedOption, groupedOptions } from '../../data';

import useFormatDate from '../../hooks/useFormatDate';
import { Button } from 'react-bootstrap';

import { SettingsContext } from '../../contexts/SettingsContext';
import { TimeContext } from '../../contexts/TimeContext';
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

  const { formattedDate, formattedTime, timePalette } = useFormatDate(now, timeZone.value, hoursPref, showSecondsPref);

  const nicknameRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
  }, [now]);

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
      <div className={`clock-container bg-${timePalette}`}>
        <div className="clock-top-row-container">
          
          <div className="clock-top-row-item">
          {editingNickname ? 
            <input ref={nicknameRef} type="text" value={nickname} onKeyPress={handleNicknameKeyPress} onChange={handleNicknameChange}/>
            : 
            nickname === '' ? 
              <Button type='button' size="sm" variant="link" className="name-clock-link" onClick={handleEditingNicknameClick}>Name clock...</Button>
              : <Button type='button' size="sm" variant="link" className="name-clock-link" onClick={handleEditingNicknameClick}>{nickname}</Button>
          }
          </div>

          <div className="clock-top-row-item"><Button size="sm" variant="outline" onClick={handleRemoveClock}>x</Button></div>
        </div>
        <Select<TimezoneOption, false, GroupedOption>
          defaultValue={defaultTimeZone}
          options={groupedOptions}
          formatGroupLabel={formatGroupLabel}
          onChange={handleChange}
          value={timeZone}
          className="select-timezone"
        />
        <div className="time-col-container">
          <h2 className="clock-display-date time-item" aria-label="clock date display">{formattedDate}</h2> 
          <label className="timestamp time-item time-stamp-display">{formattedTime}</label>
        </div>
      </div>
    )
}

export default ClockDisplay;