import { useEffect, useState } from 'react';
import enUS from 'date-fns/locale/en-US';
import { format } from 'date-fns-tz';
import { utcToZonedTime } from 'date-fns-tz';

const getNow = (now: Date, timeZone: string) => {
  return utcToZonedTime(now, timeZone);
}

const useFormatDate = (date: Date, timeZone: string, hoursPref: number) => {
  const dateFormat = 'PPPP';
  const timeFormat = hoursPref === 12 ? 'h:mm aaa' : 'H:mm';

  const [formattedDate, setFormattedDate] = useState('');
  const [formattedTime, setFormattedTime] = useState(''); 
  const [timePalette, setTimePalette] = useState('');

  const [locale] = useState(enUS);

  const makeDate = (timeProp: Date, formatProp: string) => {
    return format(timeProp, formatProp, {locale: locale})
  }

  useEffect(() => {
    const convertedDate = getNow(date, timeZone);
    setFormattedDate(makeDate(convertedDate, dateFormat))  // make the date part
    setFormattedTime(makeDate(convertedDate, timeFormat))  // make the time part

    // set "time palette", ie: morning, afternoon, night background color
    let hourOfDay = parseInt(format(convertedDate, 'H'));

    if ((hourOfDay >= 0 && hourOfDay <= 5) || hourOfDay === 23) {
      setTimePalette('night');
    } else if (hourOfDay >= 6 && hourOfDay <= 7) {
      setTimePalette('dawn');
    } else if (hourOfDay >= 8 && hourOfDay <= 9) {
      setTimePalette('earlyMorning');
    } else if (hourOfDay >= 10 && hourOfDay <= 11) {
      setTimePalette('lateMorning');
    } else if (hourOfDay >= 12 && hourOfDay <= 14) {
      setTimePalette('afternoon'); 
    } else if (hourOfDay >= 15 && hourOfDay <= 18) {
      setTimePalette('sunset');
    } else if (hourOfDay >= 19 && hourOfDay <= 22) {
      setTimePalette('evening');
    }
  }, [date, timeZone]);

  return {
    formattedDate,
    formattedTime,
    timePalette
  }
}

export default useFormatDate;