
import { LinearProgress } from '@mui/material';
import { FC } from 'react';

interface IThermometer {
  smallestF: number,
  largestF: number,
}

const convertFtoC = (degreesF: number): number => {
  return Math.floor(((degreesF - 32)/1.8));
};

const generateThermometerLines = (units: number, type: 'f' | 'c') => {
  return [...Array(units)].map((e, i) => <div className="therm-unit" key={`${type}-${i}`}></div>);
}

const Thermometer: FC<IThermometer> = ({ smallestF, largestF }) => {
  const unitsF = (largestF - smallestF / 10);
  const unitsC = (convertFtoC(largestF) - convertFtoC(smallestF));
  const thermometerLinesC = generateThermometerLines(unitsC, 'c');
  const thermometerLinesF = generateThermometerLines(unitsF, 'f');
  return (
    <div className="thermometer">
      <div className="thermometer-container">
        {thermometerLinesC}
      </div>
      <div className="mercury"></div>
      <div className="thermometer-container">
        {thermometerLinesF}
      </div>
    </div>
  )
}

export default Thermometer;