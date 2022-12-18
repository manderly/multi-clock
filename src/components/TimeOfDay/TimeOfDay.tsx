import { FC, CSSProperties } from 'react';
interface ITimeOfDay {
  time: string;
  meridiem: string;
  onClick?: () => void;
  styles: CSSProperties;
}

const TimeOfDay: FC<ITimeOfDay> = ({ time, meridiem, onClick, styles }) => {
  return <div 
        style={styles}
        className="clock-time-container timezone-select-button"
        aria-label="clock timestamp"
        onClick={onClick}
        >
          <div className="flexRow alignEnd clickable">
            <div aria-label="time" className="timestamp time-item time-stamp-display">{time}</div>
            <div className="meridiem">{meridiem}</div>
          </div>
      </div>

}

export default TimeOfDay;