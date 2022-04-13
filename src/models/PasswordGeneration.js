import React from "react";
import {CHARACTERS_LOWERCASE_LETTERS, CHARACTERS_NUMBERS, CHARACTERS_SYMBOLS, CHARACTERS_UPPERCASE_LETTERS} from "../constants/CharacterMap";

/**
 * Function to perform Password Generation based on input parameters.
 * Uses constants/CharacterMap.js to specify a dataset
 * @param includeUppercase boolean variable determiner for uppercase characters
 * @param includeLowercase boolean variable determiner for lowercase characters
 * @param includeNumbers boolean variable determiner for numbers
 * @param includeSymbols boolean variable determiner for symbols
 * @param passwordLength numeric variable determiner for the final password length
 * @param valueSetter set the final password string to a state setter value
 * @returns {string} return the password string for any further external operations
 */
export default function PasswordGeneration(includeUppercase, includeLowercase, includeNumbers, includeSymbols, passwordLength, valueSetter) {
    let password = '' // Variable to place our final generated password
    let characterList = '' // Character list to pull random items from

    // Add character sets based on the passed in parameter values
    if (includeUppercase) characterList = characterList + CHARACTERS_UPPERCASE_LETTERS;
    if (includeLowercase) characterList = characterList + CHARACTERS_LOWERCASE_LETTERS;
    if (includeNumbers) characterList = characterList + CHARACTERS_NUMBERS;
    if (includeSymbols) characterList = characterList + CHARACTERS_SYMBOLS;

    // Perform an additional check to make sure at least one of the character sets has been selected
    const characterListLength = characterList.length;

    // If none have been selected then the length is naturally zero. In this case, password generation can't continue.
    if (characterListLength === 0) {
        return '';
    }

    // Loop for the duration of the specified password length
    for (let i = 0; i < passwordLength; i++) {
        // Pick a random character from the character list string
        const characterIndex = Math.round(Math.random() * characterListLength);
        // Add the selected random character to our password strong
        password = password + characterList.charAt(characterIndex);
    }
    // set the password string to our setter value
    valueSetter(password);
    // Finally, return the password string
    return password;
}
