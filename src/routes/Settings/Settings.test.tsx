import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';
import  userEvent from '@testing-library/user-event';
import Settings from '../Settings/Settings';
import { ThemeProvider } from 'styled-components'
import { themeMap } from '../../components/Themes/Themes';
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import TimeProvider from "../../contexts/TimeContext";
import SettingsProvider from "../../contexts/SettingsContext";

describe('Settings', () => {
    let handleSetThemeSpy = jest.fn();

    beforeEach(() => {
        handleSetThemeSpy.mockReset();
    })

    const getRender = () => (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <ThemeProvider theme={themeMap["light"]}>
                <SettingsProvider handleSetTheme={handleSetThemeSpy}>
                    <TimeProvider>
                        <Settings />
                    </TimeProvider>
                </SettingsProvider>
            </ThemeProvider>
        </LocalizationProvider>
    );

    it('Renders and clicks', () => {
        render(getRender());
        const themeButtonLight = screen.getByRole("button", { name: 'THEME: Light'});
        expect(themeButtonLight).toBeInTheDocument();
        userEvent.click(themeButtonLight);
        expect(handleSetThemeSpy).toBeCalledWith("light");

        const themeButtonDark = screen.getByRole("button", { name: 'THEME: Dark'});
        expect(themeButtonDark).toBeInTheDocument();
        userEvent.click(themeButtonDark);
        expect(handleSetThemeSpy).toBeCalledWith("dark");

        const themeButtonBerry = screen.getByRole("button", { name: 'THEME: Berry'});
        expect(themeButtonBerry).toBeInTheDocument();
        userEvent.click(themeButtonBerry);
        expect(handleSetThemeSpy).toBeCalledWith("berry");

        const themeButtonBlue = screen.getByRole("button", { name: 'THEME: Blue'});
        expect(themeButtonBlue).toBeInTheDocument();
        userEvent.click(themeButtonBlue);
        expect(handleSetThemeSpy).toBeCalledWith("blue");
    });
})