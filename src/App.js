import React from "react";
import "@mantine/core/styles.css";
import "./App.css";
import { MantineProvider } from "@mantine/core";
import Main from "./components/Main";

function App() {
  return (
    <MantineProvider defaultColorScheme="dark">
      <Main />
    </MantineProvider>
  );
}

export default App;
