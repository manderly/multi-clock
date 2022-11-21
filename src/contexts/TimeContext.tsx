import { FC, createContext, useEffect, useState, useMemo, useCallback, useContext } from 'react';
import { TimezoneOption, NorthAmerica } from '../data';
import { SettingsContext } from '../contexts/SettingsContext';

const DEFAULT_PREVIEW_TIME = new Date();
DEFAULT_PREVIEW_TIME.setMinutes(30);
DEFAULT_PREVIEW_TIME.setHours(7);
interface ITimeContext {
  now: Date;
  previewTime: Date;
  previewTimezone: TimezoneOption;
  handlePreviewTimeChange: (e: Date | null) => void;
  handlePreviewTimezoneChange: (e: TimezoneOption | null) => void;
}

export const TimeContext = createContext<ITimeContext>({
  now: new Date(),
  previewTime: DEFAULT_PREVIEW_TIME,
  previewTimezone: NorthAmerica[0],
  handlePreviewTimeChange: () => null,
  handlePreviewTimezoneChange: () => null,
});

const TimeProvider: FC = ({children}) => {
  const { userTimezone } = useContext(SettingsContext);

  const [now, setNow] = useState<Date>(new Date());
  const [previewTime, setPreviewTime] = useState<Date>(DEFAULT_PREVIEW_TIME);
  const [previewTimezone, setPreviewTimezone] = useState(userTimezone); 
  
  const handlePreviewTimeChange = useCallback((e: Date | null) => {
    e !== null && setPreviewTime(e);
  }, []);

  const handlePreviewTimezoneChange = useCallback((e: TimezoneOption | null) => {
    e !== null && setPreviewTimezone(e);
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
    now, previewTime, previewTimezone, handlePreviewTimeChange, handlePreviewTimezoneChange
  }), [now, previewTime, previewTimezone, handlePreviewTimeChange, handlePreviewTimezoneChange]);

  return (
    <TimeContext.Provider value={value}>
      {children}
    </TimeContext.Provider>);
}

export default TimeProvider;