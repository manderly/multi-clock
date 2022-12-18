import '@testing-library/jest-dom';
import {render, screen, within} from '@testing-library/react';
import ManageClockSettings from '../ManageClockSettings/ManageClockSettings';
import { ThemeProvider } from 'styled-components'
import { themeMap } from '../../components/Themes/Themes';
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import TimeProvider from "../../contexts/TimeContext";

describe('Settings', () => {

    const getRender = () => (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <ThemeProvider theme={themeMap["light"]}>
                <TimeProvider>
                    <ManageClockSettings />
                </TimeProvider>
            </ThemeProvider>
        </LocalizationProvider>
    );

    it('Should have two radio buttons, one for 12-hour clock and 24-hour clock, when rendered', () => {
        render(getRender());
        const displayOption12Hours = screen.getByRole("radio", { name: 'option-12-hours'});
        const displayOption24Hours  = screen.getByRole("radio", {name: 'option-24-hours'});
        expect(displayOption12Hours).toBeInTheDocument();
        expect(displayOption24Hours).toBeInTheDocument();
    });

    it('Should have a checkbox for toggling the "Show seconds on my clock" setting when rendered', () => {
        render(getRender());
        const showMySecondsCheckbox = screen.getByRole("checkbox", {name: 'option-show-my-seconds'});
        expect(showMySecondsCheckbox).toBeInTheDocument();
    });

    it('Should have a checkbox for toggling the "Show seconds on other clocks" setting when rendered', () => {
        render(getRender());
        const showOtherSecondsCheckbox = screen.getByRole("checkbox", {name: 'option-show-other-seconds'});
        expect(showOtherSecondsCheckbox).toBeInTheDocument();
    });

})