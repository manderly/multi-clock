import React, { CSSProperties, useState, useEffect } from 'react';
import { format, utcToZonedTime, getTimezoneOffset } from 'date-fns-tz'
import Select from 'react-select';
import { NorthAmerica, Europe, TimezoneOption, GroupedOption, groupedOptions } from '../../data';
import enUS from 'date-fns/locale/en-US';
import enGB from 'date-fns/locale/en-GB';
interface IClockDisplay {
  defaultTimeZone:TimezoneOption;
}

const ClockDisplay: React.FC<IClockDisplay> = ({ defaultTimeZone }) => {

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
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleString());

  const formatGroupLabel = (data: GroupedOption) => (
    <div style={groupBadgeStyles}>
      <span>{data.label}</span>
      <span style={groupBadgeStyles}>{data.options.length}</span>
    </div>
  );

  const dateFormat = 'MM/dd/yyyy HH:mm:ss zzz';

  useEffect(() => {
    let date = new Date();
    let now = utcToZonedTime(date, 'America/New_York');

    const interval = setInterval(() => setCurrentTime(
      format(now, dateFormat, {timeZone: timeZone.value, locale: locale})), 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

    return (
      <div className="blue-border clock-container">
        <Select<TimezoneOption, false, GroupedOption>
          defaultValue={defaultTimeZone}
          options={groupedOptions}
          formatGroupLabel={formatGroupLabel}/>
          <span>{currentTime}</span>
      </div>
    )
}

export default ClockDisplay;