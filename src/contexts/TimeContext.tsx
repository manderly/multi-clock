import { FC, createContext, useEffect, useState, useMemo, useCallback } from 'react';

const DEFAULT_PREVIEW_TIME = new Date();
DEFAULT_PREVIEW_TIME.setMinutes(30);
DEFAULT_PREVIEW_TIME.setHours(7);

interface ITimeContext {
  now: Date;
  previewTime: Date;
  handlePreviewTimeChange: (e: Date | null) => void;
}

export const TimeContext = createContext<ITimeContext>({
  now: new Date(),
  previewTime: DEFAULT_PREVIEW_TIME,
  handlePreviewTimeChange: () => null,
});

const TimeProvider: FC = ({children}) => {
  const [now, setNow] = useState<Date>(new Date());
  const [previewTime, setPreviewTime] = useState<Date>(DEFAULT_PREVIEW_TIME);

  const handlePreviewTimeChange = useCallback((e: Date | null) => {
    e !== null && setPreviewTime(e);
  }, []);

  useEffect(() => {
    setNow(new Date());
    const interval = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  // use useMemo and useCallback to prevent excessive re-render 
  const value = useMemo(() => ({
    now, previewTime, handlePreviewTimeChange
  }), [now, previewTime, handlePreviewTimeChange]);

  return (
    <TimeContext.Provider value={value}>
      {children}
    </TimeContext.Provider>);
}

export default TimeProvider;