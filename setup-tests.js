import "@testing-library/jest-native/extend-expect";

import MockAsyncStorage from "mock-async-storage";

const mockImpl = new MockAsyncStorage();
jest.mock("@react-native-async-storage/async-storage", () => mockImpl);

// include this line for mocking react-native-gesture-handler
import "react-native-gesture-handler/jestSetup";

// include this section and the NativeAnimatedHelper section for mocking react-native-reanimated
jest.mock("react-native-reanimated", () => {
  const Reanimated = require("react-native-reanimated/mock");

  // The mock for `call` immediately calls the callback which is incorrect
  // So we override it with a no-op
  Reanimated.default.call = () => {};

  return Reanimated;
});

// Silence the warning: Animated: `useNativeDriver` is not supported because the native animated module is missing
jest.mock("react-native/Libraries/Animated/NativeAnimatedHelper");

// useNavigation mock
const mockedNavigate = jest.fn();
const mockedGoBack = jest.fn();

jest.mock("@react-navigation/native", () => {
  const actualNav = jest.requireActual("@react-navigation/native");
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: mockedNavigate,
      goBack: mockedGoBack,
    }),
  };
});

require("@shopify/flash-list/jestSetup");

// i18n setup
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {},
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});


// React native firebase
jest.mock('@react-native-firebase/crashlytics', () => {
  return () => ({
      log: jest.fn(),
      recordError: jest.fn(),
      // Any function you want to use or mock
  });
});