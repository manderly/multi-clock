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

const infixToPostfix = (input: string[]): string[] => {

  // useful guide: 
  // https://www.tutorialspoint.com/Convert-Infix-to-Postfix-Expression

  let stack = new Array();
  let postfix = new Array();

  // flag for ensuring numbers don't get "fused" to each other after an operator is pushed 
  let pushedOperator = false;

  for (let char of input) {
    if (char.match(numberExpression)) {
      // it's 0-9, add it to the postfix string
      // also: to handle numbers greater than 1 digit, 
      // look at what's in the last index - if it's a number, add to that number. If it's not a number, push as a new element.
      //console.log("adding " + char + " to postfix array");
      if (postfix.length > 0 && !pushedOperator) {
        const last = postfix[postfix.length-1];
        // last is a number and we didn't just push an operator, we can fuse this new number onto it
        postfix[postfix.length-1] = last+char;
      } else {
        // there is nothing in postfix yet, OR we just pushed an operator - either way, push this number
        postfix.push(char);
      }
      pushedOperator = false;
    } else if (char === "(") {
      stack.push("(");
    } else if (char === "^") {
      stack.push("^");
    } else if (char === ")") {
      while (stack.length > 0 && stack[stack.length-1] !== "(") {
        postfix.push(stack.pop());
      }
      // pop the remaining "("
      stack.pop();
    } else {
      //console.log("handling " + char);
      if (precedence(char) > precedence(stack[stack.length-1])) {
        stack.push(char); // push only if precedence is higher
      } else {
        // precedence is not higher, store and pop until higher precedence is found 
        while (stack.length > 0 && (precedence(char) <= precedence(stack[stack.length-1]))) {
          postfix.push(stack.pop());
        }
        stack.push(char);
      }
      pushedOperator = true;
    }
  }

  while (stack.length > 0) {
    postfix.push(stack.pop());
  }

  //console.log(postfix);
  return postfix;
}

const evaluatePostfix = (infix: string[]): number => {
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

