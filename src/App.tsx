import "./App.css";
import Sessions from "./sessions/Sessions";
import { VStack, Box, useColorMode, Button } from "@chakra-ui/react";

function App() {
  return (
    <VStack>
      <Box>Terminal 21</Box>
      <Box>
        <Sessions />
      </Box>
    </VStack>
  );
}

export default App;
