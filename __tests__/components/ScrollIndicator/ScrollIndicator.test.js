import React from "react";
import renderer from "react-test-renderer";
import { ScrollIndicator } from "../../../app/components";
import { useSharedValue } from "react-native-reanimated";
import { defaultConfig } from "../../../app/config/config";
import { useConfig } from "../../../app/hooks";

jest.mock("../../../app/hooks/useConfig");

beforeAll(() => {
  useConfig.mockReturnValue({ config: defaultConfig, setConfig: jest.fn() });
});

describe("ScrollIndicator", () => {
  it("renders correctly", () => {
    const index = useSharedValue(0);
    const tree = renderer
      .create(<ScrollIndicator width={200} slides={3} index={index} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("renders no indicator when slides <= 1", () => {
    const index = useSharedValue(0);
    const tree = renderer
      .create(<ScrollIndicator width={200} slides={1} index={index} />)
      .toJSON();

    expect(tree).toBe(null);
  });
});
