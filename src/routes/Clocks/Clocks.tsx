import { FC } from 'react';
import ClockDisplay from '../../components/ClockDisplay/ClockDisplay';
import { defaultTimeZones } from '../../data';

const Clocks: FC = () => {

  return (
    <>
      <div className="clocks-row-container">
        {
        defaultTimeZones.map((tz, idx) => (
          <ClockDisplay key={`clock-display-${idx}`} defaultTimeZone={tz}/>))
        }
      </div>
    </>
  )
}

export default Clocks;