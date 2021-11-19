import { FC, createContext, useEffect, useState } from 'react';

interface ITimeContext {
  now: Date;
}

export const TimeContext = createContext<ITimeContext>({
  now: new Date()
});

const TimeProvider: FC = ({children}) => {
  const [now, setNow] = useState<Date>(new Date());

  useEffect(() => {
    setNow(new Date());
    const interval = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const value = {
    now
  };

  return (
    <TimeContext.Provider value={value}>
      {children}
    </TimeContext.Provider>);
}

export default TimeProvider;