import React, {Fragment} from "react";
import {Text, TextInput, View} from "react-native";
import Style from "../../styles/Style";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {ClickableButton} from "../../components/ClickableButton";

/**
 * View Password Screen
 * @param entityUserEmail email/username
 * @param entityPassword password
 * @param passwordRevealed password security reveal status
 * @param onRevealButtonPress reveal button function
 * @param notesText notes text
 * @param onChangeNotesText notes text function
 * @param largeButtonsEnabled buttons enabled status
 * @param onEditButtonPress edit button function
 * @param onDeleteButtonPress delete button function
 * @param copyUsername copy username function
 * @param copyPassword copy password function
 * @returns {JSX.Element} view screen
 */
export function ViewPasswordScreen({entityUserEmail,entityPassword,passwordRevealed, onRevealButtonPress,notesText,onChangeNotesText,largeButtonsEnabled,onEditButtonPress,onDeleteButtonPress, copyUsername, copyPassword }){
    return (
        <View style={Style.container}>
            <KeyboardAwareScrollView
                style={{flex: 1, width: '100%'}}
                keyboardShouldPersistTaps="never">
                {/* Entity Information View Box */}
                <View style={Style.infoView}>
                    <Text style={Style.titleText}>Account Details</Text>
                    <Text style={Style.text}>Username / Email Address</Text>
                    {/* Username Text Box */}
                    <TextInput
                        style={Style.input}
                        value={entityUserEmail}
                        selectTextOnFocus={true}
                        editable={false}
                        showSoftInputOnFocus={false}
                        autoCompleteType='off'
                        textContentType='none'
                    />

                    <Text style={Style.text}>Password</Text>
                    {/* Password Text Box */}
                    <TextInput
                        style={Style.input}
                        value={entityPassword}
                        editable={false}
                        selectTextOnFocus={!passwordRevealed}
                        secureTextEntry={!passwordRevealed}
                        autoCompleteType='off'
                        textContentType='none'
                    />
                    {/* Reveal Password Button */}

                    <ClickableButton buttonText={"Reveal Password"} onPressMethod={onRevealButtonPress}/>


                </View>
                {/* Notes Information View Box */}
                <View style={Style.infoView}>
                    <Text style={Style.titleText}>Notes</Text>
                    <View style={Style.textAreaContainer}>
                        {/* Notes Box */}
                        <TextInput
                            style={Style.textArea}
                            value={notesText}
                            onChangeText={(text) => onChangeNotesText(text)}
                            underlineColorAndroid="transparent"
                            placeholderTextColor="grey"
                            numberOfLines={5}
                            multiline={true}

                        />

                    </View>
                </View>
                {largeButtonsEnabled ? (
                    <Fragment>
                        {/* Buttons for web version*/}
                        <View style={Style.infoView}>
                            <Text style={Style.titleText}>Copy to Clipboard</Text>
                            <ClickableButton buttonText={"Copy Username"} onPressMethod={copyUsername}/>
                            <ClickableButton buttonText={"Copy Password"} onPressMethod={copyPassword}/>
                        </View>
                        <View style={Style.infoView}>
                            <Text style={Style.titleText}>Actions</Text>
                            <ClickableButton buttonText={"Edit"} onPressMethod={onEditButtonPress}/>
                            <ClickableButton buttonText={"Delete"} onPressMethod={onDeleteButtonPress}/>
                        </View>
                    </Fragment>
                ) : (
                    <Text/>)}
            </KeyboardAwareScrollView>
        </View>
    );
}
