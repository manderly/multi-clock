import { FC, CSSProperties, useState, useEffect, useContext } from 'react';
import Select from 'react-select';
import { TimezoneOption, GroupedOption, groupedOptions } from '../../data';
import { SettingsContext } from '../../contexts/SettingsContext';
import { utcToZonedTime } from 'date-fns-tz';
import useFormatDate from '../../hooks/useFormatDate';
import { Button } from 'react-bootstrap';
interface IClockDisplay {
  defaultTimeZone: TimezoneOption;
}

const getNow = (timeZone: TimezoneOption) => {
  const date = new Date();
  const now = utcToZonedTime(date, timeZone.value);
  return now;
}

const ClockDisplay: FC<IClockDisplay> = ({ defaultTimeZone }) => {
  const { hoursPref } = useContext(SettingsContext);
  const [nickname, setNickname] = useState('');
  const [editingNickname, setEditingNickname] = useState(false);
  const [now, setNow] = useState(new Date())
  const [timeZone, setTimeZone] = useState(defaultTimeZone);

  const { formattedDate, formattedTime, timePalette } = useFormatDate(now, timeZone.value, hoursPref);

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
    //e.stopPropagation()
    if (e.key === 'Enter') {
      setEditingNickname(false);
    } else if (e.key === 'Escape') {
      setNickname('');
      setEditingNickname(false);
    } else {
      setNickname(e.target.value);
    } 
    //setNickname(e.target.value);
  }

  const handleEditingNicknameClick = (e: any) => {
    setEditingNickname(!editingNickname);
  }

  const formatGroupLabel = (data: GroupedOption) => (
    <div style={groupBadgeStyles}>
      <span>{data.label}</span>
      <span style={groupBadgeStyles}>{data.options.length}</span>
    </div>
  );

  // could move to context 
  useEffect(() => {
    setNow(getNow(timeZone));
    const interval = setInterval(() => {
      setNow(getNow(timeZone));
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [timeZone]);

    return (
      <div className={`clock-container bg-${timePalette}`}>

        {editingNickname ? 
          <input type="text" value={nickname} onKeyPress={handleNicknameKeyPress} onChange={handleNicknameChange}/>
          : 
          nickname === '' ? 
            <Button type='button' size="sm" variant="link" className="name-clock-link" onClick={handleEditingNicknameClick}>Name clock...</Button>
            : <Button type='button' size="sm" variant="link" className="name-clock-link" onClick={handleEditingNicknameClick}>{nickname}</Button>
        }

        <Select<TimezoneOption, false, GroupedOption>
          defaultValue={defaultTimeZone}
          options={groupedOptions}
          formatGroupLabel={formatGroupLabel}
          onChange={handleChange}
          value={timeZone}
        />
        <div className="time-col-container">
          <div className="timestamp time-item">{formattedDate}</div> 
          <div className="timestamp time-item time-stamp-display">{formattedTime}</div>
        </div>

      </div>
    )
}

export default ClockDisplay;