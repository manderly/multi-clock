import { FC, useCallback, useState } from 'react';
import { FormControl, InputGroup, Button } from 'react-bootstrap';

const Utils: FC = () => {

  const [userInput, setUserInput] = useState<string[]>([]);
  const [result, setResult] = useState<number>(0);
  const [resultHistory, setResultHistory] = useState<string[]>([]);

  const processInput = () => {
    const exp = /[0-9]+/;
    let stack = new Array<number>();

    let result = 0;
    let operand = 0;

    let sign = 1; // positive by default

    if (userInput.length) {
      for (let i = 0; i < userInput.length; i++) {
        let char = userInput[i];
        if (char === "(") {
          // save our work so far (on the stack)
          stack.push(result);
          stack.push(sign);
          result = 0;
          sign = 1;
        } else if (char.match(exp)) {
          operand = 10*operand+(+char);
        } else if (char === "+") {
          result += sign*operand;
          sign = 1;
          operand = 0;
        } else if (char === "-") {
          result += sign*operand;
          sign = -1;
          operand = 0;
        } else if (char === ")") {
          // finished a ( ) expression
          result += sign*operand;
          
          // use the sign from the stack (or 1 if none exists)
          let signFromStack = stack.pop();
          result *= signFromStack === undefined ? 1 : signFromStack;

          // add the digit on the top of the stack (or 0 if none exists)
          let digit = stack.pop();
          result += digit === undefined ? 0 : digit;

          // reset operand
          operand = 0;
        }
      }

      // add any remaining operand to result
      let final = result + (sign*operand);

      let finalExpression = `${userInput} = ${final}`;
      let previousExpressions = resultHistory;
      // add to the array of previous expressions
      previousExpressions.unshift(finalExpression);

      if (previousExpressions.length > 5) {
        // remove the oldest one
        resultHistory.pop();
      }

      setResult(final);
      setResultHistory([...previousExpressions]);
    }
  }

  const handleInputChange = (e: any) => {
    setUserInput(e.target.value);
  }

  return (
    <div className="calculator-container">
      <h2>Addition/Subtraction with parenthesis calculator</h2>
      <p>Enter an expression containing addition and/or subtraction and press "Calculate"</p>
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