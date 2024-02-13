import { Switch, useColorMode } from "@chakra-ui/react";
import UiHandlers from "../model/UiHandlers";
import {
  ComponentRenderFunction,
  MapElement,
  renderIfExists,
} from "./renderElement";
import Cookies from "js-cookie";

export function mapFrontEnd(msg: any, uiHandlers: UiHandlers): MapElement {
  return renderIfExists(ElementMap, uiHandlers, msg, msg.type === "FrontEnd");
}

export const ThemeCookieName = "terminal21-theme";

const ElementMap: Record<string, ComponentRenderFunction> = {
  ThemeToggle: (b: any) => {
    const { colorMode, toggleColorMode } = useColorMode();

    function toggle() {
      const cv = colorMode === "light" ? "dark" : "light";
      Cookies.set(ThemeCookieName, cv, { expires: 365 * 10 });
      toggleColorMode();
    }
    return (
      <Switch key={b.key} onChange={toggle}>
        Toggle {colorMode === "light" ? "Dark" : "Light"} Mode
      </Switch>
    );
  },
};
