import React, {useState} from 'react'
import {Alert, View} from 'react-native'
import Style from "../../styles/Style";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {firebase} from "../../config/FirebaseConfig";
import {TextInputBox} from "../../components/TextInputBox";
import {ClickableButton} from "../../components/ClickableButton";

/**
 * Forgot Password Screen
 * @param props application props
 * @returns {JSX.Element} forgot password screen view
 */
export default function ForgotPasswordScreen(props) {
    // track email text input
    const [email, setEmail] = useState('')

    /**
     * Advisory Prompt once a password request has been sent.
     */
    const sentMessage = () => {
        Alert.alert(
            "Recovery Email Address Sent!",
            "If the address you submitted was valid, you should receive a link to recover your account.",
        );
    }

    /**
     * Confirmation Button Listener.
     * When pressed, send a password reset request for the email that has been requested.
     * For security reasons, the application will not display whether the email address is valid or not.
     */
    const onConfirmationPress = () => {
        firebase.auth().sendPasswordResetEmail(email)
            .then(() => {
                sentMessage(); // show advisory prompt after sending message
            })
            .catch(() => {
                sentMessage(); // even if the email is invalid, still show the advisory prompt to obfuscate emails.
            });

        // navigate back to the login screen
        props.navigation.navigate("Login")
    }

    /**
     * Return contents:
     * - Email Input Box
     * - Recovery Email Button
     */
    return (
        <View style={Style.container}>
            <KeyboardAwareScrollView
                style={{flex: 1, width: '100%'}}
                keyboardShouldPersistTaps="always">
                <TextInputBox placeholder={'E-mail Address'} textSetter={setEmail} value={email}/>
                <ClickableButton buttonText={"Send Recovery Email"} onPressMethod={onConfirmationPress}/>
            </KeyboardAwareScrollView>
        </View>
    )
}
