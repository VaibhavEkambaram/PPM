import React, {useState, useContext} from 'react'
import {View, Text, Alert} from 'react-native'
import SettingsContext from '../../contexts/SettingsContext';
import {ToggleSwitch} from "../../components/ToggleSwitch";
import Style from "../../styles/Style";
import {LengthSlider} from "../../components/LengthSlider";
import {ClickableButton} from "../../components/ClickableButton";

/**
 * Generate Password Options Menu.
 * This menu allows a user to change parameters related to the generation of passwords in the app.
 * This file does not control the actual generation or storage of options itself, but rather acts as a settings frontend
 * @param props application props
 * @returns {JSX.Element} options sliders and buttons render view
 * @constructor
 */
export default function GenerateScreen(props) {
    // Get stored settings from settings context
    const settingsContext = useContext(SettingsContext);

    // States to keep track of the status of slider settings
    // The default state when opening the menu is inherited from the settings context
    const [upperEnabled, setUpperEnabled] = useState(settingsContext.includeUppercase);
    const toggleUpperSwitch = () => setUpperEnabled(previousState => !previousState);

    const [lowerEnabled, setLowerEnabled] = useState(settingsContext.includeLowercase);
    const toggleLowerSwitch = () => setLowerEnabled(previousState => !previousState);

    const [numbersEnabled, setNumbersEnabled] = useState(settingsContext.includeNumbers);
    const toggleNumberSwitch = () => setNumbersEnabled(previousState => !previousState);

    const [symbolsEnabled, setSymbolsEnabled] = useState(settingsContext.includeSymbols);
    const toggleSymbolSwitch = () => setSymbolsEnabled(previousState => !previousState);

    // Password length adjuster option
    const [passwordLength, setPasswordLength] = useState(settingsContext.passwordLength);

    // Store previous screen for manual implementation of navigating back functionality
    let {previousScreen} = props.route.params


    /**
     * Return Screen Listener Function.
     * This function is executed when the update settings button is pressed. This is where we then want to update our
     * settings context to the new values we have provided.
     *
     * In the case of the user pressing the back button, the settings are not updated, so this is a way to "discord"
     * maladjusted settings or if the user changes their mind.
     */
    const returnScreen = () => {
        // Check that at least one character set is enabled
        if (upperEnabled || lowerEnabled || numbersEnabled || symbolsEnabled) {
            // Set password length
            settingsContext.passwordLength = passwordLength;

            // Set selected character sets
            settingsContext.includeUppercase = upperEnabled;
            settingsContext.includeLowercase = lowerEnabled;
            settingsContext.includeNumbers = numbersEnabled;
            settingsContext.includeSymbols = symbolsEnabled;

            // navigate back to the previous screen we passed in as a parameter earlier
            // I was using goBack for this earlier but it appeared to have some unexpected behaviour
            // So im using this in place
            props.navigation.navigate(previousScreen);
        } else {
            // Show an error and stay on this page if no character sets are selected
            Alert.alert(
                "No character types selected",
                "In order for password generation to work, at least one character type must be selected.",
            );
        }
    }

    /**
        Return content:
        - Password Length slider and number
        - Uppercase characters enabled slider
        - Lowercase characters enabled slider
        - Number characters enabled slider
        - Symbol characters enabled slider
        - Update settings button
     */
    return (
        <View style={Style.generateContainer}>
            <Text style={Style.text}>Password Length</Text>
            <Text style={Style.passwordLengthText}>{passwordLength}</Text>
            <LengthSlider value={passwordLength} setter={setPasswordLength}/>
            <ToggleSwitch text={"Include Uppercase Characters"} enabledStatus={upperEnabled} switchValue={toggleUpperSwitch}/>
            <ToggleSwitch text={"Include Lowercase Characters"} enabledStatus={lowerEnabled} switchValue={toggleLowerSwitch}/>
            <ToggleSwitch text={"Include Number Characters"} enabledStatus={numbersEnabled} switchValue={toggleNumberSwitch}/>
            <ToggleSwitch text={"Include Symbol Characters"} enabledStatus={symbolsEnabled} switchValue={toggleSymbolSwitch}/>
            <ClickableButton buttonText={"Update Settings"} onPressMethod={returnScreen}/>
        </View>
    )
}
