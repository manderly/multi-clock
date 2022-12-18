import {CSSProperties, forwardRef, ForwardedRef} from 'react';

interface ITimeOfDay {
  time: string;
  meridiem: string;
  onClick?: () => void;
  styles: CSSProperties;
}

const TimeOfDay = forwardRef(({ time, meridiem, onClick, styles, ...props }: ITimeOfDay, ref: ForwardedRef<HTMLDivElement>) => {
  return <div
        {...props}
        ref={ref}
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
})

export default TimeOfDay;