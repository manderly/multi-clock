import { useState, FC } from 'react';
import ClockDisplay from '../../components/ClockDisplay/ClockDisplay';
import CounterButton from '../../components/CounterButton/CounterButton';
import { defaultTimeZones } from '../../data';

const Clocks: FC = () => {

  const [count, setCount] = useState(0);
  const increaseCount = () => {
    setCount(count+1);
  }

  return (
    <>
      <div className="clocks-row-container">
        {
        defaultTimeZones.map((tz, idx) => (
          <ClockDisplay key={`clock-display-${idx}`} defaultTimeZone={tz}/>))
        }
      </div>
      <CounterButton label="Increase Counter" onClickMethod={increaseCount}/>
      <span>{count}</span>
    </>
  )
}

export default Clocks;