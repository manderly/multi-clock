import Color from 'colorjs.io';
export interface IHexPalette {
  bg: string;
  text: string;
}

const gradientStops : { [key: string]: IHexPalette } = {
  "180": {          // 3am
    bg:"#20255B",
    text:"#ffffff" 
  },
  "360": {          // 6am
    bg:"#20255B",
    text:"#ffffff"
  },
  "540": {          // 9 am
    bg:"#8FD1BC",
    text:"#ffffff"
  },
  "720": {          // 12pm noon
    bg:"#F3C052",
    text:"#000000"
  },
  "900": {          // 3pm
    bg:"#d78e5d",
    text:"#000000"
  },
  "1080": {         // 6pm
    bg:"#CF7646",
    text:"#000000"
  },
  "1260": {         // 9pm
    bg:"#9A5FB3",
    text:"#ffffff"
  },
  "1440": {         // 12am midnight
    bg:"#150d2b",
    text:"#ffffff"
  }
}

// build interoplation arrays from these colors
const STEPS_COUNT = 32;

const getSteps = (start: string, end: string) => {
  // get an array of all the steps of colors between color A and color B
  const colorsArr = Color.steps(Color.range(gradientStops[start].bg, gradientStops[end].bg), {steps:STEPS_COUNT});
  // take just the hex
  // return a tuple of the interpolation color and the text color from color A
  const colorHexValues = colorsArr.map((c: any) => ( {bg: c.hex, text: gradientStops[start].text} ));
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
