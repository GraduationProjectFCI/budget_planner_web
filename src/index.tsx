import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ChakraProvider, Container, theme } from "@chakra-ui/react";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <Container maxW="container.xl">
        <App />
      </Container>
    </ChakraProvider>
  </React.StrictMode>
);
