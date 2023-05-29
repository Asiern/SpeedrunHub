import { useNavigation } from "@react-navigation/native";
import { userData } from "../../../../__mocks__/MockUserData";
import User from "../../../../app/components/FollowingUser/User";
import { fireEvent, render } from "@testing-library/react-native";
import { defaultConfig } from "../../../../app/config/config";
import { useConfig } from "../../../../app/hooks";

jest.mock("../../../../app/hooks/useConfig");

beforeAll(() => {
  useConfig.mockReturnValue({ config: defaultConfig, setConfig: jest.fn() });
});

describe("User component", () => {
  test("renders user information correctly", () => {
    const { getByText, getByTestId } = render(
      <User user={userData} width={100} />
    );
    const touchable = getByTestId("user-touchable");
    const nameText = getByText(userData.names.international);

    expect(touchable).toBeDefined();
    expect(nameText).toBeDefined();
  });

  test("navigates to profile on press", () => {
    const { navigate } = useNavigation();

    const { getByTestId } = render(<User user={userData} width={100} />);
    const touchable = getByTestId("user-touchable");

    fireEvent.press(touchable);

    expect(navigate).toHaveBeenCalledWith("Profile", { user: userData });
  });

  test("displays user image if available", () => {
    const { getByTestId } = render(<User user={userData} width={100} />);
    const image = getByTestId("user-image");

    expect(image).toBeDefined();
    expect(image.props.source).toEqual({
      uri: userData.assets.image.uri,
    });
  });

  test("displays user icon if image is not available", () => {
    const userWithoutImage = { ...userData, assets: { image: { uri: null } } };
    const { getByTestId } = render(
      <User user={userWithoutImage} width={100} />
    );
    const iconContainer = getByTestId("user-icon-container");

    expect(iconContainer).toBeDefined();
  });
});
