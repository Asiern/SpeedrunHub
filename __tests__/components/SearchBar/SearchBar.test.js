import React from "react";
import renderer from "react-test-renderer";
import SearchBar from "../../../app/components/SearchBar";
import { defaultConfig } from "../../../app/config/config";
import { useConfig } from "../../../app/hooks";
import { fireEvent, render } from "react-native-testing-library";

jest.mock("../../../app/hooks/useConfig");

beforeEach(() => {
  useConfig.mockReturnValue({ config: defaultConfig, setConfig: jest.fn() });
});

describe("SearchBar component", () => {
  it("renders correctly", () => {
    renderer.create(
      <SearchBar onChangeText={() => null} onSearch={() => null} />
    );
  });
  it("triggers onChangeText function when text changes", () => {
    const onChangeTextMock = jest.fn();
    const { getByTestId } = render(
      <SearchBar onChangeText={onChangeTextMock} onSearch={() => null} />
    );
    const input = getByTestId("input");
    fireEvent.changeText(input, "test search text");
    expect(onChangeTextMock).toHaveBeenCalledWith("test search text");
  });
  it("triggers onSearch function when button is pressed", () => {
    const onSearchMock = jest.fn();
    const { getByTestId } = render(
      <SearchBar onChangeText={() => null} onSearch={onSearchMock} />
    );
    const button = getByTestId("touchable");
    fireEvent.press(button);
    expect(onSearchMock).toHaveBeenCalled();
  });
});
