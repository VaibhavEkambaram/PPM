import React, {useContext, useEffect, useState} from 'react'
import {FlatList, TextInput, View, Button, SafeAreaView, Platform, Text} from 'react-native'
import styles from './styles';
import {firebase} from '../../config/FirebaseConfig'
import {EntityView} from '../../components/EntityView';
import {FloatingActionButton} from '../../components/FloatingActionButton';
import CryptoES from "crypto-es";
import Styles from "../../styles/Style";
import SettingsContext from "../../contexts/SettingsContext";
import {OptionsMenuHome} from "../../components/OptionsMenuHome";

let OPERATING_SYSTEM = Platform.OS;

/**
 * Home Screen - Central area of the app where user stories can then be performed.
 * This screen displays the users password entries, a button to add more, a search box and a menu with further options
 * @param props application props
 * @param navigation react navigation
 * @returns {JSX.Element} home screen view
 */
export default function HomeScreen(props, navigation) {
    const settingsContext = useContext(SettingsContext); // use settings context to retrieve sorting preference

    // State for storing the retrieved entries from firebase as an array
    const [entities, setEntities] = useState([])

    // Firebase authentication and database information
    const userID = props.extraData.id
    const entityRef = firebase.firestore().collection('users/' + userID + '/passwords')

    // Decryption Key
    const [passphrase, setPassphrase] = useState('');

    // Search bar
    const [searchString, setSearchString] = useState('')

    // Determine operating system type and adjust UI elements accordingly
    let mobileFeaturesEnabled;
    mobileFeaturesEnabled = !(OPERATING_SYSTEM === "web" || OPERATING_SYSTEM === "windows" || OPERATING_SYSTEM === "macos");


    // Set overflow menu or fallback settings button based on device type
    // I primarily focused on mobile, so the web version is quite simplistic
    React.useLayoutEffect(() => {
        if (mobileFeaturesEnabled) {
            props.navigation.setOptions({
                headerRight: (() =>
                        // Use mobile options menu
                        <OptionsMenuHome sortByName={sortByName} sortByDateCreated={sortByDateCreated}
                                         sortByDateModified={sortByDateModified} goToSettings={goToSettings}/>
                )
            });
        } else {
            props.navigation.setOptions({
                headerRight: (() => (
                    // Fallback to settings button
                    <Button title="Settings" onPress={() => goToSettings()}/>
                ))
            });
        }
    }, [navigation]);

    // On entering this page, retrieve the decryption key for this user from Firebase then get the password entries themselves
    useEffect(() => {
        firebase.firestore().collection('users/').doc(userID).get().then((snapshot) => {
            let data = snapshot.data()
            setPassphrase(data.passphrase.toString());
        }, [])


        props.navigation.addListener('focus', () => {
            // Retrieve entries from the database
            performSearch(searchString);
        });
    }, [])


    /**
     * Sorting Options
     * - Sort by Name
     * - Sort by Date Created
     * - Sort by Date Modified
     */

    // Set sorting option to sort by name, and refresh the list
    const sortByName = () => {
        settingsContext.sortingOption = {label: "Name", fieldPath: "name", direction: "asc"}
        performSearch(searchString)
    }

    // Set sorting option to sort by date created and refresh the list
    const sortByDateCreated = () => {
        settingsContext.sortingOption = {label: "Date Created", fieldPath: "creationDate", direction: "desc"}
        performSearch(searchString)
    }

    // Set sorting option to sort by date modified and refresh the list
    const sortByDateModified = () => {
        settingsContext.sortingOption = {label: "Date Modified", fieldPath: "modificationDate", direction: "desc"}
        performSearch(searchString)
    }

    // Intermediary method for navigating to the settings screen.
    // The options menu library doesn't seem to like directly calling JSX within its listenr
    const goToSettings = () => {
        props.navigation.navigate('SettingsScreen', {userId: userID})
    }

    /**
     * Perform a search through the users password database. If no search options are selected then all results are returned.
     * If a search query is entered into the search bar, then this is used to clarify the search down further.
     * For my passwords implementation, entities can be searched by their given entity name or by their email/username.
     * Any found entities are then added to the entities array.
     * @param text
     */
    const performSearch = (text) => {
        // search string state is set to the input text (This is blank in the case of an unspecified search string
        setSearchString(text);
        entityRef.orderBy(settingsContext.sortingOption.fieldPath, settingsContext.sortingOption.direction).onSnapshot(querySnapshot => {
                const bufferedEntries = []
                querySnapshot.forEach(doc => {
                    const entity = doc.data()
                    entity.id = doc.id
                    // check entry details are valid
                    if (entity !== undefined && entity.userEmail !== undefined) {
                        let entityName = entity.name;
                        let username = entity.userEmail;
                        // decrypt email/username on demand to perform query query
                        let decryptedUsername = CryptoES.AES.decrypt(username, passphrase);

                        if (text.length > 0) { // perform search matching entry name or email/username
                            if (entityName.toLowerCase().includes(text.toLowerCase()) || decryptedUsername.toString(CryptoES.enc.Utf8).toLowerCase().includes(text.toLowerCase())) {
                                // add to entry buffer
                                bufferedEntries.push(entity)
                            }
                        } else {
                            // if no search string is specified then just add all entities
                            bufferedEntries.push(entity)
                        }
                    }
                });
                // set entity state to entity buffer
                setEntities(bufferedEntries)
            },
            () => {
            }
        )
    }

    /**
     * Render Entity Item - Most of this is delegated to the entity view component.
     * This function is mainly for passing data through to it.
     * @param item the entity listing we want to render
     * @returns {JSX.Element} render the item
     */
    const renderEntity = ({item}) => {
        // decrypt user email at last possible state to display it
        let decryptedUserEmail = CryptoES.AES.decrypt(item.userEmail.toString(), passphrase).toString(CryptoES.enc.Utf8);
        // return entity item
        return (
            <EntityView displayName={item.name} email={decryptedUserEmail} passwordEntityId={item.id} userId={userID}
                        accent={item.accent} props={props}/>
        )
    }

    /**
     * Return function.
     * Not much directly occurs here, rather calls are made to further modules.
     *
     * Return contents:
     * - Search bar
     * - Entity list container
     * - Floating action add button
     */
    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.listContainer}>
                {/* Search Box */}
                <TextInput style={styles.input} placeholder="Start typing to search..."
                           onChangeText={(text) => (performSearch(text))} value={searchString}/>
                {/* Sorted by Text */}
                <Text style={Styles.text}>Sorted by {settingsContext.sortingOption.label}</Text>
                {/* Entity List */}
                <FlatList data={entities} renderItem={renderEntity} keyExtractor={(item) => item.id}/>
            </SafeAreaView>
            <FloatingActionButton props={props} userIdentifier={userID}/>
        </View>
    )
}
