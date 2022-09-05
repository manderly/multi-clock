
import { LinearProgress } from '@mui/material';
import { FC, useEffect, useState } from 'react';

interface IThermometer {
  smallestF: number,
  largestF: number,
}

const convertFtoC = (degreesF: number): number => {
  return Math.floor(((degreesF - 32)/1.8));
};

const generateThermometerLines = (start: number, end: number, scale: 'f' | 'c') => {
  let range = new Array();
  for (let i = start; i < end; i++) {
    range.push(i);
  }
  return range.map((e: number, i: number) => {
    const thermClass = `therm-unit therm-unit-${scale}`;
    return (
      <div className={thermClass}>
        {scale === 'c' ? <div className={`therm-number therm-number-${scale}`}>{e}</div> : undefined}
        <div className={`therm-line therm-line-${scale}`} key={`${scale}-${e}`}></div>
        {scale === 'f' ? <div className={`therm-number therm-number-${scale}`}>{e}</div> : undefined}
      </div>
    )
  });
}

const Thermometer: FC<IThermometer> = ({ smallestF, largestF }) => {
  const [thermometerValuesC, setThermometerValuesC]: any = useState();
  const [thermometerValuesF, setThermometerValuesF]: any = useState();

  useEffect(() => {
    setThermometerValuesC(generateThermometerLines(convertFtoC(smallestF), convertFtoC(largestF), 'c'));
    setThermometerValuesF(generateThermometerLines(smallestF, largestF, 'f'));
  }, [])

  return (
    <div className="thermometer">
      <div className="thermometer-container">
        {thermometerValuesC}
      </div>
      <div className="mercury"></div>
      <div className="thermometer-container">
        {thermometerValuesF}
      </div>
    </div>
  )
}

export default Thermometer;