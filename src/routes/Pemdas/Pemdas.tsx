import { FC, useState } from 'react';

const Pemdas: FC = () => {

  const [userInput, setUserInput] = useState<string[]>([]);
  const [result, setResult] = useState<number>(0);

  const processInput = () => {
    console.log(userInput);
    
    let result = 0;
    let operand = 0;
    let stack = new Array();
    let exp = /[0-9]+/;
    let sign = 1; // for handling negative and positive numbers

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
          result -= sign*operand;
          sign = -1;
          operand = 0;
        } else if (char === ")") {
          // finished a ( ) expression
          result+= sign*operand;
          
          // use the sign from the stack
          result*=stack.pop();

          // add the digit on the top of the stack
          result+=stack.pop();

          // reset operand
          operand = 0;
        }
      }

      // add any remaining operand to result
      let final = result + (sign*operand);
      setResult(final);
    }
  }

  const handleInputChange = (e: any) => {
    setUserInput(e.target.value);
  }

  return (
    <div className="calculator-container">
      <h2>PEMDAS calculator</h2>
      <p>Give it an expression containing addition and/or subtraction and press "Calculate"</p>
      <p>Example: 12+(8+9)</p>
      <input value={userInput} onChange={handleInputChange} />
      <button onClick={processInput}>Calculate</button>
      <p>{result}</p>
    </div>
  )
}

export default Pemdas;