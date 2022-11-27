import {FC, useContext} from "react";
import {TimezoneOption} from "../../data";
import {SettingsContext} from "../../contexts/SettingsContext";
import {Form} from "react-bootstrap";
import {ThemeButton, TimezonePicker} from "../index";

const ManageClockSettings: FC = () => {

    const {
        userTimezone,
        handleSetUserTimezone,
        hoursPref,
        handleSetHours,
        showMySecondsPref,
        handleShowMySeconds,
        showOtherSecondsPref,
        handleShowOtherSeconds,
        getBrowserTZ} = useContext(SettingsContext);

    const handleFormChange = (e: any) => {
        handleSetHours(Number(e?.target?.value));
    }

    const handleMySecondsCheckbox = (e: any) => {
        handleShowMySeconds(!showMySecondsPref);
    }

    const handleOtherSecondsCheckbox = (e: any) => {
        handleShowOtherSeconds(!showOtherSecondsPref);
    }

    const handleTimezoneChange = (tz: TimezoneOption) => {
        handleSetUserTimezone(tz);
    }

    const handleSetToBrowserTimezone = () => {
        const browserTZ = getBrowserTZ();
        handleSetUserTimezone(browserTZ);
    }

    return (
        <div className="preview-timezone-modal-contents">
            <div className="settings-container">
                <Form>
                    <Form.Check
                        inline
                        onChange={handleFormChange}
                        checked={hoursPref === 12}
                        value={12}
                        aria-label='option-12-hours'
                        label='12 hour clocks'
                        name='group1'
                        type='radio'
                        id='clock-type-12-hour'
                    />
                    <Form.Check
                        inline
                        onChange={handleFormChange}
                        checked={hoursPref === 24}
                        value={24}
                        aria-label='option-24-hours'
                        label='24 hour clocks'
                        name='group1'
                        type='radio'
                        id='clock-type-24-hour'
                    />
                </Form>
                <br/>
                <Form>
                    <Form.Check
                        onChange={handleMySecondsCheckbox}
                        checked={showMySecondsPref}
                        aria-label='option-show-my-seconds'
                        label='Show seconds on my clock'
                        type='checkbox'
                    />
                </Form>

                <Form>
                    <Form.Check
                        onChange={handleOtherSecondsCheckbox}
                        checked={showOtherSecondsPref}
                        aria-label='option-show-other-seconds'
                        label='Show seconds on other clocks'
                        type='checkbox'
                    />
                </Form>
                <br/>

                <div className="change-timezone modal-line">
                    <TimezonePicker changeTimezone={handleTimezoneChange} defaultTimezone={userTimezone}/>
                </div>
                <br/>
                <ThemeButton onClick={handleSetToBrowserTimezone}>Use Browser Timezone</ThemeButton>
            </div>
        </div>
    )
}

export default ManageClockSettings;