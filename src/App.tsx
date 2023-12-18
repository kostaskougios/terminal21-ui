import "./App.css";
import Sessions from "./sessions/Sessions";
import { VStack, Box, useColorMode, Button } from "@chakra-ui/react";

function App() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <VStack>
      <Box>
        Terminal 21
        <Button onClick={toggleColorMode}>
          Toggle {colorMode === "light" ? "Dark" : "Light"}
        </Button>
      </Box>
      <Box>
        <Sessions />
      </Box>
    </VStack>
  );
}

export default App;
