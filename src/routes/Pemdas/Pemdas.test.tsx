import {} from 'react';
import '@testing-library/jest-dom';
import { fireEvent, getByText, render, screen } from '@testing-library/react';
import Pemdas from './Pemdas';
import userEvent from '@testing-library/user-event';

const setup = () => {
  const utils = render(<Pemdas />);
  const input = utils.getByRole("textbox", {name: "calculator-input"});
  const button = utils.getByRole("button", {name: "calculator-button"});
  return {
    input,
    button,
    ...utils,
  }
}

describe('PEMDAS page', () => {

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
    getByText('11');
  })

  it('Should evaluate a subtraction expression correctly', () => {
    const {input, button, getByText} = setup();
    const testExpression = "(8-1)-2";
    fireEvent.change(input, {target: {value: testExpression}});
    userEvent.click(button);
    getByText('5');
  })

})