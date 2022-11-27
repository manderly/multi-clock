import {FC, useEffect, useState} from 'react';
import styled from "styled-components";

const ThermometerWrapper = styled.div(({theme}) => ({
    '.thermometer': {
        padding: '10px',
        width:'100%',
        backgroundColor: `${theme.palette.utilitiesBar.thermometerBg}`
    },
    '.mercury': {
        backgroundColor: theme.palette.utilitiesBar.mercury,
    },
    '.therm-line': {
        borderRight: `1px solid ${theme.palette.utilitiesBar.thinLine}`
    },
    '.therm-number': {
        color: `${theme.palette.utilitiesBar.number}`
    },
    /* So the first/last lines display */
    '.thermometer-container .therm-unit:first-of-type .therm-line-c,.thermometer-container .therm-unit:first-of-type .therm-line-f,.thermometer-container .therm-unit:last-of-type .therm-line-c,.thermometer-container .therm-unit:last-of-type .therm-line-f': {
        display: 'block',
        borderRight: `2px solid ${theme.palette.utilitiesBar.bigLine}`,
        height: '70%'
    },
    /* So the first/last number displays */
    '.thermometer-container .therm-unit:first-of-type .therm-number-c,.thermometer-container .therm-unit:first-of-type .therm-number-f,.thermometer-container .therm-unit:last-of-type .therm-number-c,.thermometer-container .therm-unit:last-of-type .therm-number-f': {
        display: 'block',
    },
    /* Line and number treatment for Celcius */
    '.thermometer-container .therm-unit:nth-of-type(5n) .therm-line-c': {
        borderRight: `2px solid ${theme.palette.utilitiesBar.bigLine}`,
        height: '70%',
    },
    '.thermometer-container .therm-unit:nth-of-type(5n) .therm-number-c': {
        display: 'block',
        position: 'absolute',
        bottom: '2px',
        textAlign: 'center',
        transform: 'translateX(-10%)',
        width: '12px',
    },
    /* Line and number treatment for Fahrenheit */
    '.thermometer-container .therm-unit:nth-of-type(5n+1) .therm-line-f': {
        borderRight: `2px solid ${theme.palette.utilitiesBar.bigLine}`,
        height:'70%',
    },
    '.thermometer-container .therm-unit:nth-of-type(5n+1) .therm-number-f': {
        display: 'block',
        position: 'absolute',
        textAlign: 'center',
        top: '2px',
        transform: 'translateX(-25%)',
        width: '13px',
    },

}));

interface IThermometer {
  smallestF: number,
  largestF: number,
}

const convertFtoC = (degreesF: number): number => {
  return Math.floor(((degreesF - 32)/1.8));
};

const generateThermometerLines = (start: number, end: number, scale: 'f' | 'c') => {
  let range = new Array();
  for (let i = start; i <= end; i++) {
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
    <ThermometerWrapper>
        <div className="thermometer">
          <div className="thermometer-container">
            {thermometerValuesC}
            <span className="letter">C°</span>
          </div>
          <div className="mercury"></div>
          <div className="thermometer-container">
            {thermometerValuesF}
            <span className="letter">F°</span>
          </div>
        </div>
    </ThermometerWrapper>
  )
}

export default Thermometer;