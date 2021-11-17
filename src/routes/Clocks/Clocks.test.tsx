import '@testing-library/jest-dom';
import { fireEvent, getByText, render, screen } from '@testing-library/react';
import Clocks from './Clocks';
import userEvent from '@testing-library/user-event';

describe('Clocks component', () => {

  it('Should have four clocks by defaullt', () => {
    render(<Clocks />);
    expect(screen.getAllByRole('heading', {name: 'clock date display'})).toHaveLength(4);
  })

  it('Should add another clock when Add Clock button is clicked', () => {
    render(<Clocks />);
    fireEvent.click(screen.getByText('Add Clock'));
    expect(screen.getAllByRole('heading', {name: 'clock date display'})).toHaveLength(5);
  })
})
