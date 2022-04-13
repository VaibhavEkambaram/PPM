import React from "react";
import OptionsMenu from "react-native-options-menu";
import {Ionicons} from "@expo/vector-icons";
import {Platform} from "react-native";

/**
 * Home Screen Options Menu for Mobile Devices - Web version falls back to standard React Buttons.
 *
 * External libraries used:
 * - React Native Options Menu
 *      https://www.npmjs.com/package/react-native-options-menu
 * - Expo Vector Icons (Essentially just repackaged IonIcons)
 *      https://docs.expo.dev/guides/icons/
 *
 * @param sortByName sort by name function
 * @param sortByDateCreated sort by date created function
 * @param sortByDateModified sort by date modified function
 * @param goToSettings settings function
 * @returns {JSX.Element} Options menu render view
 */
export function OptionsMenuHome({sortByName, sortByDateCreated, sortByDateModified, goToSettings}){

    // This is just a placeholder method for the iOS exit button.
    // It does nothing at all, but as far as I know the library seems to require it to exist.
    const exit = () => {
    }

    // iOS requires an additional cancel button for the last value
    if(Platform.OS==="ios"){
        return (
            <OptionsMenu
                customButton={<Ionicons name="ellipsis-horizontal" size={24} color="white"/>
                }
                options={["Sort by Name", "Sort by Date Created", "Sort by Date Modified", "Settings", "Cancel"]}
                actions={[sortByName, sortByDateCreated, sortByDateModified, goToSettings, exit]}
            />
        );
        // Android does not require a cancel button in its implementation of an action view, so we do not include it
    } else if(Platform.OS==="android"){
        return (
            <OptionsMenu
                customButton={<Ionicons name="ellipsis-vertical" size={24} color="white"/>
                }
                options={["Sort by Name", "Sort by Date Created", "Sort by Date Modified", "Settings"]}
                actions={[sortByName, sortByDateCreated, sortByDateModified, goToSettings]}
            />
        )
    }
}
