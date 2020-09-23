import React from "react";
import { Button } from "react-native-paper";

import styled, { ThemeConsumer, ThemeProvider } from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { switchTheme } from "../../redux/themeActions";
import { lightTheme, darkTheme } from "../../config/Themes";

export default function Themes() {
  const theme = useSelector((state) => state.themeReducer.theme);
  const dispatch = useDispatch();
  return (
    <ThemeProvider theme={theme}>
      <Container>
        {theme.mode === "light" ? (
          <Button
            title={"Switch to Dark"}
            color={theme.PRIMARY_ACCENT}
            onPress={() => dispatch(switchTheme(darkTheme))}
          >
            Switch to Dark
          </Button>
        ) : (
          <Button
            title={"Switch to ligth"}
            color={theme.PRIMARY_ACCENT}
            onPress={() => dispatch(switchTheme(lightTheme))}
          >
            Switch to Light
          </Button>
        )}
      </Container>
    </ThemeProvider>
  );
}

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.PRIMARY_BACKGROUND};
`;
