import "./App.css";
import Sessions from "./sessions/Sessions";
import { VStack, Box } from "@chakra-ui/react";
import { WebSocketContext, WebSocketService } from "./service/WebSocketService";
import { MathJaxContext } from "better-react-mathjax";

function App() {
  const host = window.location.hostname;
  const webSocketService = new WebSocketService(
    `ws://${host}:8080/ui/sessions`
  );
  webSocketService.connect();

  return (
    <MathJaxContext version={3}>
      <WebSocketContext.Provider value={webSocketService}>
        <Sessions />
      </WebSocketContext.Provider>
    </MathJaxContext>
  );
}

export default App;
