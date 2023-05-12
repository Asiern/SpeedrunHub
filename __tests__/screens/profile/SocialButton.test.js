import React from "react";
import renderer from "react-test-renderer";
import { fireEvent, render } from "react-native-testing-library";
import { useConfig } from "../../../app/hooks";
import { defaultConfig } from "../../../app/config/config";
import { userData } from "../../../__mocks__/MockUserData";
import SocialButton from "../../../app/screens/profile/SocialButton";
import { loadInBrowser } from "../../../app/utils";

jest.mock("../../../app/hooks/useConfig");

beforeEach(() => {
  useConfig.mockReturnValue({ config: defaultConfig, setConfig: jest.fn() });
});

jest.mock("../../../app/utils", () => ({ loadInBrowser: jest.fn() }));

describe("SocialButton component", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(<SocialButton icon="twitch" uri={userData.twitch.uri} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("calls loadInBrowser with the correct URI when pressed", () => {
    const uri = "https://example.com";
    const { getByTestId } = render(<SocialButton icon="twitch" uri={uri} />);
    const button = getByTestId("social-button");

    fireEvent.press(button);

    expect(loadInBrowser).toHaveBeenCalledWith(uri);
  });
});
