import Color from 'colorjs.io';

const gradientStops : { [key: string]: string }= {
  "180": "#20255B",
  "360": "#9999CC",
  "540": "#8FD1BC",
  "720": "#F3C052",
  "900": "#d78e5d",
  "1080": "#CF7646",
  "1260": "#9A5FB3",
  "1440": "#413899",
}

// build interoplation arrays from these colors
const STEPS_COUNT = 32;

const getSteps = (start: string, end: string) => {
  const colorsArr = Color.steps(Color.range(gradientStops[start], gradientStops[end]), {steps:STEPS_COUNT});
  const colorHexValues = colorsArr.map((c: any) => c.hex );
  return colorHexValues;
}

const earlyMorning = getSteps("180", "360");
const dawn = getSteps("360", "540");
const morning = getSteps("540", "720");
const earlyAfternoon = getSteps("720", "900");
const sunset = getSteps("900", "1080");
const earlyEvening = getSteps("1080", "1260");
const night = getSteps("1260", "1440"); 
const afterMidnight = getSteps("1440","180");

export const colorPalette = [...earlyMorning, ...dawn, ...morning, ...earlyAfternoon, ...sunset, ...earlyEvening, ...night, ...afterMidnight];
