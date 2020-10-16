# :trophy:SpeedrunHub

<img src="https://github.com/Asiern/SpeedrunHub/blob/master/Readme/assets/Home.jpg" />

[![runs with expo](https://img.shields.io/badge/Runs%20with%20Expo-000.svg?style=flat-square&logo=EXPO&labelColor=f3f3f3&logoColor=000)](https://expo.io/)

[![ko-fi](https://www.ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/P5P32EN5L)

---

SpeedrunHub is an open source app for IOS/Android platforms made with [React Native](https://reactnative.dev/) and [Expo](https://expo.io/).
It allows you to consult the speedrun.com page natively on your Android/iOS device. All the data is provided by the speedrun.com [REST API](https://github.com/speedruncomorg/api).

**Disclaimer: This is not an official app**

- [:boom:Features](#boom-features)
- [:arrow_down:Download](#arrow_down-Download)
- [:email: Send Feedback](#email-send-feedback)
- [:raised_hands: Contributing](#raised_hands-contributing)
- [:gear: Project Setup](#gear-project-setup)
  - [Linux](#Linux-Setup)
  - [Windows](#Windows-Setup)
  - [MacOS](#MacOS-Setup)
- [:warning: Issues](#warning-issues)
- [:construction: Work in progress](#construction-wip)
- [:page_with_curl: Privacy Policy / Terms & Conditions / License](#page_with_curl-privacy-policy--terms--conditions--license)

## :boom: Features

- Receieve all Speedrun.com notifications directly to your phone ([API-Key](https://github.com/speedruncomorg/api/blob/master/authentication.md#aquiring-a-users-api-key) is needed)
- Search for users and watch their PBs
- Search for game leaderboards
- Manage your favourite games
- <b>Feasible features</b>
  - As a moderator verify/reject runs
  - Submit/remove personal runs

## Expo

- [Project](https://expo.io/dashboard/asiern/speedruncomapp)

- [Builds](https://expo.io/dashboard/asiern/speedruncomapp/builds)

## :arrow_down: Download

[![Get](Readme/assets/google-play-badge.png)](https://play.google.com/store/apps/details?id=com.asiern.speedrun)

## :email: Send Feedback

- Send me an email at <asiern.dev@gmail.com>

- [Open an issue](https://github.com/Asiern/SpeedrunHub/issues/new/choose)

## :raised_hands: Contributing

## :gear: Project Setup

### Linux Setup

1. Install [Node.js](https://nodejs.org/en/)

   ```
   # Using Ubuntu
   curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
   $ sudo apt-get install -y nodejs
   ```

2. Install [Git](https://git-scm.com/)

   ```
   #Using Ubuntu
   $ sudo apt install git
   ```

3. Install [Expo CLI](https://docs.expo.io/get-started/installation/)

   ```
   # Install the command line tools
   $ sudo npm install --global expo-cli
   ```

4. Clone the repository using Git

   ```
   # Navigate to the location in which you would like to store this repository
   # by using the next command "cd <directory>"
   $ cd "Documents\GitHub\SpeedrunHub"
   ```

   **Note: you can skip the previous step with the next command**

   ```
   $ git clone <repo-url> <directory>
   ```

   ```
   # Use this command to clone the repository "git clone <repo-url>"
   $ git clone https://github.com/Asiern/SpeedrunHub.git
   ```

5. Install missing packages

   ```
   # Navigate to the "...\SpeedrunHub\Source" folder and run the following command
   $ npm update
   ```

6. Run

   ```
   # At "...\SpeedrunHub\Source" run
   $ npm start
   # Expo Metro Bundler should open if all went well
   ```

### Windows Setup

1. Install [Node.js](https://nodejs.org/en/)

2. Install [Git](https://git-scm.com/)

3. Install [Expo CLI](https://docs.expo.io/get-started/installation/)

   ```
   # Install the command line tools
   $ npm install --global expo-cli
   ```

4. Clone the repository using Git

   ```
   # Navigate to the location in which you would like to store this repository
   # by using the next command "cd <directory>"
   $ cd "Documents\GitHub\SpeedrunHub"
   ```

   **Note: you can skip the previous step with the next command**

   ```
   $ git clone <repo-url> <directory>
   ```

   ```
   # Use this command to clone the repository "git clone <repo-url>"
   $ git clone https://github.com/Asiern/SpeedrunHub.git
   ```

5. Install missing packages

   ```
   # Navigate to the "...\SpeedrunHub\Source" folder and run the following command
   $ npm update
   ```

6. Run

   ```
   # At "...\SpeedrunHub\Source" run
   $ npm start
   # Expo Metro Bundler should open if all went well
   ```

### MacOS Setup

1. Install [Node.js](https://nodejs.org/en/)

2. Install [Git](https://git-scm.com/download/mac)

3. Install [Expo CLI](https://docs.expo.io/get-started/installation/)

   ```
   # Install the command line tools
   $ sudo npm install --global expo-cli
   ```

4. Clone the repository using Git

   ```
   # Navigate to the location in which you would like to store this repository
   # by using the next command "cd <directory>"
   $ cd "Documents\GitHub\SpeedrunHub"
   ```

   **Note: you can skip the previous step with the next command**

   ```
   $ git clone <repo-url> <directory>
   ```

   ```
   # Use this command to clone the repository "git clone <repo-url>"
   $ git clone https://github.com/Asiern/SpeedrunHub.git
   ```

5. Install missing packages

   ```
   # Navigate to the "...\SpeedrunHub\Source" folder and run the following command
   $ npm update
   ```

6. Run

   ```
   # At "...\SpeedrunHub\Source" run
   $ npm start
   # Expo Metro Bundler should open if all went well
   ```

## :warning: Issues

- IOS version not tested
- MIUI 12 (Android 11) Dark Theme
- App reload
- Runs with multiple runners not displaying properly

## :construction: WIP

- Themes
- Animations
- UI Design
- Run Info
- Push Notifications
- Japanese text support
- Internet connection msg (ToastAndroid)
- Add HTTP request Header User-Agent

## :page_with_curl: Privacy Policy / Terms & Conditions / License

- [Privacy Policy](Readme/Privacy%20Policy.md)
- [Terms & Conditions](Readme/Terms%20%26%20Conditions.md)
- [License](LICENSE)
