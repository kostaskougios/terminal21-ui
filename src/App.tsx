import "./App.css";
import Sessions from "./sessions/Sessions";
import { VStack, Box } from "@chakra-ui/react";
import { WebSocketContext, WebSocketService } from "./service/WebSocketService";

function App() {
  const webSocketService = new WebSocketService(
    "ws://localhost:8080/ui/sessions",
  );
  webSocketService.connect();

  return (
    <WebSocketContext.Provider value={webSocketService}>
      <VStack>
        <Box>Terminal 21</Box>
        <Box>
          <Sessions />
        </Box>
      </VStack>
    </WebSocketContext.Provider>
  );
}

export default App;
