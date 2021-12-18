import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';
import Settings from './Settings';

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

})