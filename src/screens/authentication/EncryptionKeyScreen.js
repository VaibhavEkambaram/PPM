import React from 'react'
import {Text, View} from "react-native";
import Style from "../../styles/Style";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {TextInputBox} from "../../components/TextInputBox";
import {ClickableButton} from "../../components/ClickableButton";

/**
 * Encryption Key Screen
 * @param setPassphrase encryption key setter
 * @param passphrase encryption key
 * @param setConfirmPassphrase confirm encryption key setter
 * @param confirmPassphrase confirm encryption key
 * @param onGenerateEncryptionKey encryption key generator method
 * @param copyEncryptionKey encryption key to clipboard method
 * @param onRegisterPress register method
 * @returns {JSX.Element} encryption key setup view
 */
export function EncryptionKeyScreen({
                                        setPassphrase,
                                        passphrase,
                                        setConfirmPassphrase,
                                        confirmPassphrase,
                                        onGenerateEncryptionKey,
                                        copyEncryptionKey,
                                        onRegisterPress
                                    }) {
    return (
        <View style={Style.container}>
            <KeyboardAwareScrollView
                style={{flex: 1, width: '100%'}}
                keyboardShouldPersistTaps="always">
                {/* Encryption Info Box */}
                <View style={Style.infoView}>
                    <Text style={Style.text}>Penguin Password Manager encrypts your information using
                        Advanced Encryption Standard.</Text>
                    <Text style={Style.text}>For this to work, an encryption key is needed.</Text>
                    <Text style={Style.text}>It is recommend that you copy this key for future
                        reference.</Text>
                    {/* Text Fields */}
                    <TextInputBox placeholder={'Encryption Passphrase'} textSetter={setPassphrase} value={passphrase}/>
                    <TextInputBox placeholder={'Confirm Encryption Passphrase'} textSetter={setConfirmPassphrase}
                                  value={confirmPassphrase}/>
                    {/* Buttons */}
                    <ClickableButton buttonText={"Auto Generate Encryption Key"}
                                     onPressMethod={onGenerateEncryptionKey}/>
                    <ClickableButton buttonText={"Copy Encryption Key to Clipboard"} onPressMethod={copyEncryptionKey}/>
                </View>
                {/* Complete Registration Button */}
                <ClickableButton buttonText={"Complete Registration"} onPressMethod={onRegisterPress}/>
            </KeyboardAwareScrollView>
        </View>
    );
}
