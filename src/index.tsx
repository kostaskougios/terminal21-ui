import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme, type ThemeConfig } from "@chakra-ui/react";
import reportWebVitals from "./reportWebVitals";

import "./index.css";
import App from "./App";
import Cookies from "js-cookie";
import { ThemeCookieName } from "./terminal/mapFrontEnd";

type ThemeValues = "dark" | "light" | undefined;
const themeCookie: ThemeValues = Cookies.get(ThemeCookieName) as ThemeValues;
const config: ThemeConfig = {
  initialColorMode: themeCookie ? themeCookie : "dark",
  useSystemColorMode: false,
};

const theme = extendTheme({ config });

export default theme;

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <ChakraProvider theme={theme}>
    <App />
  </ChakraProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
