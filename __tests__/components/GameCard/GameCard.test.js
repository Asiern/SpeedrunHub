import React from "react";
import { render } from "@testing-library/react-native";
import { useConfig } from "../../../app/hooks";
import { defaultConfig } from "../../../app/config/config";
import { useNavigation } from "@react-navigation/native";
import { fireEvent } from "react-native-testing-library";
import { GameCard } from "../../../app/components";

jest.mock("../../../app/hooks/useConfig");

beforeAll(() => {
  useConfig.mockReturnValue({ config: defaultConfig, setConfig: jest.fn() });
});

describe("Run component", () => {
  it("renders correctly", () => {
    const { getByTestId } = render(
      <GameCard
        id="1"
        abbreviation="ABC"
        image="http://example.com/image.jpg"
        width={113}
        height={160}
        style={{ margin: 10 }}
      />
    );

    const cardContainer = getByTestId("game-card-touchable-opacity");
    const imageBackground = getByTestId("game-card-image-background");

    expect(cardContainer).toBeDefined();
    expect(imageBackground).toBeDefined();
  });
  it("navigates to GameInfo screen when pressed", () => {
    const { getByTestId } = render(
      <GameCard
        id="1"
        abbreviation="ABC"
        image="http://example.com/image.jpg"
      />
    );

    const touchableOpacity = getByTestId("game-card-touchable-opacity");

    fireEvent.press(touchableOpacity);
    const navigation = useNavigation();

    expect(navigation.navigate).toHaveBeenCalledWith("GameInfo", {
      id: "1",
      abbreviation: "ABC",
    });
  });
});
