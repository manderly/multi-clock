import { useEffect, useState } from 'react';
import enUS from 'date-fns/locale/en-US';
import { format } from 'date-fns-tz';

const useFormatDate = (date: Date, timeZone: string, hoursPref: number) => {
  const dateFormat = 'PPPP';
  const timeFormat = hoursPref === 12 ? 'h:mm:ssaaa' : 'H:mm:ss';

  const [formattedDate, setFormattedDate] = useState('');
  const [formattedTime, setFormattedTime] = useState(''); 

  const [locale] = useState(enUS);

  const makeDate = (timeProp: Date, formatProp: string) => {
    return format(timeProp, formatProp, {timeZone: timeZone, locale: locale})
  }

  useEffect(() => {
    setFormattedDate(makeDate(date, dateFormat))  // make the date part
    setFormattedTime(makeDate(date, timeFormat))  // make the time part
  }, [date]);

  return {
    formattedDate,
    formattedTime
  }
}

export default useFormatDate;