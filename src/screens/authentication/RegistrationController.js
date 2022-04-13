import React, {useState} from 'react'
import {Alert} from 'react-native'
import {RegistrationScreen} from "./RegistrationScreen";

/**
 * Controller Method for the Registration Screen
 * @param props application props
 * @returns {JSX.Element} registration screen view
 */
export default function RegistrationController(props) {
    // States to keep track of input text boxes
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    /**
     * Navigate back to the login screen if the footer link is pressed
     */
    const onFooterLinkPress = () => {
        props.navigation.navigate('Login')
    }

    /**
     * When the register button is pressed, then validate data then continue on to the encryption key setup screen.
     */
    const onRegisterPress = () => {
        // Check name input is at least one character long
        if (fullName.length < 1) {
            Alert.alert(
                "Invalid Name",
                "Please enter a valid name",
                [
                    {
                        text: "Return",
                        style: "cancel",
                    },
                ]
            );
            return;
        }

        // Check that the email address is valid using regex expression
        const reg = /^\w+([.-]?\w+)*@\w+([]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(email) !== true) {
            Alert.alert(
                "Invalid Email Address",
                "Please enter a valid email address",
                [
                    {
                        text: "Return",
                        style: "cancel",
                    },
                ]
            );
            return;
        }

        // Check the two password fields are equal
        if ((password !== confirmPassword)) {
            Alert.alert(
                "Passwords do not match",
                "Please make sure that the passwords you have entered match.",
                [
                    {
                        text: "Return",
                        style: "cancel",
                    },
                ]
            );
            return;
        }

        // Check that the password length is at least 8 characters long
        if (password.length < 8) {
            Alert.alert(
                "Specified password too short",
                "Please enter a password that is at least 8 characters in length.",
                [
                    {
                        text: "Return",
                        style: "cancel",
                    },
                ]
            );
            return;
        }

        // If all checks have been validated and succeed, then navigate to the encryption key setup
        // Full Name, Email and password details are passed through to this next screen which are later submitted to Firebase.
        props.navigation.navigate("CreateEncryptionKey", {
            fullName: fullName,
            email: email,
            password: password,
            confirmPassword: confirmPassword
        })
    }

    // Render Registration Screen view
    return (
        <RegistrationScreen setFullName={setFullName} fullName={fullName} setEmail={setEmail} email={email}
                            setPassword={setPassword} password={password} setConfirmPassword={setConfirmPassword}
                            confirmPassword={confirmPassword} onRegisterPress={onRegisterPress}
                            onFooterLinkPress={onFooterLinkPress}/>
    )
}
