import { ExternalLinkIcon } from "@chakra-ui/icons";
import "./Terminal.css";
import { Link, Switch, useColorMode } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";

function Settings() {
  const { colorMode, toggleColorMode } = useColorMode();

  const toast = useToast();
  return (
    <>
      <Switch onChange={toggleColorMode}>
        Toggle {colorMode === "light" ? "Dark" : "Light"} Mode
      </Switch>
      <p style={ {'margin' : '25px'}}>
        Have a question? Please ask at &nbsp;
        <Link href='https://github.com/kostaskougios/terminal21-restapi/discussions' color='teal.500' isExternal>
        terminal21's discussion board <ExternalLinkIcon mx='2px' />
        </Link>
      </p>
    </>
  );
}

export default Settings;
