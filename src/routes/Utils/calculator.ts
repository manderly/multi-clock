export const calculatorMath = (userInput: string[]): number => {
  if (userInput.length === 0) { return 0; }

  const exp = /[0-9]+/;
  let stack = new Array<number>();

  let result = 0;
  let operand = 0;

  let sign = 1; // positive by default

  let final = 0; // so there's always some kind of number returned

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
  }

  // add any remaining operand to result
  final = result + (sign*operand);
  return final;
}

