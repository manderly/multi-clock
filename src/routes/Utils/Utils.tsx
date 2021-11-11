import { FC, useState } from 'react';
import { FormControl, InputGroup, Button } from 'react-bootstrap';
import { calculatorMath } from './calculator';

const Utils: FC = () => {

  const [userInput, setUserInput] = useState<string[]>([]);
  const [result, setResult] = useState<number>(0);
  const [resultHistory, setResultHistory] = useState<string[]>([]);

  const processInput = () => {
    let res = calculatorMath(userInput);

    // update "history log" below calculator
    let finalExpression = `${userInput} = ${res}`;
    let previousExpressions = resultHistory;

    // add to front of the array of previous expressions and remove oldest if list is getting long
    previousExpressions.unshift(finalExpression);
    if (previousExpressions.length > 5) {
      resultHistory.pop();
    }

    setResult(res);
    setResultHistory([...previousExpressions]);
  }

  const handleInputChange = (e: any) => {
    setUserInput(e.target.value);
  }

  return (
    <div className="calculator-container">
      <h2>Simple calculator</h2>
      <p>Addition, subtraction, multiplication, division and exponents with/without parenthesis.</p>
      <div className="calculator-buttons-container">
        <InputGroup>
          <FormControl
            placeholder="Example: 12+(8+9)"
            aria-label="calculator-input" 
            value={userInput} 
            onChange={handleInputChange} />
          <Button aria-label="calculator-button" variant="primary" onClick={processInput}>Calculate</Button>
          {result ? <div className="calculator-result-item">= {result}</div> : <div className="calculator-result-item"></div>}
        </InputGroup>
      </div>
      <div>
        <h4 className="previous-calculations-title">Previous calculations</h4>
        {resultHistory.length > 0 ? 
          resultHistory.map((expression, idx) => {
            return <p key={`${expression}-${idx}`}>{expression}</p>
          })
          : <div>No history yet</div>
        }
      </div>
    </div>
  )
}

export default Utils;