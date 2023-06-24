# Contributing

- [Dependencies](#dependencies)
- [Project setup](#project-setup)
- [Running environment](#running-environment)
- [Flipper](#flipper)
- [Design pattern](#design-pattern)

## Dependencies

To successfully set up and run this project, you need to ensure the following dependencies are met:

- [Nodejs](https://nodejs.org/en)
- [Yarn](https://yarnpkg.com/getting-started/install)
- [Expo-Tools](https://expo.dev/tools)
- [Git](https://git-scm.com/downloads)

## Project setup

Follow these steps to set up and configure the project on your local machine:

1. Clone the repository

```
git clone https://github.com/Asiern/SpeedrunHub.git
```

2. Navigate to the project directory:

```
cd SpeedrunHub
```

3. Install the project dependencies

```
yarn
```

## Running environment

When using Expo, you have access to a wide range of pre-configured JavaScript APIs and components. However, if your app requires native modules that are not supported by Expo out-of-the-box, you will need to create a custom development build.

As this app makes use of native modules that are not supported by default by expo, it is necessary to create a development build.

1. Create development build

```
eas build --profile development --platform android
```

You can also make this development build locally [Docs](https://docs.expo.dev/develop/development-builds/introduction/) or download one of [these](https://expo.dev/accounts/asiern/projects/speedruncomapp/builds?channel=development).

2. Install development build on your device/emulator

3. Run the `dev-client`

```
yarn start
```

## Flipper

Flipper is a powerful debugging and testing tool for React Native applications. It provides a platform for inspecting, debugging, and analyzing the behavior of your app in real-time. Here's a step-by-step guide on how to use Flipper:

1. Install [Flipper](https://fbflipper.com/)

2. Run your React Native app:

```
yarn start
```

3. Open Flipper:

   - Once your app is running on a simulator or device, open Flipper on your computer.
   - Flipper should automatically detect your running app and display it in the device list.

4. Inspect and debug your app:
   - With Flipper open, you can use various plugins to inspect and debug your React Native app.
   - Flipper provides plugins for network inspection, state management, layout inspection, and more.
   - Install additional plugins from the Flipper marketplace to extend its functionality.

## Design pattern

This pattern is based on the concept of organizing code by feature, rather than by file type. It is often referred to as **"feature-based"** or **"feature-first"** architecture.

The main idea behind this pattern is to organize your code in a way that makes it easy to find and maintain. By grouping related files together in feature folders, you can quickly locate the code you need to work on a specific feature or screen.

Here's a breakdown of the main folders in your app:

- _Components_: This folder contains reusable components that are used across multiple screens. These components should be generic and not tied to any specific feature or screen.
- _Hooks_: This folder contains hook functions and API calls for data. This is where you would put any custom hooks that you use in your app.
- _Screens_: This folder contains the navigation screens for the app. Each screen has its own folder, and the components used by that screen are stored inside that folder. This makes it easy to find and maintain the code for a specific screen.
- _Navigation_: This folder contains the stack navigations for the app. This is where you would put your navigation logic.
- _Types_: This folder contains data types used by the app. This is where you would define your custom types and interfaces.
- _Config_: This folder contains the config context and type definitions for the app. This is where you would put any global configuration settings for your app.

- _Constants_: This folder container constant values used across different components. This is where you would put any global constants.

In addition to the above structure, components that require data requests are further separated into two components: `Component.tsx` and `ComponentContainer.tsx`. The component responsible for rendering the data receives it as a prop and focuses on presentation logic. On the other hand, the container component handles data requests and filtering, passing the necessary values as props to the presentation component. This separation helps maintain a clear distinction between data fetching and rendering responsibilities, making the codebase more organized and maintainable.
