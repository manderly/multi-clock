import '@testing-library/jest-dom';
import { fireEvent, getByText, render, screen } from '@testing-library/react';
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

  it('Should evaluate an addition expression correctly', () => {
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

  it('Should evaluate a multiplication expression correctly', () => {
    const {input, button, getByText} = setup();
    const testExpression = "(2*3)*5";
    fireEvent.change(input, {target: {value: testExpression}});
    userEvent.click(button);
    getByText('= 30');
  })

  it('Should evaluate a division expression correctly', () => {
    const {input, button, getByText} = setup();
    const testExpression = "(9/3)/3";
    fireEvent.change(input, {target: {value: testExpression}});
    userEvent.click(button);
    getByText('= 1');
  })

  it('Should evaluate a complicated expression correctly', () => {
    const {input, button, getByText} = setup();
    const testExpression = "8*(5+2)/(5-1)";
    fireEvent.change(input, {target: {value: testExpression}});
    userEvent.click(button);
    getByText('= 14');
  })

  it('Should evaluate a double digit expression correctly', () => {
    const {input, button, getByText} = setup();
    const testExpression = "10*5";
    fireEvent.change(input, {target: {value: testExpression}});
    userEvent.click(button);
    getByText('= 50');
  })

  it('Should evaluate a complicated double digit expression correctly', () => {
    const {input, button, getByText} = setup();
    const testExpression = "(((10*5)/2)+5)*10";
    fireEvent.change(input, {target: {value: testExpression}});
    userEvent.click(button);
    getByText('= 300');
  })

})