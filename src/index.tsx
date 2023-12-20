import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme, type ThemeConfig } from "@chakra-ui/react";
import reportWebVitals from "./reportWebVitals";

import "./index.css";
import App from "./App";
import { WebSocketContext, WebSocketService } from "./service/WebSocketService";

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const theme = extendTheme({ config });

export default theme;

const webSocketService = new WebSocketService(
  "ws://localhost:8080/ui/sessions",
);
webSocketService.connect();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <ChakraProvider theme={theme}>
    <WebSocketContext.Provider value={webSocketService}>
      <App />
    </WebSocketContext.Provider>
  </ChakraProvider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
