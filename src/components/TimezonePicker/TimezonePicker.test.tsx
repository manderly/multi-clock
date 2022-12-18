import '@testing-library/jest-dom';
import {render, screen, waitFor, within} from '@testing-library/react';
import  userEvent, { specialChars } from '@testing-library/user-event';

import TimezonePicker from './TimezonePicker';
import MockDate from 'mockdate';
import { allTimezones } from '../../data';

// value: 'America/Los_Angeles'
// label: '🇺🇸 U.S. Pacific Time'
// utc: '(GMT -08:00) '
const testTimezone = allTimezones[0];

describe('Timezone Picker component', () => {
  const changeTimezoneMock = jest.fn();

  beforeEach(() => {
    global.localStorage.clear();    
  })

  afterEach(() => {
    MockDate.reset();
  })

  it('Should change the timezone via keyboard (down and enter)', async () => {
    render(<TimezonePicker changeTimezone={changeTimezoneMock} defaultTimezone={testTimezone}/>);
    const timezoneSelect = screen.getByTestId("timezone-picker");
    const timezoneSelectButton = within(timezoneSelect).getByRole('button');
    userEvent.click(timezoneSelectButton);
    await waitFor(() => expect(screen.getAllByText('(GMT -08:00) 🇺🇸 U.S. Pacific Time').length).toBeGreaterThan(0));
    expect(screen.getByText('(GMT -07:00) 🇺🇸 U.S. Mountain Time - Arizona')).toBeInTheDocument();
    expect(screen.getByText('(GMT -07:00) 🇺🇸 U.S. Mountain Time')).toBeInTheDocument();

    const listItems = screen.getAllByRole('option');
    expect(listItems.length).toEqual(allTimezones.length);

    userEvent.click(screen.getByText('(GMT -06:00) 🇺🇸 U.S. Central Time'));
    // verify the timezone has changed to match selected
    await waitFor(() => expect(screen.queryByText('(GMT -07:00) 🇺🇸 U.S. Mountain Time')).not.toBeInTheDocument());
    expect(screen.getByText('(GMT -06:00) 🇺🇸 U.S. Central Time')).toBeInTheDocument();
  });
})
