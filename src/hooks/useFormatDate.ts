import { useEffect, useState } from 'react';
import enUS from 'date-fns/locale/en-US';
import { format } from 'date-fns-tz';
import { utcToZonedTime } from 'date-fns-tz';


const getNow = (now: Date, timeZone: string) => {
  return utcToZonedTime(now, timeZone);
}

export const getMinuteOfDay = (date: Date): number => {
  const hours = parseInt(format(date, 'H'));
  const minutes = parseInt(format(date, 'm'));
  return (hours*60)+minutes;
}

// key: minute of a 1440 minute day
// value: desired color's hex value converted to decimal 
const gradientStops : { [key: string]: number }= {
  "180": 2106715,    // #20255B
  "360": 10066380,   // #9999CC
  "540": 9425340,    // #8FD1BC
  "720": 15974482,   // #F3C052
  "900": 14126685,   // #d78e5d
  "1080": 13596230,  // #CF7646
  "1260": 10117043,  // #9A5FB3
  "1440": 4274329    // #413899
}

const getInterpolationStepInHex = (boundaryA: string, boundaryB: string, percentOfDay: number) => {
  /* Note: Stop A and Stop B are not interchangeable, A represents an earlier time of day than B */
  let stopA = gradientStops[boundaryA];
  let stopB = gradientStops[boundaryB];

  // point represents a calculated stop between stopA and stopB
  let diff = Math.abs(stopB - stopA);
  let point: number;
  if (stopA > stopB) {
    // A is a "bigger" color than B, so as the % increases, the color decimal decreases as we move closer to B
    point = Math.floor((stopA)-(diff*percentOfDay));
  } else {
    // A is a "smaller" color than B, so as the % increases, the color decimal also increases as we move closer to B
    point = Math.floor((stopA)+(diff*percentOfDay));
  }
  //console.log(point + " maps to a number between " + stopA + " and " + stopB + ", diff: " + diff);
  // turn this point into hex 
  return point.toString(16);
}

const getDayPeriodHexValue = (minOfDay: number): string => {
  //console.log("Minute of day: " + minOfDay);
  // figure out how far through the day gradient we are
  let palette = "#fffff";
  let percentOfDay = (minOfDay/1440);
  if (minOfDay >= 180 && minOfDay < 360) {
    palette = `#${getInterpolationStepInHex("180", "360", percentOfDay)}`;
  } else if (minOfDay >= 360 && minOfDay < 520) {
    palette = `#${getInterpolationStepInHex("360", "540", percentOfDay)}`;
  } else if (minOfDay >= 520 && minOfDay < 720) {
    palette = `#${getInterpolationStepInHex("540", "720", percentOfDay)}`;
  } else if (minOfDay >= 720 && minOfDay < 900) {
    palette = `#${getInterpolationStepInHex("720", "900", percentOfDay)}`;
  } else if (minOfDay >= 900 && minOfDay < 1080) {
    palette = `#${getInterpolationStepInHex("900", "1080", percentOfDay)}`;
  } else if (minOfDay >= 1080 && minOfDay > 1260) {
    palette = `#${getInterpolationStepInHex("1080", "1260", percentOfDay)}`;
  } else if (minOfDay >= 1260 && minOfDay < 1440) {
    palette = `#${getInterpolationStepInHex("1260", "1440", percentOfDay)}`;
  } else if (minOfDay >= 1400 || minOfDay < 180) {
    palette = `#${getInterpolationStepInHex("1400", "180", percentOfDay)}`;
  }
  //console.log("Mins " + minOfDay + " maps to " + palette);
  // return an appropriate hex value to use as bg color
  return palette;
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
