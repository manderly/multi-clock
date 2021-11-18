import { useEffect, useState } from 'react';
import enUS from 'date-fns/locale/en-US';
import { format } from 'date-fns-tz';
import { utcToZonedTime } from 'date-fns-tz';
import { colorPalette } from './backgroundColors';

const getNow = (now: Date, timeZone: string) => {
  return utcToZonedTime(now, timeZone);
}

export const getMinuteOfDay = (date: Date): number => {
  const hours = parseInt(format(date, 'H'));
  const minutes = parseInt(format(date, 'm'));
  return (hours*60)+minutes;
}

const getDayPeriodHexValue = (minOfDay: number): string => {
  // minOfDay: every day consists of 1440 minutes
  // map the current "minute of the day" to a percentage, ie: "what percentage of the day is completed?" 
  // example: 6am is 25%, a quarter of the day has been completed by 6am
  let percentOfDay = (minOfDay/1440);
  // find the corresponding index in the palette array (the palette array is much shorter than 1440 so use percentages)
  let idx = Math.floor(colorPalette.length*percentOfDay);
  return colorPalette[idx];
}

export const useFormatDate = (date: Date, timeZone: string, hoursPref: number, showSecondsPref: boolean) => {
  // still in user's local time here
  const dateFormat = 'PPPP';
  const timeFormat = hoursPref === 12 ? `h:mm${showSecondsPref ? ':ss' :''} aaa` : `H:mm${showSecondsPref ? ':ss' : ''}`;

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
    const minuteOfDay = getMinuteOfDay(convertedDate);
    setTimePalette(getDayPeriodHexValue(minuteOfDay));
  }, [date, timeZone]);

  return {
    formattedDate,
    formattedTime,
    timePalette
  }
}
