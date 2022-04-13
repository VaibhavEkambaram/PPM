import React from 'react'
import {View} from "react-native";
import Style from "../../styles/Style";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {TextInputBox} from "../../components/TextInputBox";
import {Picker} from "@react-native-picker/picker";
import {colourPalette} from "../../constants/ColourPalette";
import {ClickableButton} from "../../components/ClickableButton";

/**
 * Add Password Screen
 * @param setPasswordEntryName entry name setter
 * @param passwordEntryName entry name
 * @param setUsernameText username setter
 * @param usernameText username
 * @param setPasswordText password setter
 * @param passwordText password
 * @param selectedColour colour
 * @param setSelectedColour colour setter
 * @param handleGeneratePassword password generator function
 * @param onGenerateButtonPress password generator options function
 * @param onAddButtonPress add password function
 * @returns {JSX.Element} add screen
 */
export function AddPasswordScreen({
                                     setPasswordEntryName,
                                     passwordEntryName,
                                     setUsernameText,
                                     usernameText,
                                     setPasswordText,
                                     passwordText,
                                     selectedColour,
                                     setSelectedColour,
                                     handleGeneratePassword,
                                     onGenerateButtonPress,
                                     onAddButtonPress
                                 }) {
    return (
        <View style={Style.container}>
            <KeyboardAwareScrollView
                style={{flex: 1, width: '100%'}}
                keyboardShouldPersistTaps="always">

                {/* Entity Text Input Fields */}
                <TextInputBox placeholder={'Name'} textSetter={setPasswordEntryName} value={passwordEntryName}/>
                <TextInputBox placeholder={'Username / Email'} textSetter={setUsernameText} value={usernameText}/>
                <TextInputBox placeholder={'Password'} textSetter={setPasswordText} value={passwordText}/>

                {/* Colour Picker */}
                <Picker style={Style.picker}
                        selectedValue={selectedColour}
                        mode={'dialog'}
                        onValueChange={(colour) => {
                            setSelectedColour(colour)
                        }}>
                    {
                        colourPalette.map(colour => <Picker.Item label={colour.label} value={colour.colour}
                                                                 key={colour.label}/>)
                    }
                </Picker>

                {/* Buttons */}
                <ClickableButton buttonText={"Auto Generate Password"} onPressMethod={handleGeneratePassword}/>
                <ClickableButton buttonText={"Settings"} onPressMethod={onGenerateButtonPress}/>
                <ClickableButton buttonText={"Add"} onPressMethod={onAddButtonPress}/>
            </KeyboardAwareScrollView>
        </View>
    );
}
