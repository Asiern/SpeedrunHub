import React from "react";
import { useConfig } from "../../../app/hooks";
import { defaultConfig } from "../../../app/config/config";
import renderer from "react-test-renderer";
import PB from "../../../app/screens/profile/PB";
import { pbData } from "../../../__mocks__/MockPBData";
import { render, fireEvent } from "@testing-library/react-native";
import { useNavigation } from "@react-navigation/native";

jest.mock("../../../app/hooks/useConfig");

beforeAll(() => {
  useConfig.mockReturnValue({ config: defaultConfig, setConfig: jest.fn() });
});

describe("PB component", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<PB pb={pbData} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("displays the correct category name", () => {
    const { getByText } = render(<PB pb={pbData} />);
    const categoryElement = getByText(pbData.category.data.name);
    expect(categoryElement).toBeDefined();
  });
  it("displays the correct run time", () => {
    const { getByText } = render(<PB pb={pbData} />);
    const timeElement = getByText("1h39m57.300s");
    expect(timeElement).toBeDefined();
  });
  it("should redirect to RunInfo when pressing component", () => {
    const { getByTestId } = render(<PB pb={pbData} />);
    const touchable = getByTestId("touchable-pb");
    fireEvent.press(touchable);

    const navigation = useNavigation();

    expect(navigation.navigate).toBeCalledWith("RunInfo", {
      run: pbData.run,
      place: pbData.place,
    });
  });
});
