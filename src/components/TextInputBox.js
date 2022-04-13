import React from "react";
import {TextInput} from "react-native";
import Style from "../styles/Style";

/**
 * Cumulative component for input text box.
 * @param placeholder placeholder text for search box
 * @param textSetter setter state for the input box
 * @param value initial value of the text input
 * @returns {JSX.Element} text input render view
 */
export function TextInputBox({placeholder,textSetter, value}){
    return (
        <TextInput
            style={Style.input}
            placeholderTextColor="#aaaaaa"
            placeholder={placeholder}
            onChangeText={(text) => textSetter(text)}
            value={value}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
        />
    )
}
