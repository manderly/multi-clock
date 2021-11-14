const numberExpression = /[0-9]+/;
const operatorsExpression = /[+-/*^]/;

const precedence = (op: string): number => {
  if (op === "+" || op === "-") {
    return 1;
  } else if (op === "*" || op === "/") {
    return 1;
  } else if (op === "^") {
    return 3;
  } else {
    return 0;
  }
}

const infixToPostfix = (input: string[]): string => {

  // useful guide: 
  // https://www.tutorialspoint.com/Convert-Infix-to-Postfix-Expression

  let stack = new Array();
  let postfix = "";

  for (let char of input) {
    if (char.match(numberExpression)) {
      // it's 0-9, add it to the postfix string
      console.log("adding " + char + " to postfix string");
      postfix+=char;
    } else if (char === "(") {
      stack.push("(");
    } else if (char === "^") {
      stack.push("^");
    } else if (char === ")") {
      while (stack.length > 0 && stack[stack.length-1] !== "(") {
        postfix+=stack.pop()
      }
      // pop the remaining "("
      stack.pop();
    } else {
      if (precedence(char) > precedence(stack[stack.length-1])) {
        stack.push(char); // push only if precedence is higher
      } else {
        // precedence is not higher, store and pop until higher precedence is found 
        while (stack.length > 0 && (precedence(char) <= precedence(stack[stack.length-1]))) {
          postfix+=stack.pop();
        }
        stack.push(char);
      }
    }
  }

  while (stack.length > 0) {
    postfix+=stack.pop();
  }

  return postfix;
}

const evaluatePostfix = (infix: string): number => {
  let stack = new Array();
  for (let char of infix) {
    if (char.match(operatorsExpression)) {
      // it's +, -, *, /, or ^ 
      const a = stack.pop();
      const b = stack.pop();
      let res:number;
      if (char === "+") {
        res = b+a;
      } else if (char === "-") {
        res = b-a;
      } else if (char === "*") {
        res = b*a;
      } else if (char === "/") {
        res = b/a;
      } else if (char === "^") {
        res = Math.pow(b,a);
      } else {
        res = -(Number.MAX_VALUE-1);
      }

      stack.push(res);
    } else if (char.match(numberExpression)) {
      stack.push((+char));
    }
  }

  return stack[stack.length-1];
}

export const calculatorMath = (userInput: string[]): number => {
  if (userInput.length === 0) { return 0; }
  let postfix = infixToPostfix(userInput);
  let result = evaluatePostfix(postfix);
  return result;
}

