import React from "react";
import renderer from "react-test-renderer";
import { LoginButton } from "../../../app/screens/home/LoginButton";
import { fireEvent, render } from "react-native-testing-library";
import { useNavigation } from "@react-navigation/native";
import { useConfig } from "../../../app/hooks";
import { defaultConfig } from "../../../app/config/config";

jest.mock("../../../app/hooks/useConfig");

beforeAll(() => {
  useConfig.mockReturnValue({
    config: defaultConfig,
    setConfig: jest.fn(),
  });
});

describe("LoginButton component", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<LoginButton />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("it navigates to login on press", () => {
    const { getByTestId } = render(<LoginButton />);
    const button = getByTestId("login-button-touchable");
    fireEvent.press(button);

    const navigation = useNavigation();
    expect(navigation.navigate).toBeCalledTimes(1);
  });
});
