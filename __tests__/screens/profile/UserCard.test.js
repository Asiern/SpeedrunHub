import React from "react";
import renderer from "react-test-renderer";
import { useConfig } from "../../../app/hooks";
import { UserCard } from "../../../app/screens/profile/UserCard";
import { userData } from "../../../__mocks__/MockUserData";
import { render } from "@testing-library/react-native";
import { defaultConfig } from "../../../app/config/config";

jest.mock("../../../app/hooks/useConfig");

beforeEach(() => {
  useConfig.mockReturnValue({ config: defaultConfig, setConfig: jest.fn() });
});

describe("UserCard component", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<UserCard user={userData} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("display username correctly", () => {
    const { getByText } = render(<UserCard user={userData} />);
    expect(getByText(userData.names.international)).toBeDefined();
  });
  it("displays country correctly", () => {
    const { getByText } = render(<UserCard user={userData} />);
    expect(
      getByText(userData.location.country.names.international)
    ).toBeDefined();
  });
  it("displays image correctly", () => {
    const { getByTestId } = render(<UserCard user={userData} />);
    expect(getByTestId("userimage")).toBeDefined();
  });
  it("displays image placeholder correctly", () => {
    const { getByTestId } = render(
      <UserCard user={{ ...userData, assets: { image: { uri: undefined } } }} />
    );
    expect(getByTestId("placeholderimage")).toBeDefined();
  });
});
