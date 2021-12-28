import { FC, useState } from 'react';
import { FormControl, InputGroup } from 'react-bootstrap';
import { calculatorMath } from './calculator';
import CounterButton from '../../components/CounterButton/CounterButton';
import { useEffect } from 'react';

import { ThemeButton } from '../../components';
import localStorageUtils from '../../utils/localStorage';

const Utils: FC = () => {

  const [userInput, setUserInput] = useState<string[]>([]);
  const [result, setResult] = useState<String>('');
  const [calculatorHistory, setCalculatorHistory] = useState(() => {
    // get from localstorage if possible
    const history = localStorageUtils.get("calculatorHistory");
    return history || [];
  })

  const [count, setCount] = useState(0);
  const increaseCount = () => {
    setCount(count+1);
  }

  const processInput = () => {
    let res = calculatorMath(userInput);

    // update "history log" below calculator
    let finalExpression = `${userInput} = ${res}`;
    let previousExpressions = calculatorHistory;

    // add to front of the array of previous expressions and remove oldest if list is getting long
    previousExpressions.unshift(finalExpression);
    if (previousExpressions.length > 5) {
      calculatorHistory.pop();
    }

    setResult(String(res));
    setCalculatorHistory([...previousExpressions]);
  }

  const handleInputChange = (e: any) => {
    setUserInput(e.target.value);
  }

  useEffect(() => {
    localStorageUtils.put("calculatorHistory", calculatorHistory);
  }, [calculatorHistory])

  return (
    <div className="calculator-container">
      <h2>Simple calculator</h2>
      <p>Addition, subtraction, multiplication, division and exponents with/without parenthesis.</p>
      <div className="calculator-buttons-container">
        <InputGroup>
          <FormControl
            className="calculator-input"
            placeholder="Example: 12+(8+9)"
            aria-label="calculator-input" 
            value={userInput} 
            onChange={handleInputChange} />
          <ThemeButton aria-label="calculator-button" variant="secondary" onClick={processInput}>Calculate</ThemeButton>
          {result ? <div className="calculator-result-item">= {result}</div> : <div className="calculator-result-item"></div>}
        </InputGroup>
      </div>
      <div>
        <h4 className="previous-calculations-title">Previous calculations</h4>
        {calculatorHistory.length > 0 ? 
          calculatorHistory.map((expression : string, idx : number) => {
            return <p key={`${expression}-${idx}`}>{expression}</p>
          })
          : <div>No history yet</div>
        }
      </div>


      {false &&
        <div className="counter-container">
        <div className="counter-item">
          <CounterButton label="Increase Counter" onClickMethod={increaseCount} />
        </div>
        <div className="counter-item">
          <span>Counter: {count}</span>
        </div>
        </div>
      }

    </div>
  )
}

export default Utils;