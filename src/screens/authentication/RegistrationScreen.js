import React from 'react'
import {Text, TextInput, View} from "react-native";
import Styles from "../../styles/Style";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {TextInputBox} from "../../components/TextInputBox";
import {ClickableButton} from "../../components/ClickableButton";

/**
 * Registration Screen
 * @param setFullName user full name setter
 * @param fullName user full name
 * @param setEmail set email address
 * @param email email address
 * @param setPassword password setter
 * @param password password
 * @param setConfirmPassword confirm password setter
 * @param confirmPassword confirm password
 * @param onRegisterPress register button listener function
 * @param onFooterLinkPress footer button listener function
 * @returns {JSX.Element} registration view
 */
export function RegistrationScreen({setFullName, fullName, setEmail, email, setPassword, password, setConfirmPassword, confirmPassword, onRegisterPress, onFooterLinkPress}){
    return (
        <View style={Styles.container}>
            <KeyboardAwareScrollView
                style={{ flex: 1, width: '100%' }}
                keyboardShouldPersistTaps="always">

                {/* Text input fields */}
                <TextInputBox placeholder={'Full Name'} textSetter={setFullName} value={fullName}/>
                <TextInputBox placeholder={'E-mail'} textSetter={setEmail} value={email}/>

                <TextInput
                    style={Styles.input}
                    placeholderTextColor="#aaaaaa"
                    secureTextEntry
                    placeholder='Password'
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={Styles.input}
                    placeholderTextColor="#aaaaaa"
                    secureTextEntry
                    placeholder='Confirm Password'
                    onChangeText={(text) => setConfirmPassword(text)}
                    value={confirmPassword}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />

                {/* Continue Button */}
                <ClickableButton buttonText={"Continue"} onPressMethod={onRegisterPress}/>

                {/* Footer Link */}
                <View style={Styles.footerView}>
                    <Text style={Styles.footerText}><Text onPress={onFooterLinkPress} style={Styles.footerLink}>Already have an account? Log in</Text></Text>
                </View>
            </KeyboardAwareScrollView>
        </View>
    );
}
