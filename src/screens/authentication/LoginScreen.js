import React, {useContext, useEffect, useState} from 'react'
import {Alert, Text, TextInput, TouchableOpacity, View} from 'react-native'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import {AuthContext} from "../../contexts/AuthContext"
import Style from "../../styles/Style";
import {firebase} from "../../config/FirebaseConfig";
import * as LocalAuthentication from 'expo-local-authentication';
import {TextInputBox} from "../../components/TextInputBox";

/**
 * Login Screen
 * @param props application props
 * @returns {JSX.Element} login screen view
 */
export default function LoginScreen(props) {
    // States to keep track of the email and password text inputs
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    // User authentication context
    const {signIn} = useContext(AuthContext);

    // Keep track of whether to enable biometric authentication or not
    let biometricsEnabled = false;

    // On entering this page, determine whether biometrics should be enabled or not
    useEffect(() => {
        firebase.auth().onAuthStateChanged(user => {
            biometricsEnabled = !!user;
            // enable biometrics based on whether a user is present in the state
            if (user) {
                biometricsEnabled = true;
            } else {
                biometricsEnabled = false;
            }
        });

        let compatible = LocalAuthentication.hasHardwareAsync().then(); // check hardware supports biometrics
        let biometricRecords = LocalAuthentication.isEnrolledAsync() // check phone has biometrics enrolled
        if (!compatible) {
            biometricsEnabled = false;
        }

        if (!biometricRecords) {
            biometricsEnabled = false;
        }
    });

    /**
     * When the 'Sign In with Biometrics' Button has been pressed, handle biometric authentication.
     * @returns {Promise<void>} promise
     */
    const handleBiometrics = async () => {
        // check biometrics are enabled
        if (biometricsEnabled) {
            // Send authentication request and get response
            let result = await LocalAuthentication.authenticateAsync({
                disableDeviceFallback: true,
                fallbackLabel: "\n",
                promptMessage: "Sign back in to the previous account",
                cancelLabel: 'Cancel',
            });
            // if successfully authenticated then sign in to previously stored user
            if (result.success) {
                props.executeBiometrics();
            // Otherwise show an error message showing authentication failure
            } else {
                Alert.alert(
                    "Failed to Authenticate",
                    "Could not authenticate with biometric credentials. Please sign in using your email address and password.",
                    [
                        {
                            text: "Return",
                            style: "cancel",
                        },
                    ]
                );
            }
            // Otherwise state that biometric authentication is not available
        } else {
            Alert.alert(
                "Could not sign in",
                "Biometric authentication not available. Please sign in using your email address and password.",
                [
                    {
                        text: "Return",
                        style: "cancel",
                    },
                ]
            );
        }
    }

    /**
     * Listener method for Footer Link - Go to the Registration Screen.
     */
    const onFooterLinkPress = () => {
        props.navigation.navigate('Registration')
    }

    /**
     * Listner Method for Forgot Password Link - Go to the Forgot Password Screen.
     */
    const onForgotPasswordLinkPress = () => {
        props.navigation.navigate('ForgotPassword')
    }

    /**
     * Return contents:
     * - Email Address Input Box
     * - Password Input Box
     * - Sign in button
     * - Biometric sign in button
     * - Create a new account footer
     * - Forgot password footer
     */
    return (
        <View style={Style.container}>

            <KeyboardAwareScrollView
                style={{flex: 1, width: '100%'}}
                keyboardShouldPersistTaps="always">

                {/* Text input boxes */}
                <TextInputBox placeholder={'Email Address'} textSetter={setEmail} value={email}/>

                <TextInput
                    style={Style.input}
                    placeholderTextColor="#aaaaaa"
                    secureTextEntry
                    placeholder='Password'
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />

                {/* Sign in buttons */}
                <TouchableOpacity
                    style={Style.button}
                    onPress={() => signIn({email, password})}>
                    <Text style={Style.buttonTitle}>Sign in</Text>
                </TouchableOpacity>

                <TouchableOpacity style={Style.button} onPress={() => handleBiometrics()}>
                    <Text style={Style.buttonTitle} enabled={biometricsEnabled}>Sign back in with Biometrics</Text>
                </TouchableOpacity>

                {/* Footer Links */}
                <View style={Style.footerView}>
                    <Text style={Style.footerText}><Text onPress={onFooterLinkPress} style={Style.footerLink}>Create a new account</Text></Text>
                    <Text style={Style.footerText}><Text onPress={onForgotPasswordLinkPress} style={Style.footerLink}>Forgot password?</Text></Text>
                </View>
            </KeyboardAwareScrollView>
        </View>
    )
}
