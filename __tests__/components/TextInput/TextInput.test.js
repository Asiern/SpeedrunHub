import React from "react";
import { useConfig } from "../../../app/hooks";
import { defaultConfig } from "../../../app/config/config";
import TextInput from "../../../app/components/TextInput";
import { fireEvent, render } from "@testing-library/react-native";
import renderer from "react-test-renderer";

jest.mock("../../../app/hooks/useConfig");

beforeEach(() => {
  useConfig.mockReturnValue({ config: defaultConfig, setConfig: jest.fn() });
});

describe("TextInput component", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<TextInput onSearch={() => null} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("triggers onChangeText function when text changes", () => {
    const onChangeMock = jest.fn();
    const { getByTestId } = render(
      <TextInput onChange={onChangeMock} onSearch={() => null} />
    );
    const input = getByTestId("input");
    fireEvent.changeText(input, "test search text");
    expect(onChangeMock).toHaveBeenCalledWith("test search text");
  });
});
