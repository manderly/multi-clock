import { FC, CSSProperties, useState, useEffect, ChangeEvent } from 'react';
import { format, utcToZonedTime, getTimezoneOffset } from 'date-fns-tz'
import Select from 'react-select';
import { NorthAmerica, Europe, TimezoneOption, GroupedOption, groupedOptions } from '../../data';
import enUS from 'date-fns/locale/en-US';
import enGB from 'date-fns/locale/en-GB';
import { daysToWeeks } from 'date-fns';
interface IClockDisplay {
  defaultTimeZone: TimezoneOption;
}

const ClockDisplay: FC<IClockDisplay> = ({ defaultTimeZone }) => {
  const dateFormat = 'PPPP';
  const timeFormat = 'h:mm:ssaaa';

  const makeDate = (timeProp: Date, formatProp: string) => {
    return format(timeProp, formatProp, {timeZone: timeZone.value, locale: locale})
  }

  const getNow = () => {
    const date = new Date();
    const now = utcToZonedTime(date, timeZone.value);

    return now;
  }

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

  const [timeZone, setTimeZone] = useState(defaultTimeZone);
  const [locale, setLocale] = useState(enUS);
  const [currentDate, setCurrentDate] = useState(makeDate(getNow(), dateFormat));
  const [currentTime, setCurrentTime] = useState(makeDate(getNow(), timeFormat));

  const handleChange = (option: any) => {
    setTimeZone(option);
  }

  const formatGroupLabel = (data: GroupedOption) => (
    <div style={groupBadgeStyles}>
      <span>{data.label}</span>
      <span style={groupBadgeStyles}>{data.options.length}</span>
    </div>
  );

  useEffect(() => {
    const interval = setInterval(() => {
      let now = getNow();
      
      setCurrentDate(
        makeDate(now, dateFormat)
      )
      setCurrentTime(
        makeDate(now, timeFormat)
      )
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [timeZone]);

    return (
      <div className="blue-border clock-container">
        <Select<TimezoneOption, false, GroupedOption>
          defaultValue={defaultTimeZone}
          options={groupedOptions}
          formatGroupLabel={formatGroupLabel}
          onChange={handleChange}
          value={timeZone}
        />
        <div className="time-col-container">
            <div className="timestamp time-item">{currentDate}</div> 
            <div className="timestamp time-item">{currentTime}</div>
          </div>
      </div>
    )
}

export default ClockDisplay;