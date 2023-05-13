import React from "react";
import Run from "../../../app/components/Run";
import { runData } from "../../../__mocks__/MockRunData";
import { render } from "@testing-library/react-native";
import { useConfig } from "../../../app/hooks";
import { defaultConfig } from "../../../app/config/config";
import { useNavigation } from "@react-navigation/native";
import { fireEvent } from "react-native-testing-library";

jest.mock("../../../app/hooks/useConfig");

beforeAll(() => {
  useConfig.mockReturnValue({ config: defaultConfig, setConfig: jest.fn() });
});

describe("Run component", () => {
  it("displays place correctly", async () => {
    const { getByText } = render(<Run place={20} run={runData} />);
    const place = getByText("20");
    expect(place).toBeDefined();
  });
  it("navigates to RunInfo screen when pressed", () => {
    const { getByTestId } = render(<Run run={runData} place={0} />);
    const touchable = getByTestId("run-touchable");
    fireEvent.press(touchable);
    const navigation = useNavigation();
    expect(navigation.navigate).toHaveBeenCalledWith("RunInfo", {
      weblink: runData.weblink,
    });
  });
});
