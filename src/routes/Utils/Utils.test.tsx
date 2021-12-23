import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import Utils from './Utils';
import userEvent from '@testing-library/user-event';

const setup = () => {
  const utils = render(<Utils />);
  const input = screen.getByRole("textbox", {name: "calculator-input"});
  const button = screen.getByRole("button", {name: "calculator-button"});
  return {
    input,
    button,
    ...utils,
  }
}

describe('Utils page', () => {

  it('Should have a calculator interface when rendered', () => {
    const { getByRole } = setup();
    const calculatorInput = getByRole("textbox", {name: 'calculator-input'});
    expect(calculatorInput).toBeInTheDocument();
  })

  describe('Basic arithmetic tests', () => {
    it('Should evaluate an addition expression correctly (positive numbers)', () => {
      const {input, button, getByText} = setup();
      const testExpression = "(8+1)+2";
      fireEvent.change(input, {target: {value: testExpression}});
      userEvent.click(button);
      getByText('= 11');
    })

    it('Should evaluate a subtraction expression correctly', () => {
      const {input, button, getByText} = setup();
      const testExpression = "(8-1)-2";
      fireEvent.change(input, {target: {value: testExpression}});
      userEvent.click(button);
      getByText('= 5');
    })

    it('Should evaluate a subtraction expression correctly (negative result)', () => {
      const {input, button, getByText} = setup();
      const testExpression = "(8-10)-2";
      fireEvent.change(input, {target: {value: testExpression}});
      userEvent.click(button);
      getByText('= -4');
    })
  })

  describe('Multiplication tests', () => {
    it('Should evaluate a multiplication (*) expression correctly', () => {
      const {input, button, getByText} = setup();
      const testExpression = "(2*3)*5";
      fireEvent.change(input, {target: {value: testExpression}});
      userEvent.click(button);
      getByText('= 30');
    })

    it('Should evaluate a multiplication (x) expression correctly', () => {
      const {input, button, getByText} = setup();
      const testExpression = "(2x3)x5";
      fireEvent.change(input, {target: {value: testExpression}});
      userEvent.click(button);
      getByText('= 30');
    })

    it('Should evaluate an implied multiplication correctly (leading)', () => {
      const {input, button, getByText} = setup();
      const testExpression = "5(6+3)";
      fireEvent.change(input, {target: {value: testExpression}});
      userEvent.click(button);
      getByText('= 45');
    })

    it('Should evaluate an implied multiplication correctly (trailing)', () => {
      const {input, button, getByText} = setup();
      const testExpression = "(2+5)3";
      fireEvent.change(input, {target: {value: testExpression}});
      userEvent.click(button);
      getByText('= 21');
    })

    it('Should evaluate a double digit multiplication expression correctly', () => {
      const {input, button, getByText} = setup();
      const testExpression = "10*5";
      fireEvent.change(input, {target: {value: testExpression}});
      userEvent.click(button);
      getByText('= 50');
    })
  
    it('Should evaluate a multiply-by-zero expression correctly', () => {
      const {input, button, getByText} = setup();
      const testExpression = "4*0";
      fireEvent.change(input, {target: {value: testExpression}});
      userEvent.click(button);
      getByText('= 0');
    })
  })

  describe('Exponent tests', () => {
    it('Should evaluate an "raised to the power of X" expression correctly', () => {
      const {input, button, getByText} = setup();
      const testExpression = "8^4";
      fireEvent.change(input, {target: {value: testExpression}});
      userEvent.click(button);
      getByText('= 4096');
    })

    it('Should evaluate an "raised to the power of zero" expression correctly', () => {
      const {input, button, getByText} = setup();
      const testExpression = "8^0";
      fireEvent.change(input, {target: {value: testExpression}});
      userEvent.click(button);
      getByText('= 1');
    })
  })

  describe('Division tests', () => {
    it('Should evaluate a division expression correctly', () => {
      const {input, button, getByText} = setup();
      const testExpression = "(9/3)/3";
      fireEvent.change(input, {target: {value: testExpression}});
      userEvent.click(button);
      getByText('= 1');
    })

    it('Should evaluate a divide-by-zero expression correctly', () => {
      const {input, button, getByText} = setup();
      const testExpression = "3/0";
      fireEvent.change(input, {target: {value: testExpression}});
      userEvent.click(button);
      getByText('= undefined');
    })

    it('Should evaluate a zero-divided-by-a-number expression correctly', () => {
      const {input, button, getByText} = setup();
      const testExpression = "0/2";
      fireEvent.change(input, {target: {value: testExpression}});
      userEvent.click(button);
      getByText('= 0');
    })
  })

  describe('Complicated formula tests', () => {
    it('Should evaluate a complicated expression correctly', () => {
      const {input, button, getByText} = setup();
      const testExpression = "8*(5+2)/(5-1)";
      fireEvent.change(input, {target: {value: testExpression}});
      userEvent.click(button);
      getByText('= 14');
    })

    it('Should evaluate a complicated double digit expression correctly', () => {
      const {input, button, getByText} = setup();
      const testExpression = "(((10*5)/2)+5)10";
      fireEvent.change(input, {target: {value: testExpression}});
      userEvent.click(button);
      getByText('= 300');
    })

    it('Should evaluate a long expression with a big answer', () => {
      const {input, button, getByText} = setup();
      const testExpression = "(5)(5)(6-5)(3+4)(9+1)(3)(55)^100";
      fireEvent.change(input, {target: {value: testExpression}});
      userEvent.click(button);
      getByText('= 5.707267820568322e+177');
    })
  })

  describe('No parenthesis tests', () => {
    it('Should evaluate an expression without parentheses correctly (leading x)', () => {
      const {input, button, getByText} = setup();
      const testExpression = "3x5+1";
      fireEvent.change(input, {target: {value: testExpression}});
      userEvent.click(button);
      getByText('= 16');
    })

    it('Should evaluate an expression without parentheses correctly (trailing x)', () => {
      const {input, button, getByText} = setup();
      const testExpression = "1+3x5";
      fireEvent.change(input, {target: {value: testExpression}});
      userEvent.click(button);
      getByText('= 16');
    })

    it('Should evaluate an expression without parentheses correctly (leading /)', () => {
      const {input, button, getByText} = setup();
      const testExpression = "9/3+2";
      fireEvent.change(input, {target: {value: testExpression}});
      userEvent.click(button);
      getByText('= 5');
    })

    it('Should evaluate an expression without parentheses correctly (trailing /)', () => {
      const {input, button, getByText} = setup();
      const testExpression = "3+6/3";
      fireEvent.change(input, {target: {value: testExpression}});
      userEvent.click(button);
      getByText('= 5');
    })
  })
})

