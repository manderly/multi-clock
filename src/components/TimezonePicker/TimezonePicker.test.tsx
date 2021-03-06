import '@testing-library/jest-dom';
import { render, screen, within } from '@testing-library/react';
import  userEvent, { specialChars } from '@testing-library/user-event';

import TimezonePicker from './TimezonePicker';
import MockDate from 'mockdate';
import { allTimezones } from '../../data';

const changeTimezoneMock = () => {}

// value: 'America/Los_Angeles'
// label: '🇺🇸 U.S. Pacific Time'
// utc: '(GMT -08:00) '
const testTimezone = allTimezones[0];

describe('Timezone Picker component', () => {
  beforeEach(() => {
    global.localStorage.clear();    
  })

  afterEach(() => {
    MockDate.reset();
  })

  it('Should display the currently selected timezone', () => {
    render(<TimezonePicker changeTimezone={changeTimezoneMock} defaultTimezone={testTimezone}/>);
    expect(screen.getByRole('textbox', {name: 'choose timezone'})).toBeInTheDocument();
    expect(screen.queryByPlaceholderText('Change timezone...')).toBeInTheDocument();
  })

  it('Should filter the timezone list in response to user input', () => {
    render(<TimezonePicker changeTimezone={changeTimezoneMock} defaultTimezone={testTimezone}/>);
    const input = screen.getByRole('textbox', {name: 'choose timezone'});
    // get list original length
    userEvent.click(input);
    const list = screen.getByRole("list", { name: 'timezones'});
    const originalTimezones = within(list).getAllByRole('listitem');

    // enter some filtering input and verify the new list is shorter 
    userEvent.type((input), 'pac');
    const filteredList = screen.getByRole("list", { name: 'timezones'});
    const filteredTimezones = within(filteredList).getAllByRole("listitem");
    expect(filteredTimezones.length).toBeLessThan(originalTimezones.length);
  })

  it('Should change the timezone by clicking a different one in the list', () => {
    render(<TimezonePicker changeTimezone={changeTimezoneMock} defaultTimezone={testTimezone}/>);
    const originalTimezone = screen.getByTestId('current timezone').textContent;
    const input = screen.getByRole('textbox', {name: 'choose timezone'});
    // display the list of options
    userEvent.click(input);
    const list = screen.getByRole("list", { name: 'timezones'});
    const timezones = within(list).getAllByRole('listitem');
    // click a different option
    userEvent.click(timezones[3]);
  
    // verify the timezone has changed
    const newTimezone = screen.getByTestId('current timezone').textContent;
    expect(newTimezone).not.toEqual(originalTimezone);
  })

  it('Should change the timezone via keyboard (down and enter)', () => {
    render(<TimezonePicker changeTimezone={changeTimezoneMock} defaultTimezone={testTimezone}/>);
    const input = screen.getByRole('textbox', {name: 'choose timezone'});
    // display the list of options
    userEvent.click(input);
    const list = screen.getByRole("list", { name: 'timezones'});
    const timezones = within(list).getAllByRole('listitem');
    const targetTimezone  = timezones[2].textContent as string;
    // key down and key up
    userEvent.type((input), specialChars.arrowDown);
    userEvent.type((input), specialChars.arrowDown);
    userEvent.type((input), specialChars.arrowUp);
    userEvent.type((input), specialChars.arrowDown);
    // press enter
    userEvent.type((input), specialChars.enter);
    // verify the timezone has changed to match selected
    const newTimezone = screen.getByTestId('current timezone');
    expect(newTimezone).toHaveTextContent(targetTimezone);
  })

  it('Should toggle the timezone list open/closed in response to user inputs', () => {
    render(<TimezonePicker changeTimezone={changeTimezoneMock} defaultTimezone={testTimezone}/>);
    const input = screen.getByRole('textbox', {name: 'choose timezone'});
    // open the list by clicking on it 
    userEvent.click(input);
    const list = screen.getByRole("list", { name: 'timezones'});
    expect(list).toBeInTheDocument();

    // now close the list with 'enter'
    userEvent.type((input), specialChars.enter);
    expect(list).not.toBeInTheDocument();

    // reopen the list with 'enter'
    userEvent.type((input), specialChars.enter);
    const reopenedList = screen.getByRole("list", { name: 'timezones'});
    expect(reopenedList).toBeInTheDocument();
  })

  it('Should navigate within a filtered list via the keyboard', () => {
    render(<TimezonePicker changeTimezone={changeTimezoneMock} defaultTimezone={testTimezone}/>);
    const input = screen.getByRole('textbox', {name: 'choose timezone'});

    // open the list by clicking on it 
    userEvent.click(input);
    const list = screen.getByRole("list", { name: 'timezones'});
    expect(list).toBeInTheDocument();

    // filter the input and make record of the filtered list contents
    userEvent.type((input), 'aus');
    const filteredTimezones = within(list).getAllByRole('listitem');
    const targetTimezone = filteredTimezones[3].textContent as string;
    
    // key down and key up
    userEvent.type((input), specialChars.arrowDown);
    userEvent.type((input), specialChars.arrowDown);
    userEvent.type((input), specialChars.arrowDown);
    userEvent.type((input), specialChars.arrowUp);
    userEvent.type((input), specialChars.arrowDown);
    // press enter
    userEvent.type((input), specialChars.enter);
    // verify the timezone has changed to match selected
    const newTimezone = screen.getByTestId('current timezone');
    expect(newTimezone).toHaveTextContent(targetTimezone);
  })
})
