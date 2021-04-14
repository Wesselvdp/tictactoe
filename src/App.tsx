import React, { FC } from "react";
import GameComponent from "./components/GameComponent";
import { ThemeProvider } from "styled-components";

import { theme } from "./theme/globalStyle";

type T = {};

const App: FC<T> = () => {
  return (
    <ThemeProvider theme={theme}>
      <GameComponent />
    </ThemeProvider>
  );
};

export default App;
