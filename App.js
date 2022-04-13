import 'react-native-gesture-handler';
import React, {useState, useMemo} from 'react'
import {Alert} from 'react-native'
import {firebase} from './src/config/FirebaseConfig'
import {NavigationContainer} from '@react-navigation/native'
import {StackNavigatorContainer} from "./src/models/StackNavigatorContainer";
import {AuthContext} from './src/contexts/AuthContext'
import AndroidTimerFix from "./src/util/AndroidTimerFix";

/**
 * Main Insertion Point for the Application.
 * This function is primarily used for user authentication and its relevant actions such as sign in, sign out.
 * As the navigation stack is oriented around authentication, its insertion point is also here
 * @returns {JSX.Element} AuthContext and navigation stack, this then uses react-navigation to start up the application.
 */
export default function App() {
    AndroidTimerFix(); // First of all, run a timer fix to suppress the LogBox timer warning messages.

    // State to keep track of user
    const [user, setUser] = useState(null);

    /**
     * Function to handle user pickup through biometric authentication.
     * This is only executed after successful authentication, the user is then retrieved from context and signed back in
     */
    const biometricAuth = () => {
        const usersRef = firebase.firestore().collection('users');
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                usersRef
                    .doc(user.uid)
                    .get()
                    .then((document) => {
                        const userData = document.data();
                        setUser(userData);
                    })
                    .catch((error) => {
                    });
            }
        });
    }

    /**
     * Sign out.
     * Signs the current user out of firebase, then nullifies the user state.
     */
    const signOut = () => {
        firebase.auth().signOut().then(() => {
            setUser(null)
        }).catch((error) => {
            alert(error)
        })
    }

    /**
     * Login Error Message.
     */
    const loginError = () => {
        Alert.alert(
            "Could not sign in", "Please sign in using your email address and password.",
            [{text: "Return", style: "cancel",},]
        );
    }

    const authContext = useMemo(() => ({
            /**
             * Sign In.
             * Takes data from the login screen or saved user context and authenticates
             * @param data user data
             */
            signIn: async data => {
                firebase
                    .auth()
                    .signInWithEmailAndPassword(data.email, data.password)
                    .then((response) => {
                        const uid = response.user.uid
                        // Further information about the user is stored in the users firestore collection
                        // The app will not work without this collection, as passwords are stored as a subset of this.
                        const usersRef = firebase.firestore().collection('users')
                        usersRef
                            .doc(uid)
                            .get()
                            .then(firestoreDocument => {
                                if (!firestoreDocument.exists) {
                                    // Show error if no accompanying user information is found.
                                    // Returns before the user is set, so it shouldn't be possible to proceed further
                                    loginError();
                                    return;
                                }
                                const userData = firestoreDocument.data()
                                // Set user, this will then trigger the home screen through the navigation stack
                                setUser(userData)
                            })
                            .catch(error => {
                                // Show login error on failure
                                loginError();
                            });
                    })
                    .catch(error => {
                        // Show login error on failure
                        loginError();
                    })
            },
            /**
             * Sign out.
             * Signs the current user out of firebase, then nullifies the user state.
             * This is activated from a button in the settings screen.
             */
            signOut: () => {
                firebase
                    .signOut()
                    .then(() => {
                        setUser(null)
                    })
                    .catch((error) => {
                        alert(error)
                    })
            },
            /**
             * Sign Up.
             * The sign up process goes through multiple screens before completing.
             * Login Screen -> Registration Screen -> Encryption Key Setup
             * Data is passed through to the encryption key setup screen. Once complete, this function is then executed
             * using all data inherited through the frames.
             */
            signUp: async data => {
                firebase
                    .auth()
                    // Create Firebase Authentication entry
                    .createUserWithEmailAndPassword(data.email, data.password)
                    .then((response) => {
                        const uid = response.user.uid
                        // Create supplementary user database
                        const userData = {
                            id: uid,
                            email: data.email,
                            fullName: data.fullName,
                            passphrase: data.passphrase,
                        };
                        const usersRef = firebase.firestore().collection('users')
                        usersRef.doc(uid).set(userData).then(() => {
                            // Set user context
                            setUser(userData)
                        }).catch((error) => {
                            // Show error on failure
                            alert(error)
                        });
                    }).catch((error) => {
                    // Show error on failure
                    alert(error)
                });
            },
        }),
        []
    );
    // Finally return the auth context and react navigation stack to launch the application.
    return (
        <AuthContext.Provider value={authContext}>
            <NavigationContainer>
                {/* Call Stack Navigator */}
                <StackNavigatorContainer user={user} signOut={signOut} biometricAuth={biometricAuth}/>
            </NavigationContainer>
        </AuthContext.Provider>
    );
}
