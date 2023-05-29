import { fireEvent, render } from "@testing-library/react-native";
import Header from "../../../app/components/Header";
import { useNavigation } from "@react-navigation/native";
import { useConfig } from "../../../app/hooks";
import { defaultConfig } from "../../../app/config/config";

jest.mock("../../../app/hooks/useConfig");

beforeAll(() => {
  useConfig.mockReturnValue({ config: defaultConfig, setConfig: jest.fn() });
});

describe("Header", () => {
  test("renders correctly with title", () => {
    const title = "My Header";
    const { getByText } = render(<Header title={title} />);

    const titleElement = getByText(title);
    expect(titleElement).toBeDefined();
  });

  test("navigates back when the back button is pressed", () => {
    const { goBack } = useNavigation();

    const { getByTestId } = render(<Header />);

    const backButton = getByTestId("back-button");
    fireEvent.press(backButton);

    expect(goBack).toHaveBeenCalledTimes(1);
  });
});
