import {FC, useEffect, useState} from 'react';
import styled from "styled-components";

const ThermometerWrapper = styled.div(({theme}) => ({
    '@media only screen and (min-width: 781px)': {
        '.thermometer': {
            padding: '10px',
            width: '100%',
            backgroundColor: `${theme.palette.utilitiesBar.thermometerBg}`
        },
        '.thermometer-container': {
            display:'flex',
            flexDirection: 'row',
        },
        '.c-margin-adjustment': {
            marginLeft: '-4px',
        },
        '.thermometer-degrees': {
            margin: '2px 0 2px 0',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            width:'100%',
        },
        '.mercury': {
            margin: '1px 0 1px 0',
            height: '4px',
            backgroundColor: theme.palette.utilitiesBar.mercury,
        },
        '.therm-unit': {
            width: '100%',
            display: 'flex',
            flexDirection: 'column-reverse',
            position: 'relative',
            height: '60px',
            alignItems: 'center',
        },
        /* All lines, C and F, thick and thin */
        '.therm-line': {
            height: '60%',
            fontSize: '8px',
            borderRight: `1px solid ${theme.palette.utilitiesBar.thinLine}`,
        },
        '.therm-unit.therm-unit-c': {
            flexDirection: 'column',
        },
        '.therm-unit.therm-unit-c:nth-of-type(5n+1), .therm-unit.therm-unit-c:first-of-type, .therm-unit.therm-unit-c:last-of-type': {
            flexDirection: 'column-reverse',
            '.therm-line': {
                height: '100%',
            }
        },
        '.thermostat-container .therm-unit-c': {
            display: 'block',
            justifyContent: 'flex-start',
        },
        '.thermostat-container .therm-unit-f': {
            justifyContent: 'flex-start',
        },
        '.letter': {
            marginLeft: '6px',
            width:'20px',
        },
        '.therm-number': {
            display: 'none',
            fontSize: '.6em',
            color: `${theme.palette.utilitiesBar.number}`
        },
        /* Celsius and Fahrenheit - first/last lines */
        '.thermometer-container .therm-unit:first-of-type .therm-line-c, .thermometer-container .therm-unit:first-of-type .therm-line-f,.thermometer-container .therm-unit:last-of-type .therm-line-c,.thermometer-container .therm-unit:last-of-type .therm-line-f': {
            display: 'block',
            borderRight: `2px solid ${theme.palette.utilitiesBar.bigLine}`,
        },
        /* Celsius and Fahrenheit - first/last numbers */
        '.thermometer-container .therm-unit:first-of-type .therm-number-c,.thermometer-container .therm-unit:first-of-type .therm-number-f,.thermometer-container .therm-unit:last-of-type .therm-number-c,.thermometer-container .therm-unit:last-of-type .therm-number-f': {
            display: 'block',
        },
        /* Celsius thick lines */
        '.thermometer-container .therm-unit:nth-of-type(5n+1) .therm-line-c': {
            display: 'block',
            borderRight: `2px solid ${theme.palette.utilitiesBar.bigLine}`,
        },
        /* Celsius numbers */
        '.thermometer-container .therm-unit:nth-of-type(5n+1) .therm-number-c': {
            display: 'block',
            bottom: '2px',
            textAlign: 'center',
            width: '12px',
        },
        /* F thick lines */
        '.thermometer-container .therm-unit:nth-of-type(5n+1) .therm-line-f': {
            display: 'block',
            borderRight: `2px solid ${theme.palette.utilitiesBar.bigLine}`,
            height: '70%',
        },
        /* F numbers */
        '.thermometer-container .therm-unit:nth-of-type(5n+1) .therm-number-f': {
            display: 'block',
            position: 'absolute',
            textAlign: 'center',
            top: '3px',
            transform: 'translateX(-25%)',
            width: '13px',
        },
    },
    '@media only screen and (max-width: 780px)': {
        '.thermometer': {
            padding: '10px',
            width: '100%',
            backgroundColor: `${theme.palette.utilitiesBar.thermometerBg}`
        },
        '.thermometer-container': {
            display:'flex',
            flexDirection: 'row',
        },
        '.c-margin-adjustment': {
            marginLeft: '-4px',
        },
        '.thermometer-degrees': {
            margin: '2px 0 2px 0',
            display: 'flex',
            flexDirection: 'row',
            width:'100%',
        },
        '.mercury': {
            margin: '1px 0 1px 0',
            height: '4px',
            backgroundColor: theme.palette.utilitiesBar.mercury,
        },
        '.therm-unit': {
            width: '100%',
            display: 'flex',
            flexDirection: 'column-reverse',
            position: 'relative',
            height:'60px',
            alignItems:'center',
        },
        /* All lines, C and F, thick and thin */
        '.therm-line': {
            height: '60%',
            fontSize: '8px',
            borderRight: `1px solid ${theme.palette.utilitiesBar.thinLine}`,
        },
        '.therm-unit.therm-unit-c': {
            flexDirection: 'column',
        },
        '.therm-unit.therm-unit-c:nth-of-type(10n+1), .therm-unit.therm-unit-c:first-of-type, .therm-unit.therm-unit-c:last-of-type': {
            flexDirection: 'column-reverse',
            '.therm-line': {
                height:'100%',
            }
        },
        '.thermostat-container .therm-unit-c': {
            display: 'block',
            justifyContent: 'flex-start',
        },
        '.thermostat-container .therm-unit-f': {
            justifyContent: 'flex-start',
        },
        '.letter': {
            marginLeft: '6px',
            width:'20px',
        },
        '.therm-number': {
            display: 'none',
            fontSize: '.6em',
            color: `${theme.palette.utilitiesBar.number}`
        },
        /* Celsius and Fahrenheit - first/last lines */
        '.thermometer-container .therm-unit:first-of-type .therm-line-c, .thermometer-container .therm-unit:first-of-type .therm-line-f,.thermometer-container .therm-unit:last-of-type .therm-line-c,.thermometer-container .therm-unit:last-of-type .therm-line-f': {
            display: 'block',
            borderRight: `2px solid ${theme.palette.utilitiesBar.bigLine}`,
        },
        /* Celsius and Fahrenheit - first/last numbers */
        '.thermometer-container .therm-unit:first-of-type .therm-number-c,.thermometer-container .therm-unit:first-of-type .therm-number-f,.thermometer-container .therm-unit:last-of-type .therm-number-c,.thermometer-container .therm-unit:last-of-type .therm-number-f': {
            display: 'block',
        },
        /* Celsius thick lines */
        '.thermometer-container .therm-unit:nth-of-type(10n+1) .therm-line-c': {
            display: 'block',
            borderRight: `2px solid ${theme.palette.utilitiesBar.bigLine}`,
        },
        /* Celsius numbers */
        '.thermometer-container .therm-unit:nth-of-type(10n+1) .therm-number-c': {
            display: 'block',
            bottom: '2px',
            textAlign: 'center',
            width: '12px',
        },
        /* F thick lines */
        '.thermometer-container .therm-unit:nth-of-type(15n+1) .therm-line-f': {
            display: 'block',
            borderRight: `2px solid ${theme.palette.utilitiesBar.bigLine}`,
            height:'70%',
        },
        /* F numbers */
        '.thermometer-container .therm-unit:nth-of-type(15n+1) .therm-number-f': {
            display: 'block',
            position: 'absolute',
            textAlign: 'center',
            top: '3px',
            transform: 'translateX(-25%)',
            width: '13px',
        },
    }
}));

interface IThermometer {
  smallestF: number,
  largestF: number,
}

const convertFtoC = (degreesF: number): number => {
  return Math.floor(((degreesF - 32) * (5/9)));
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
            <div className="thermometer-container c-margin-adjustment">
                <div className="thermometer-degrees">{thermometerValuesC}</div>
                <div className="letter">C°</div>
            </div>

            <div>
                <div className="mercury"></div>
            </div>

            <div className="thermometer-container">
                <div className="thermometer-degrees">{thermometerValuesF}</div>
                <div className="letter">F°</div>
            </div>

        </div>
    </ThermometerWrapper>
  )
}

export default Thermometer;