import { useEffect, useState } from 'react';
import enUS from 'date-fns/locale/en-US';
import { format } from 'date-fns-tz';
import { utcToZonedTime } from 'date-fns-tz';
import { IHexPalette, colorPalette } from './backgroundColors';

const getNow = (now: Date, timeZone: string) => {
  return utcToZonedTime(now, timeZone);
}

export const getMinuteOfDay = (date: Date): number => {
  const hours = parseInt(format(date, 'H'));
  const minutes = parseInt(format(date, 'm'));
  return (hours*60)+minutes;
}

const paletteDefaults = {
  bg: "#ededed",
  text: "#00ff00"
}

const getDayPeriodHexValue = (minOfDay: number): IHexPalette => {
  // minOfDay: every day consists of 1440 minutes
  // map the current "minute of the day" to a percentage, ie: "what percentage of the day is completed?" 
  // example: 6am is 25%, a quarter of the day has been completed by 6am
  let percentOfDay = (minOfDay/1440);
  // find the corresponding index in the palette array (the palette array is much shorter than 1440 so use percentages)
  let idx = Math.floor(colorPalette.length*percentOfDay);
  return colorPalette[idx];
}

export const useFormatDate = (date: Date, timeZone: string, hoursPref: number, showSecondsPref: boolean, previewTime?: Date) => {
  // still in user's local time here
  const dateFormatHeader = 'PPPP'; // Wednesday, December 1st, 2021
  const dateFormatClock = 'eee, MMM do'; // Wed, Dec 1st
  const timeFormat = hoursPref === 12 ? `h:mm${showSecondsPref ? ':ss' :''}aaa` : `H:mm${showSecondsPref ? ':ss' : ''}`;

  const [formattedDateHeader, setFormattedDateHeader] = useState('');
  const [formattedDateClock, setFormattedDateClock] = useState('');
  const [formattedTime, setFormattedTime] = useState('');
  const [formattedOffset, setFormattedOffset] = useState('');

  const [formattedPreviewTime, setFormattedPreviewTime] = useState('');
  const [timezoneAdjustedPreviewTime, setTimezoneAdjustedPreviewTime] = useState('');
  const [timePalette, setTimePalette] = useState<IHexPalette>(paletteDefaults);

  const [locale] = useState(enUS);

  const makeDate = (timeProp: Date, formatProp: string) => {
    return format(timeProp, formatProp, {locale: locale})
  }

  useEffect(() => {
    const convertedNow = getNow(date, timeZone);
    setFormattedDateHeader(makeDate(convertedNow, dateFormatHeader)); // make the header part 
    setFormattedDateClock(makeDate(convertedNow, dateFormatClock));  // make the date part
    setFormattedTime(makeDate(convertedNow, timeFormat));  // make the time part
    setFormattedOffset(makeDate(convertedNow, dateFormatHeader)); // make the -1h hr offset

    const convertedPreview = getNow(previewTime ?? date, timeZone);
    setFormattedPreviewTime(makeDate(previewTime ?? date, timeFormat));
    setTimezoneAdjustedPreviewTime(makeDate(convertedPreview , timeFormat)); // make the "preview time" if the user provided a preview time
    
    // set "time palette", ie: morning, afternoon, night background color
    const minuteOfDay = getMinuteOfDay(convertedNow);
    setTimePalette(getDayPeriodHexValue(minuteOfDay));
  }, [date, previewTime, timeZone]);

  return {
    formattedDateHeader,
    formattedDateClock,
    formattedTime,
    formattedOffset,
    formattedPreviewTime,
    timezoneAdjustedPreviewTime,
    timePalette
  }
}