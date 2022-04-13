import React from "react";
import {View, Text, TouchableOpacity, StyleSheet} from "react-native";
import {Circle} from 'react-native-shape';

/**
 * Entity View for showing Password Entries on the Home Screen.
 *
 * External libraries used:
 * - React Native Shapes
 *      https://www.npmjs.com/package/react-native-shapes
 *
 * @param displayName Entity Display Name (Visible)
 * @param email Entity Email or Username (Visible)
 * @param passwordEntityId Unique identifier for entity (internal)
 * @param userId User identifier (internal)
 * @param accent Coloured circle next to info (Visible)
 * @param props Application state props
 * @returns {JSX.Element} Entity Item Render View
 */
export function EntityView({displayName, email, passwordEntityId, userId, accent, props}) {
    return (
        <TouchableOpacity onPress={() => {
            props.navigation.navigate('ViewPasswordScreen', {
                passwordEntityId: passwordEntityId,
                userId: userId,
                returningFromEdit: false,
            });
        }}>

            <View style={styles.container}>
                <Circle color={accent}/>
                <View>
                    <Text style={styles.name}>{displayName}</Text>
                    <Text style={styles.email}>{email}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

// Internal Stylesheet for drawing padded box around entity, and positioning text and circle
const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        margin: 8,
        borderRadius: 8,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 12,
        paddingLeft: 12,
        borderBottomColor: "#E0E0E0",
        borderBottomWidth: 2,
    },
    name: {
        fontSize: 24,
        marginBottom: 4,
        paddingLeft: 24,
    },
    email: {
        fontSize: 18,
        paddingLeft: 24,
    },
});
