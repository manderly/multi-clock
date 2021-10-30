import React, { CSSProperties, useState } from 'react';
import { getTimezoneOffset } from 'date-fns-tz'
import Select from 'react-select';
import { NorthAmerica, Europe, TimezoneOption, GroupedOption, groupedOptions } from './data';

const ClockDisplay: React.FC = () => {
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

  const [timeZone, setTimeZone] = useState();
  
  const formatGroupLabel = (data: GroupedOption) => (
    <div style={groupBadgeStyles}>
      <span>{data.label}</span>
      <span style={groupBadgeStyles}>{data.options.length}</span>
    </div>
  );

    return (
      <div className="blue-border clock-container">
        <Select<TimezoneOption, false, GroupedOption>
          defaultValue={NorthAmerica[1]}
          options={groupedOptions}
          formatGroupLabel={formatGroupLabel}/>
      </div>
    )
}

export default ClockDisplay;