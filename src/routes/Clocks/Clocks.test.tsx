import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import  userEvent, { specialChars } from '@testing-library/user-event';

import Clocks from './Clocks';
import MockDate from 'mockdate';
import TimeProvider from '../../contexts/TimeContext';

import { ThemeProvider } from 'styled-components'
import { themeMap } from '../../components/Themes/Themes';
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";

describe('Clocks component', () => {
  const props = {
    handleTogglePreviewTimeGlobal: jest.fn(),
    showPreviewTimeGlobal: false,
    setShowClockSettingsModal: jest.fn(),
  }

  const getRender = () => (
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <ThemeProvider theme={themeMap["light"]}>
          <TimeProvider>
            <Clocks {...props} /></TimeProvider>
        </ThemeProvider>
      </LocalizationProvider>
  );

  beforeEach(() => {
    MockDate.set(new Date(1474463400000));
    global.localStorage.clear();    
  })

  afterEach(() => {
    MockDate.reset();
  })

  it('Should have four clocks by default', () => {
    render(getRender());
    expect(screen.getAllByTestId('single-clock')).toHaveLength(4);
  })

  it('Should add another clock when Add Clock button is clicked', () => {
    render(getRender());
    fireEvent.click(screen.getByTestId('add-clock-button'));
    expect(screen.getAllByTestId('single-clock')).toHaveLength(5);
  })

  it('Should delete a clock', () => {
    const expected = '6:10';
    render(getRender());
    userEvent.click(screen.getByText(expected));
    const deleteButton = screen.getByRole('button', {name: 'delete clock button'});
    userEvent.click(deleteButton);
    expect(screen.queryByText(expected)).not.toBeInTheDocument();
    expect(screen.getAllByTestId('single-clock')).toHaveLength(3);
  })

  describe('Clock management modal', () => {
    it('Should open the clock management modal when the user clicks the clock nickname', () => {
      render(getRender());
      const clockNicknameButtons = screen.getAllByRole('button', {name: 'single clock nickname button'});
      userEvent.click(clockNicknameButtons[0]);
      expect(screen.getByText('Manage clock')).toBeInTheDocument();
    });

    it('Should rename a clock from the clock management modal with enter', () => {
      render(getRender());
      userEvent.click(screen.getByText('6:10'));
      // ok to use on-screen user-readable label here
      const clockNameInput = screen.getByRole('textbox', {name: 'Clock nickname'});
      userEvent.clear(clockNameInput);
      userEvent.type((clockNameInput), `Test Name${specialChars.enter}`);
      userEvent.click(screen.getByRole('button', {name: 'Close'}));
      expect(screen.getAllByText('Test Name')).toHaveLength(1);
    });

    it('Should rename a clock from the clock management modal with escape', () => {
      render(getRender());
      userEvent.click(screen.getByText('6:10'));
      // ok to use on-screen user-readable label here
      const clockNameInput = screen.getByRole('textbox', {name: 'Clock nickname'});
      userEvent.clear(clockNameInput);
      userEvent.type((clockNameInput), `Esc Test${specialChars.escape}`); // closes modal
      expect(screen.getAllByText('Esc Test')).toHaveLength(1);
    });

    it('Should name a clock after its timezone if the user empties the nickname field', () => {
      render(getRender());
      userEvent.click(screen.getByText('6:10'));
      const clockNameInput = screen.getByRole('textbox', {name: 'Clock nickname'});
      userEvent.clear(clockNameInput);
      userEvent.tab();
      expect(screen.getByText('Manage clock')).toBeInTheDocument(); // verify modal didn't close
      expect(clockNameInput).toHaveValue('🇺🇸 U.S. Pacific Time'); // verify timezone was autofilled into empty field
    });
  });

  it('Should preview a time in a specified timezone', () => {
    render(getRender());
    const clickTogglePreviewTimeAll = screen.getAllByTestId('toggle-preview-time');
    userEvent.click(clickTogglePreviewTimeAll[0]);
    expect(clickTogglePreviewTimeAll[0]).toHaveTextContent('When it is 7:30am in 🇺🇸 U.S. Pacific Time, it will be 5:30am here.');
    expect(clickTogglePreviewTimeAll[1]).not.toHaveTextContent('When it is');
  })

})
