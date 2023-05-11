import React from "react";
import renderer from "react-test-renderer";
import { SquareButton } from "../../../app/components/SquareButton";
import { useConfig } from "../../../app/hooks";
import { defaultConfig } from "../../../app/config/config";
import { render, fireEvent } from "react-native-testing-library";

jest.mock("../../../app/hooks/useConfig");

beforeEach(() => {
  useConfig.mockReturnValue({ config: defaultConfig, setConfig: jest.fn() });
});

describe("SquareButton component", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<SquareButton icon="user" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("button calls onPress function when pressed", () => {
    const onPressMock = jest.fn();
    const { getByTestId } = render(
      <SquareButton icon="user" onPress={onPressMock} />
    );

    fireEvent.press(getByTestId("touchable"));

    expect(onPressMock).toHaveBeenCalled();
  });
});
