import "./Terminal.css";
import { Switch, useColorMode } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";

function Settings() {
  const { colorMode, toggleColorMode } = useColorMode();

  const toast = useToast();
  return (
    <>
      <Switch onChange={toggleColorMode}>
        Toggle {colorMode === "light" ? "Dark" : "Light"} Mode
      </Switch>
    </>
  );
}

export default Settings;
