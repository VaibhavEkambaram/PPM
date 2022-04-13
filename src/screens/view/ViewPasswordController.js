import React, {useEffect, useState} from 'react'
import {Alert, Platform} from 'react-native'
import * as Clipboard from 'expo-clipboard';
import {firebase} from '../../config/FirebaseConfig'
import CryptoES from "crypto-es";
import {OptionsMenuView} from "../../components/OptionsMenuView";
import {ViewPasswordScreen} from "./ViewPasswordScreen";

// Identify system Operating System
let OPERATING_SYSTEM = Platform.OS;

/**
 * Controller Method for the Password View Screen
 * @param props application props
 * @returns {JSX.Element} password screen render
 */
export default function ViewPasswordController(props) {
    // user and entity firebase information
    const {passwordEntityId, userId} = props.route.params
    let id = passwordEntityId
    let userID = userId

    // States for managing retrieved information
    const [entityName, setEntityName] = useState('');
    const [entityUserEmail, setEntityUserEmail] = useState('');
    const [entityPassword, setEntityPassword] = useState('');
    const [passwordRevealed, setPasswordRevealed] = useState(Boolean);
    const [notesText, setNotesText] = useState('');

    // Decryption key
    let passphrase;

    // Determine operating type
    let largeButtonsEnabled;
    if (OPERATING_SYSTEM === "web" || OPERATING_SYSTEM === "windows" || OPERATING_SYSTEM === "macos") {
        largeButtonsEnabled = true;
    } else {
        largeButtonsEnabled = false;
    }

    /**
     * When the user enters this page, retrieve the decryption key from firebase.
     * After this, update the data states.
     * This is also where the overflow options menu is set.
     */
    useEffect(() => {
        // Retrieve decryption key from Firebase
        firebase.firestore().collection('users/').doc(userID).get().then((snapshot) => {
            let data = snapshot.data()
            passphrase = data.passphrase;
        }, [])

        // When in focus (Either when entering the screen or returning from it) update the information states
        props.navigation.addListener('focus', () => {
            updateData();
        });

        if (!largeButtonsEnabled) {
            // If on a mobile device set the title to the entity name, and add an actions menu to the right side of the header.
            props.navigation.setOptions({
                title: entityName, headerRight: (() => (
                    <OptionsMenuView
                        copyUsername={copyUsername}
                        copyPassword={copyPassword}
                        onEditButtonPress={onEditButtonPress}
                        showConfirmDialog={showConfirmDialog}/>
                ))
            });
        }
    });

    /**
     * Copy the email address or username to the system clipboard.
     */
    const copyUsername = () => {
        if (entityUserEmail.length > 0) {
            Clipboard.setString(entityUserEmail);
        }
    }

    /**
     * Copy the password to the clipboard.
     */
    const copyPassword = () => {
        if (entityUserEmail.length > 0) {
            Clipboard.setString(entityPassword);
        }
    }

    /**
     * Update the password entry information from Firebase.
     */
    const updateData = () => {
        firebase.firestore().collection('users/' + userID + '/passwords').doc(id).get().then((snapshot) => {
            let data = snapshot.data()
            // Decrypt Username/Email Address and Password
            let decryptedPasswordText = CryptoES.AES.decrypt(data.password, passphrase);
            let decryptedUsernameText = CryptoES.AES.decrypt(data.userEmail, passphrase);
            // Set unencrypted entity plaintext information
            setEntityName(data.name);
            setNotesText(data.notes);
            // Set decrypted username/email address and password strings
            setEntityUserEmail(decryptedUsernameText.toString(CryptoES.enc.Utf8));
            setEntityPassword(decryptedPasswordText.toString(CryptoES.enc.Utf8));
            // Set the password to be hidden using a secured text field
            setPasswordRevealed(false);
        }, [])
    }

    /**
     * When attempting to delete a password entry, show a warning to offer a "last chance" before an entry is deleted
     */
    const showConfirmDialog = () => {
        return Alert.alert(
            "Deleting entry for " + entityName,
            "Are you sure you want to remove this password entry? Once deleted, entries can not be recovered.",
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                // if the delete option (Highlighted in red to indicate its destructive behaviour) then call the deletion function
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: () => {
                        onDeleteButtonPress();
                    },
                },
            ]
        );
    };

    /**
     * Function to Delete an entry from the Firestore database.
     */
    const onDeleteButtonPress = () => {
        // Item is deleted from the Firestore passwords collection, with the navigation stack then returned to the home screen
        firebase.firestore().collection('users/' + userID + '/passwords').doc(id).delete().then(() => {
            props.navigation.goBack('HomeScreen');
        }).catch(() => {
        });
    }

    /**
     * Move to the edit password screen when clicked.
     * User and entity ID is passed through to allow the database to be updated
     */
    const onEditButtonPress = () => {
        props.navigation.navigate('EditPasswordScreen', {userId: userID, entityId: id})
    }

    /**
     * Reveal Button Logic Determiner.
     */
    const onRevealButtonPress = () => {
        if (passwordRevealed === false) {
            setPasswordRevealed(true);
        } else {
            setPasswordRevealed(false);
        }
    }

    /**
     * Notes are updated whenever new information is added or removed to the text box.
     * @param notes text from the notes box
     */
    const onChangeNotesText = (notes) => {
        // update the notes text box state
        setNotesText(notes);
        let db = firebase.firestore();
        db.collection('users/' + userID + '/passwords').doc(id).update({notes: notes});
    }

    // Return Password Screen View passing in all relevant variables and functions from this file
    return (
        <ViewPasswordScreen
            entityUserEmail={entityUserEmail}
            entityPassword={entityPassword}
            notesText={notesText}
            passwordRevealed={passwordRevealed}
            largeButtonsEnabled={largeButtonsEnabled}
            onChangeNotesText={onChangeNotesText}
            onRevealButtonPress={onRevealButtonPress}
            onEditButtonPress={onEditButtonPress}
            onDeleteButtonPress={onDeleteButtonPress}
            copyUsername={copyUsername}
            copyPassword={copyPassword}
        />
    )
}
