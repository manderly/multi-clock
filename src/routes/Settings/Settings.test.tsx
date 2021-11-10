import {} from 'react';
import '@testing-library/jest-dom';
import {render} from '@testing-library/react';
import Settings from './Settings';

const setup = () => {
  const utils = render(<Settings />);
  return {
    ...utils,
  }
}

describe('Settings page', () => {
  it('Should have two radio buttons, one for 12-hour clock and 24-hour clock, when rendered', () => {
    const { getByRole } = setup();
    const displayOption12Hours = getByRole("radio", {name: 'option-12-hours'});
    const displayOption24Hours  = getByRole("radio", {name: 'option-24-hours'});
    expect(displayOption12Hours).toBeInTheDocument();
    expect(displayOption24Hours).toBeInTheDocument();
  })

})