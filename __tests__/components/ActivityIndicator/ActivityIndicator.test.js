import React from "react";
import renderer from "react-test-renderer";
import ActivityIndicator from "../../../app/components/ActivityIndicator";
import { useConfig } from "../../../app/hooks";
import { defaultConfig } from "../../../app/config/config";

jest.mock("../../../app/hooks/useConfig");

beforeAll(() => {
  useConfig.mockReturnValue({ config: defaultConfig, setConfig: jest.fn() });
});

describe("ActivityIndicator component", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<ActivityIndicator />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
