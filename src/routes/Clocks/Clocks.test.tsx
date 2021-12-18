import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import  userEvent from '@testing-library/user-event';

import Clocks from './Clocks';
import MockDate from 'mockdate';
import TimeProvider from '../../contexts/TimeContext';

describe('Clocks component', () => {
  beforeEach(() => {
    MockDate.set(new Date(1474463400000));

    global.localStorage.clear();    
  })

  afterEach(() => {
    MockDate.reset();
  })

  it('Should have four clocks by defaullt', () => {
    render(<TimeProvider><Clocks /></TimeProvider>);
    //screen.debug();
    expect(screen.getAllByRole('heading', {name: 'clock date display'})).toHaveLength(4);
  })

  it('Should add another clock when Add Clock button is clicked', () => {
    render(<TimeProvider><Clocks /></TimeProvider>);
    fireEvent.click(screen.getByText('Add Clock'));
    expect(screen.getAllByRole('heading', {name: 'clock date display'})).toHaveLength(5);
  })

  it('Should rename a clock', () => {
    render(<TimeProvider><Clocks /></TimeProvider>);
    const clockNames = screen.getAllByRole('button', {name: 'clock nickname display'});
    userEvent.click(clockNames[0]);
    const clockNameInput = screen.getByRole('textbox');
    userEvent.type((clockNameInput), "Test Name");
  })

  it('Should delete a clock', () => {
    // due to the mocking of Date, each clock displays the following times:
    // 6:10 am, 8:10 am, 3:10 pm, 11:10 pm
    // deleting the first clock means we expect to no longer have the 6:10 clock on the screen
    const expected = '6:10 am';
    render(<TimeProvider><Clocks /></TimeProvider>);
    // verify the clock to delete is present
    const clockToDelete = screen.getByText(expected);
    expect(clockToDelete).toBeInTheDocument();
    // get all the clock links
    const clockModalLinks = screen.getAllByRole('button', {name: 'clock timestamp'});
    userEvent.click(clockModalLinks[0]);
    // modal should be open now
    const deleteButton = screen.getByRole('button', {name: 'delete clock button'});
    userEvent.click(deleteButton);
    // modal should close after clicking delete
    expect(screen.getAllByRole('heading', {name: 'clock date display'})).toHaveLength(3);
    const deletedClock = screen.queryByText(expected);
    expect(deletedClock).not.toBeInTheDocument();
  })

})
