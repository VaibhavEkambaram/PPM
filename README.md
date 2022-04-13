# Penguin Password Manager

Penguin Password manager is a mobile application built for creating and managing password entries.
## Installation and Runtime Instructions

Penguin Password Manager is built using the Expo platform on top of React Native. In order to run the application,
several prerequisites are required.

### Prerequisites
**Firebase Configuration File**: For security reasons, this public repository does not contain the necessary API information for accessing the Firebase store of this application. Please contact me if you would like to have access to the information to fill this file, or a further explanation of the cloud database model. 


**Node JS**: The Node JS Javascript runtime is required before setting up this development environment. The installation
instructions differ depending on what operating system you are using, but the download link can be found
here: https://nodejs.org/en/. <br>
After installation of Node JS is complete, you can verify it is working as intended by running the
command ```npm -version```

**Expo CLI**: Expo is the framework which is used for this application. As Expo bootstraps React Native, installing Expo
will install any necessary React native components as well.
<br>
To install Expo and its associated command line tools, Node version 12 or higher is required to be installed.
<br>
Expo can be installed globally using the command ```npm install -g expo-cli```
<br>
The version of Expo installed can then be verified using the command ```expo --version```

### Retrieve Libraries

We need to retrieve the various libraries used by the project, as they are not stored in the repository. All required
packages can be installed using the command:
<br>```npm i``` or ```npm install``` (These do exactly the same thing.)

If you see the error `Unable to find expo in this project - have you run yarn / npm install yet?`, this means it is
likely that these modules are not yet installed.

### Start development server

The development server can be started with:
<br> ```npm start``` or ```expo start```

### Running the App
Install the Expo client app on your iOS or Android phone and connect to the same wireless network as your computer. On
Android, use the Expo app to scan the QR code from your terminal to open your project. On iOS, use the built-in QR code
scanner of the Camera app.

If a mobile device is not available, then a web version, as well as hooks to the Android Studio Emulator and XCode iOS simulator (Macintosh computers only) is available.

