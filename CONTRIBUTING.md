# Contributing

- [Dependencies](#dependencies)
- [Project setup](#project-setup)
- [Running environment](#running-environment)
- [Flipper](#flipper)
- [Design pattern](#design-pattern)
- [Adding more languages](#adding-more-languages)

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

## Adding more languages

We use i18next, a popular internationalization library, to handle translations. Adding support for additional languages in our app is straightforward. Here's how you can do it:

1. Locate the `locale` folder (app/locale). Inside this folder, you'll find subfolders for each supported language (e.g., `en` for English, `es` for Spanish).
    
2. To add a new language, create a new folder with the language code (e.g., `fr` for French) inside the `locale` folder. This folder will contain the translation files for the new language.
    
3. Inside the new language folder, create three `.json` files: `common.json`, `glossary.json`, and `validation.json`. These files store translations for common phrases and words, glossary terms specific to your app, and validation messages, respectively.
    
4. Open the existing `common.json`, `glossary.json`, and `validation.json` files in another language folder (e.g., `en`) to use as a reference for the structure and keys of the translation files.
    
5. Translate the content in each of the three files (`common.json`, `glossary.json`, and `validation.json`) into the new language. Make sure to keep the same structure and keys as in the reference files.
    
6. Once you've completed the translations, save the files and proceed to the next step.
    
7. Open the `i18n.ts` file located in the locale directory. This file contains the configuration for i18next.
    
8. In the `i18n.ts` file, import the new language translation files you created. You can do this by adding an import statement for each file at the top of the file, like this:
```
import common_fr from './fr/common.json';
import glossary_fr from './fr/glossary.json';
import validation_fr from './fr/validation.json';
```
	
9. In the `resources` object within the `i18n.ts` file, add the imported translation files under the new language code. Here's an example:

```
resources: { 
	en: { 
		common: common_en, 
		glossary: glossary_en, 
		validation: validation_en, 
	}, 
	fr: { 
		common: common_fr, 
		glossary: glossary_fr, 
		validation: validation_fr, 
	},
	...
```

10. Save the `i18n.js` file, and you're done! The new language should now be available in the app.

By following these steps, you can easily add more languages to our app and provide a localized experience for users around the world.

If you have any questions or need further assistance, feel free to reach out to our development team.