import React from "react";


/**
 * Context for storing application user options that persist while the application is open.
 * The values these options are set to below will act as the defaults when the application is started.
 */
const userSettings = {
    // PASSWORD GENERATOR OPTIONS
    passwordLength: 24,
    includeUppercase: true,
    includeLowercase: true,
    includeNumbers: true,
    includeSymbols: false,

    // VIEWING OPTIONS
    sortingOption: {label: "Name", fieldPath: "name", direction: "asc"},

    // Further options can be added below:
    //--------------------------------------------------------------------
};

// Create context based on the array specified above
const SettingsContext = React.createContext(userSettings);

export default SettingsContext;
