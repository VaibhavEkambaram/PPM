import React from "react";
import {Text, TouchableOpacity} from "react-native";
import Style from "../styles/Style";

/**
 * A simple button structure. Allows for an action to be called when pressed, and has a customisable text.
 * Style inherited from global styles file (/styles/Style.js)
 * @param buttonText Button label
 * @param onPressMethod Passed in function for what you want the button to do
 * @returns {JSX.Element} Button Render View
 */
export function ClickableButton({buttonText, onPressMethod}) {
    return (
        <TouchableOpacity
            style={Style.button}
            onPress={() => onPressMethod()}>
            <Text style={Style.buttonTitle}>{buttonText}</Text>
        </TouchableOpacity>
    );
}