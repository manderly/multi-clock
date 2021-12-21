import '@testing-library/jest-dom';
import {render, screen, within} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Settings from './Settings';
import SettingsProvider from '../../contexts/SettingsContext';

describe('Settings page', () => {
  it('Should have two radio buttons, one for 12-hour clock and 24-hour clock, when rendered', () => {
    render(<Settings />);
    const displayOption12Hours = screen.getByRole("radio", { name: 'option-12-hours'});
    const displayOption24Hours  = screen.getByRole("radio", {name: 'option-24-hours'});
    expect(displayOption12Hours).toBeInTheDocument();
    expect(displayOption24Hours).toBeInTheDocument();
  })

  it('Should have a checkbox for toggling the "Show seconds on my clock" setting when rendered', () => {
    render(<Settings />);
    const showMySecondsCheckbox = screen.getByRole("checkbox", {name: 'option-show-my-seconds'});
    expect(showMySecondsCheckbox).toBeInTheDocument();
  })

  it('Should have a checkbox for toggling the "Show seconds on other clocks" setting when rendered', () => {
    render(<Settings />);
    const showOtherSecondsCheckbox = screen.getByRole("checkbox", {name: 'option-show-other-seconds'});
    expect(showOtherSecondsCheckbox).toBeInTheDocument();
  })

  it('Should use browser timezone when Use Browser Timezone is clicked', () => {
    // this test would be better if it forced the test browser's timezone to be something in particular
    // without this, there's a chance the test will be run in the same timezone it picks out of the list 
    render(<SettingsProvider><Settings /></SettingsProvider>);
    const changeTimezoneButton = screen.getByRole('button', {name: /Change timezone/i});
    userEvent.click(changeTimezoneButton);
    // modal is now open
    const useBrowserTimezoneButton = screen.getByRole('button', {name: /Use Browser Timezone/i});
    userEvent.click(useBrowserTimezoneButton);
    // get the text inside the element named 'current timezone' - we don't know what timezone the test is being
    // run in, so we can't count on it having specific text
    const originalUserTimezone = screen.getByTestId('current timezone').textContent;
    // now change the timezone using the dropdown
    const changeTimezoneInput = screen.getByRole('textbox', {name: 'choose timezone'});
    userEvent.click(changeTimezoneInput);
    // get an element that (hopefully) does not match the test browser's timezone
    // display the list of options
    const list = screen.getByRole("list", { name: 'timezones'});
    const timezones = within(list).getAllByRole('listitem');
    // click a different option
    userEvent.click(timezones[16]);
    const updatedUserTimezone = screen.getByTestId('current timezone').textContent;
    // verify the displayed timezone does not match original timezone
    expect(updatedUserTimezone).not.toEqual(originalUserTimezone);
    // now reset back to browser timezone
    userEvent.click(useBrowserTimezoneButton);
    const backToBrowserTimezone = screen.getByTestId('current timezone').textContent;
    expect(backToBrowserTimezone).toEqual(originalUserTimezone);
  })

})