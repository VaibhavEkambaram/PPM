import React, {useContext, useEffect, useState} from 'react'
import {Alert} from 'react-native'
import {firebase} from '../../config/FirebaseConfig'
import SettingsContext from '../../contexts/SettingsContext';
import CryptoES from "crypto-es";
import PasswordGeneration from "../../models/PasswordGeneration";
import {AddPasswordScreen} from "./AddPasswordScreen";

/**
 * Controller Method for the Add Password Screen
 * @param props application props
 * @returns {JSX.Element} add password screen render
 */
export default function AddPasswordController(props) {
    // States to store entity information
    const [passwordEntryName, setPasswordEntryName] = useState('')
    const [usernameText, setUsernameText] = useState('')
    const [passwordText, setPasswordText] = useState('')
    const [selectedColour, setSelectedColour] = useState("#002366");

    // Settings context
    const settingsContext = useContext(SettingsContext);

    // user and entity information
    let {userId} = props.route.params
    let userID = userId

    // Firestore reference
    const entityRef = firebase.firestore().collection('users/' + userID + '/passwords')

    // Encryption/Decryption key
    let passphrase;

    /**
     * When entering the page, retrieve the user passphrase from Firestore
     */
    useEffect(() => {
        firebase.firestore().collection('users/').doc(userID).get().then((snapshot) => {
            let data = snapshot.data()
            // Set decryption passphrase
            passphrase = data.passphrase;
        }, [])
    });

    /**
     * When the generate button is pressed, then call the password generation model.
     * SettingsContext is used to pass in the generation parameters here. This can be modified in the Generation Options screen.
     */
    const handleGeneratePassword = () => {
        PasswordGeneration(
            settingsContext.includeUppercase,
            settingsContext.includeLowercase,
            settingsContext.includeNumbers,
            settingsContext.includeSymbols,
            settingsContext.passwordLength,
            setPasswordText);
    }

    /**
     * When the add button is pressed, then encrypt the information and update the firebase database
     */
    const onAddButtonPress = () => {
        if (passwordEntryName.length > 0 && usernameText.length > 0 && passwordText.length > 0) {
            // encrypt username and password text using the encryption/decryption key we passed in on initial load
            let encryptedPasswordText = CryptoES.AES.encrypt(passwordText, passphrase);
            let encryptedUsernameText = CryptoES.AES.encrypt(usernameText, passphrase);
            // Create data structure containing all information to be updated
            const data = {
                name: passwordEntryName,
                password: encryptedPasswordText.toString(),
                userEmail: encryptedUsernameText.toString(),
                accent: selectedColour,
                creationDate: firebase.firestore.FieldValue.serverTimestamp(),
                modificationDate: firebase.firestore.FieldValue.serverTimestamp(),
                notes: "Add some notes here...",
            };
            entityRef
                .add(data)
                .then(_doc => {
                    // After the entity has been added then return back to the home screen.
                    setPasswordEntryName(passwordEntryName)
                    props.navigation.navigate("Passwords")
                })
                .catch((error) => {
                    alert(error)
                });
        } else {
            // Otherwise show an error if not all details have been entered.
            Alert.alert(
                "Incomplete entry details",
                "Please ensure you have a name, username/email and password in the selection area.",
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
     * Go to the generation options screen. Pass in the previous screen name in too (This is explained further in GenerateScreen).
     */
    const onGenerateButtonPress = () => {
        props.navigation.navigate("GenerateScreen", {previousScreen: 'AddPasswordScreen'});
    }

    // Return edit screen render view
    return (
        <AddPasswordScreen setPasswordEntryName={setPasswordEntryName}
                           passwordEntryName={passwordEntryName}
                           setUsernameText={setUsernameText}
                           usernameText={usernameText}
                           setPasswordText={setPasswordText}
                           passwordText={passwordText}
                           selectedColour={selectedColour}
                           setSelectedColour={setSelectedColour}
                           handleGeneratePassword={handleGeneratePassword}
                           onGenerateButtonPress={onGenerateButtonPress}
                           onAddButtonPress={onAddButtonPress}/>
    )
}
