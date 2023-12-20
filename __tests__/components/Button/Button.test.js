import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import { useConfig } from "../../../app/hooks";
import { defaultConfig } from "../../../app/config/config";
import { Button } from "../../../app/components";

jest.mock("../../../app/hooks/useConfig");

beforeAll(() => {
  useConfig.mockReturnValue({ config: defaultConfig, setConfig: jest.fn() });
});

describe("Button component", () => {
  const defaultProps = {
    label: "Click me!",
    onPress: jest.fn(),
  };
  it("renders correctly with default props", () => {
    const { getByTestId, getByText } = render(<Button {...defaultProps} />);
    const button = getByTestId("button-touchable");
    expect(button).toBeTruthy();
    expect(button).toHaveStyle({
      backgroundColor: defaultConfig.theme.colors.foreground,
    });
    expect(getByText("Click me!")).toBeTruthy();
  });

  it("renders correctly with primary variant prop", () => {
    const { getByTestId } = render(
      <Button {...defaultProps} variant="primary" />
    );
    const button = getByTestId("button-touchable");
    expect(button).toBeTruthy();
    expect(button).toHaveStyle({
      backgroundColor: defaultConfig.theme.colors.primary,
    });
  });

  it("calls onPress prop when clicked", () => {
    const { getByTestId } = render(<Button {...defaultProps} />);
    fireEvent.press(getByTestId("button-touchable"));
    expect(defaultProps.onPress).toHaveBeenCalledTimes(1);
  });

  //   it("renders icon when icon prop is provided", () => {
  //     const { getByTestId } = render(<Button {...defaultProps} icon="plus" />);
  //     expect(getByTestId("button-icon")).toBeTruthy();
  //   });
});
