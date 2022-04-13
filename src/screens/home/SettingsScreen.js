import React, {useEffect, useState} from 'react'
import {View, Text, Button} from 'react-native'
import styles from './styles';
import {ProfileView} from '../../components/ProfileView';
import {firebase} from '../../config/FirebaseConfig'
import Style from "../../styles/Style";

/**
 * Settings Screen.
 * Used to adjust options for the app. At present, there is not much here apart from the ability to sign out.
 * @param props application props
 * @returns {JSX.Element} settings screen render view
 */
export default function SettingsScreen(props) {
    // Get user ID from props. Used only for retrieving the name and email information for the account.
    const {userId} = props.route.params;
    let userID = userId;

    // States for name and email account
    const [userFullName, setUserFullName] = useState('')
    const [userEmailAddress, setUserEmailAddress] = useState('')

    // On entering this page, retrieve the name and email information about the user, and set the above fields
    useEffect(() => {
        firebase.firestore().collection('users').doc(userID).get().then((snapshot) => {
            let data = snapshot.data()
            setUserFullName(data.fullName);
            setUserEmailAddress(data.email);
        }, [])
    });

    /**
     * Return contents
     * - User Profile Information: Username and password
     * - Account Information: Sign out button
     */
    return (
        <View style={styles.container}>
            <ProfileView fullName={userFullName} emailAddress={userEmailAddress}/>
            <View style={Style.settingsContainer}>

                {/* Account Settings */}
                <Text style={styles.titleText}>Account</Text>
                <Text>Signing out of Penguin Password Manager will remove your account from the application until you
                    sign in again.</Text>
                <Text/>
                <Text>Note: For security reasons, biometric authentication will be disabled after sign out.</Text>
                {/* Sign out button */}
                <Button title="Sign Out" color='#B00020' onPress={props.onSignOut}/>
            </View>
        </View>
    )
}
