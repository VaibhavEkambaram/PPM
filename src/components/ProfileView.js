import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from '@expo/vector-icons';

/**
 * Profile View for Settings Menu.
 *
 * External libraries used:
 * - Expo Vector Icons (Essentially just repackaged IonIcons)
 *      https://docs.expo.dev/guides/icons/
 *
 * @param fullName Full Name of current signed in user
 * @param emailAddress email address of current signed in user
 * @returns {JSX.Element} Profile box render view
 */
export function ProfileView({ fullName, emailAddress }) {
  return (
      <View style={styles.container}>
      <Ionicons name="person-circle" style={styles.avatar} size={48} />
        <View>
          <Text style={styles.name}>{fullName}</Text>
          <Text style={styles.email}>{emailAddress}</Text>
        </View>
      </View>
  );
}

// Internal Stylesheet for drawing padded box around entity, and positioning text and icon
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    margin: 8,
    borderRadius: 5,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderBottomColor: "#E0E0E0",
    borderBottomWidth: 2,
  },
  avatar: {
    width: 48,
    height: 48,
    margin: 12,
    marginRight: 16,
    borderRadius: 40,
    color: '#357EC7',
  },
  name: {
    fontSize: 16,
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
  },
});
