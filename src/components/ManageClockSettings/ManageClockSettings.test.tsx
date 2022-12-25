import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';
import  userEvent from '@testing-library/user-event';
import ManageClockSettings from '../ManageClockSettings/ManageClockSettings';
import { ThemeProvider } from 'styled-components'
import { themeMap } from '../../components/Themes/Themes';
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import TimeProvider from "../../contexts/TimeContext";
import SettingsProvider from "../../contexts/SettingsContext";

describe('Manage clock settings', () => {

    const props = {
        handleSetHours: jest.fn(),
        handleMySecondsCheckbox: jest.fn(),
    }

    const getRender = () => (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <ThemeProvider theme={themeMap["light"]}>
                <SettingsProvider handleSetTheme={jest.fn()}>
                    <TimeProvider>
                        <ManageClockSettings />
                    </TimeProvider>
                </SettingsProvider>
            </ThemeProvider>
        </LocalizationProvider>
    );

    it('"12" and "24" hour clock options', () => {
        render(getRender());
        const displayOption12Hours = screen.getByRole("radio", { name: 'option-12-hours'});
        const displayOption24Hours  = screen.getByRole("radio", {name: 'option-24-hours'});
        expect(displayOption12Hours).toBeInTheDocument();
        expect(displayOption12Hours).toBeChecked();
        expect(displayOption24Hours).not.toBeChecked();
        expect(displayOption24Hours).toBeInTheDocument();
        userEvent.click(displayOption24Hours);
        expect(displayOption12Hours).not.toBeChecked();
        expect(displayOption24Hours).toBeChecked();
    });

    it('"Show seconds" options checkboxes"', () => {
        render(getRender());
        const showMySecondsCheckbox = screen.getByRole("checkbox", {name: 'option-show-my-seconds'});
        const showOtherSecondsCheckbox = screen.getByRole("checkbox", {name: 'option-show-other-seconds'});
        expect(showMySecondsCheckbox).toBeInTheDocument();
        expect(showOtherSecondsCheckbox).toBeInTheDocument();
        expect(showMySecondsCheckbox).not.toBeChecked();
        expect(showOtherSecondsCheckbox).not.toBeChecked();
        userEvent.click(showMySecondsCheckbox);
        userEvent.click(showOtherSecondsCheckbox);
        expect(showMySecondsCheckbox).toBeChecked();
        expect(showOtherSecondsCheckbox).toBeChecked();
    });

    it('Timezone select and button', () => {
        render(getRender());
        const timezoneSelect = screen.getByTestId('timezone-picker');
        expect(timezoneSelect).toBeInTheDocument();
        const useBrowserTimezoneButton = screen.getByRole('button', { name: 'Use Browser Timezone'});
        expect(useBrowserTimezoneButton).toBeInTheDocument();
    });
})