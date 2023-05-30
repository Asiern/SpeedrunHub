import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import GameList from "../../../app/screens/home/GameList";
import { useConfig } from "../../../app/hooks";
import { defaultConfig } from "../../../app/config/config";
import { useNavigation } from "@react-navigation/native";

jest.mock("../../../app/hooks/useConfig");

beforeEach(() => {
  jest.resetAllMocks();
  useConfig.mockReturnValue({
    config: defaultConfig,
    setConfig: jest.fn(),
  });
});

describe("GameList", () => {
  it("renders an empty list message when there are no games", () => {
    const { getByText } = render(<GameList />);
    const emptyListMessage = getByText(
      "Your liked games list is empty. Add your favorite games now!"
    );
    expect(emptyListMessage).toBeDefined();
  });

  it("navigates to the Search screen when the empty list message is pressed", () => {
    const { navigate } = useNavigation();
    const { getByText } = render(<GameList />);
    const emptyListMessage = getByText(
      "Your liked games list is empty. Add your favorite games now!"
    );
    fireEvent.press(emptyListMessage);
    expect(navigate).toHaveBeenCalledWith("Search", { query: "" });
  });

  it("navigates to the GameList sreen when the 'My Games' text is pressed", () => {
    const { navigate } = useNavigation();
    const { getByTestId } = render(<GameList />);
    const headerTitle = getByTestId("header-title");
    fireEvent.press(headerTitle);
    expect(navigate).toHaveBeenCalledWith("GameList");
  });

  it("renders game cards when there are games in the list", () => {
    const games = [
      { id: 1, abbreviation: "Game1", uri: "image1.jpg" },
      { id: 2, abbreviation: "Game2", uri: "image2.jpg" },
      { id: 3, abbreviation: "Game3", uri: "image3.jpg" },
    ];

    useConfig.mockReturnValue({
      config: { ...defaultConfig, games },
      setConfig: jest.fn(),
    });

    const { getAllByTestId } = render(<GameList />);
    const gameCards = getAllByTestId("game-card-touchable-opacity");
    expect(gameCards.length).toBe(games.length);
  });
});
