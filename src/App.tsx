import React from "react";

import { Container } from "@material-ui/core";

import { Header } from "./components/Header";
import { Main } from "./components/Main";

function App() {
  return (
    <React.Fragment>
      <Header />
      <Container maxWidth="md">
        <Main />
      </Container>
    </React.Fragment>
  );
}

export default App;
