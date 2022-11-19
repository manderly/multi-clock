import { FC } from 'react';

interface IDateDisplay {
  date: string;
  offset: string;
}

const DateDisplay: FC<IDateDisplay> = ({ date, offset }) => {
  return <div>
    <div className="clock-display-offset small-text" aria-label="clock offset display">{offset}</div>
    <h5 className="clock-display-date time-item" aria-label="clock date display">{date}</h5>
  </div>
}

export default DateDisplay;