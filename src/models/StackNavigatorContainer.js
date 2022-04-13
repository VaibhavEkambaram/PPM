import React from "react";
import {
    AddPasswordScreen, CreateEncryptionKey, EditPasswordScreen, ForgotPasswordScreen, GenerateScreen, HomeScreen,
    LoginScreen, RegistrationScreen, SettingsScreen, ViewPasswordScreen
} from "../screens/Index";
import {createStackNavigator} from "@react-navigation/stack";

/**
 * Stack Navigator Container for React Navigation.
 * Controls navigation between application pages, used in tandem with screens/Index.js
 *
 * External libraries used:
 * - React Navigation
 *      https://reactnavigation.org/
 *
 * @param user user context
 * @param signOut sign out function
 * @param biometricAuth biometric authentication function
 * @returns {JSX.Element} navigator stack
 */

export function StackNavigatorContainer({user, signOut, biometricAuth}) {
    const Stack = createStackNavigator(); // Stack navigator class definition

    return (
        <Stack.Navigator screenOptions={{
            headerStyle: {backgroundColor: '#002366',},
            headerTintColor: '#fff',
            headerTitleStyle: {fontWeight: 'bold',},
        }}>
            {user ? (
                <>
                    {/* if the user is signed in */}
                    <Stack.Screen name="Passwords">
                        {props => <HomeScreen {...props} extraData={user} options={{}}/>}
                    </Stack.Screen>
                    <Stack.Screen name="SettingsScreen" options={{title: 'Settings'}}>
                        {props => <SettingsScreen {...props} onSignOut={signOut}/>}
                    </Stack.Screen>
                    <Stack.Screen name="AddPasswordScreen" component={AddPasswordScreen}
                                  options={{title: 'Add Password Entry'}}/>
                    <Stack.Screen name="ViewPasswordScreen" component={ViewPasswordScreen}/>
                    <Stack.Screen name="EditPasswordScreen" component={EditPasswordScreen}
                                  options={{title: 'Edit Password Details'}}/>
                    <Stack.Screen name="GenerateScreen" component={GenerateScreen}
                                  options={{title: 'Password Options'}}/>
                </>

            ) : (
                <>
                    {/* if the user is not signed in */}
                    <Stack.Screen name="Login" options={{title: 'Penguin Password Manager'}}>
                        {props => <LoginScreen {...props} executeBiometrics={biometricAuth}/>}
                    </Stack.Screen>
                    <Stack.Screen name="CreateEncryptionKey" component={CreateEncryptionKey}
                                  options={{title: 'Setup Encryption'}}/>
                    <Stack.Screen name="Registration" component={RegistrationScreen}
                                  options={{title: 'Create an Account'}}/>
                    <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen}
                                  options={{title: 'Forgot Password'}}/>
                </>
            )}
        </Stack.Navigator>
    );
}
