import React from "react";
import {Switch, Text, View} from 'react-native'
import ApplicationStyles from "../styles/Style";

/**
 * Cumulative Method for a toggle switch with descriptive text next to it
 * @param text Descriptive text
 * @param enabledStatus switch value status
 * @param switchValue switch state checker
 * @returns {JSX.Element} switch render view
 */
export function ToggleSwitch({text, enabledStatus,switchValue}){
    return (
        <View style={ApplicationStyles.switchView}>
            <Text style={ApplicationStyles.text}>{text}</Text>
            <Switch
                onValueChange={switchValue}
                value={enabledStatus}
            />
        </View>
    )
}
