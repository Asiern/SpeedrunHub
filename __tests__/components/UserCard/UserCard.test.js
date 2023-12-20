import React from "react";
import renderer from "react-test-renderer";
import { UserCard } from "../../../app/components/UserCard";
import { userData } from "../../../__mocks__/MockUserData";
import { useConfig } from "../../../app/hooks";
import { defaultConfig } from "../../../app/config/config";
import { fireEvent, render } from "react-native-testing-library";
import { useNavigation } from "@react-navigation/native";

jest.mock("../../../app/hooks/useConfig");

beforeEach(() => {
  useConfig.mockReturnValue({ config: defaultConfig, setConfig: jest.fn() });
});

const renderComponent = () => {
  return <UserCard user={userData} />;
};

describe("UserCard component", () => {
  it("renders correctly", () => {
    const tree = renderer.create(renderComponent()).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("renders username correctly", () => {
    const { getByText } = render(renderComponent());
    expect(getByText(userData.names.international)).toBeDefined();
  });
  it("renders country correctly", () => {
    const { getByText } = render(renderComponent());
    expect(
      getByText(userData.location.country.names.international)
    ).toBeDefined();
  });
  it("redirects to profile", () => {
    const { getByTestId } = render(renderComponent());
    const touchable = getByTestId("usercard-touchable");
    fireEvent.press(touchable);

    const navigation = useNavigation();

    expect(navigation.navigate).toBeCalledTimes(1);
  });
});
