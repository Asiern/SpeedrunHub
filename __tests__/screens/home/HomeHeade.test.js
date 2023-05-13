import React from "react";
import renderer from "react-test-renderer";
import HomeHeader from "../../../app/screens/home/HomeHeader";
import { defaultConfig } from "../../../app/config/config";
import { useConfig } from "../../../app/hooks";
import { userData } from "../../../__mocks__/MockUserData";
import { fireEvent, render } from "react-native-testing-library";
import { useNavigation } from "@react-navigation/native";

jest.mock("../../../app/hooks/useConfig");

beforeAll(() => {
  useConfig.mockReturnValue({
    config: { ...defaultConfig, user: userData, logged: true },
    setConfig: jest.fn(),
  });
});

describe("HomeHeader component", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<HomeHeader />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("should display username correctly", () => {
    const { getByText } = render(<HomeHeader />);
    expect(getByText(userData.names.international)).toBeDefined();
  });
  it("should display contryname correctly", () => {
    const { getByText } = render(<HomeHeader />);
    expect(
      getByText(userData.location.country.names.international)
    ).toBeDefined();
  });
  it("redirects to setting when pressing button", () => {
    const { getByTestId } = render(<HomeHeader />);
    const button = getByTestId("touchable");
    fireEvent.press(button);

    const navigation = useNavigation();
    expect(navigation.navigate).toBeCalledTimes(1);
  });
  it("renders login button when user is not logged in", () => {
    useConfig.mockReturnValue({
      config: { ...defaultConfig, user: null, logged: false },
      setConfig: jest.fn(),
    });
    const { getByTestId } = render(<HomeHeader />);
    expect(getByTestId("login-button-touchable")).toBeDefined();
  });
});
