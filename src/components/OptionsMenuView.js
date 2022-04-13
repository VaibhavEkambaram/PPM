import React from "react";
import OptionsMenu from "react-native-options-menu";
import {Ionicons} from "@expo/vector-icons";
import {Platform} from "react-native";

/**
 * Home Screen Options Menu for Mobile Devices - Web version falls back to standard React Buttons
 *
 * External libraries used:
 * - React Native Options Menu
 *      https://www.npmjs.com/package/react-native-options-menu
 * - Expo Vector Icons (Essentially just repackaged IonIcons)
 *      https://docs.expo.dev/guides/icons/
 *
 * @param copyUsername copy username function
 * @param copyPassword copy password method
 * @param onEditButtonPress edit button listener method
 * @param showConfirmDialog delete confirmation dialog method
 * @returns {JSX.Element} options menu render view
 */
export function OptionsMenuView({copyUsername, copyPassword, onEditButtonPress, showConfirmDialog}) {

    // This is just a placeholder method for the iOS exit button.
    // It does nothing at all, but as far as I know the library seems to require it to exist.
    const exit = () => {
    }

    // iOS requires an additional cancel button for the last value
    if (Platform.OS === "ios") {
        return (
            <OptionsMenu
                customButton={<Ionicons name="ellipsis-horizontal" size={24} color="white"/>
                }
                destructiveIndex={3}
                options={["Copy Username", "Copy Password", "Edit", "Delete", "Cancel"]}
                actions={[copyUsername, copyPassword, onEditButtonPress, showConfirmDialog, exit]}
            />
        );
    // Android does not require a cancel button in its implementation of an action view, so we do not include it
    } else if (Platform.OS === "android") {
        return (
            <OptionsMenu
                customButton={<Ionicons name="ellipsis-vertical" size={24} color="white"/>
                }
                options={["Copy Username", "Copy Password", "Edit", "Delete"]}
                actions={[copyUsername, copyPassword, onEditButtonPress, showConfirmDialog]}
            />
        )
    }
}
