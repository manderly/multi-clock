const numberExpression = /[0-9]+/;
const operatorsExpression = /[+-/*^x]/;

const precedence = (op: string): number => {
  if (op === "+" || op === "-") {
    return 1;
  } else if (op === "*" || op === "/" || op === "x") {
    return 2;
  } else if (op === "^") {
    return 3;
  } else {
    return 0;
  }
}

const parse = (input: string[]): string[] => {
  // parse the the input for "implied" multiplication
  // example: 5(3+1) should become 5*(3+1)
  // example: (4+2)2 should become (4+2)*2
  for (let i = 0; i < input.length; i++) {
    if (input[i].match(numberExpression) && input[i+1] === "(") {
      input.splice(i+1, 0, "*");
      i++;
    } else if (input[i].match(numberExpression) && input[i-1] === ")") {
      input.splice(i, 0, "*");
      i++;
    } else if (input[i] === ")" && input[i+1] === "(") {
      input.splice(i+1, 0, "*");
    }
  }

  return input;
}

const infixToPostfix = (input: string[]): string[] => {

  // useful guide: 
  // https://www.tutorialspoint.com/Convert-Infix-to-Postfix-Expression

  const stack: string[] = [];
  const postfix: string[] = [];

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
        // last is a number and we didn't just push an operator, we can fuse this new number onto it (concat)
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
      pushedOperator = true;
    } else if (char === ")") {
      while (stack.length > 0 && stack[stack.length-1] !== "(") {
        postfix.push(stack.pop()!);
      }
      // pop the remaining "("
      stack.pop();
    } else {
      if (stack.length === 0) {
        stack.push(char);
      } else if (precedence(char) > precedence(stack[stack.length-1])) {
        stack.push(char); // push only if precedence is higher
      } else {
        // precedence is not higher, store and pop until higher precedence is found 
        while (stack.length > 0 && (precedence(char) <= precedence(stack[stack.length-1]))) {
          let popped = stack.pop();
          postfix.push(popped!);
        }
        stack.push(char);
      }
      pushedOperator = true;
    }
  }

  while (stack.length > 0) {
    postfix.push(stack.pop()!);
  }

  return postfix;
}

const evaluatePostfix = (postfix: string[]): number | undefined => {
  let stack = [];
  for (let char of postfix) {
    if (char.match(operatorsExpression)) {
      // it's +, -, *, /, or ^ 
      const a:number = stack.pop()!;
      const b:number = stack.pop()!;

      let res:number|undefined = -(Number.MAX_VALUE-1);
      if (char === "+") {
        res = b+a;
      } else if (char === "-") {
        res = b-a;
      } else if (char === "*" || char === "x") {
        res = b*a;
      } else if (char === "/") {
        if (a === 0) {
          res = undefined;
        } else {
          res = b/a;
        }
      } else if (char === "^") {
        res = Math.pow(b,a);
      }

      stack.push(res);
    } else if (char.match(numberExpression)) {
      stack.push((+char));
    }
  }

  return stack[stack.length-1];
}

export const calculatorMath = (userInput: string[]): number | undefined => {
  if (userInput.length === 0) { return 0; }
  let parsed = parse([...userInput]); // insert * where needed 
  let postfix = infixToPostfix(parsed);
  let result = evaluatePostfix(postfix);
  return result;
}

