import "./Terminal.css";
import { useEffect, useState } from "react";
import WebSocketService from "../service/WebSocketService";
import { mapResponse } from "./mapResponse";
function Terminal() {
  const [messages, setMessages] = useState<any[]>([]);
  const webSocketService = new WebSocketService(
    "terminal-ws",
    "ws://localhost:8080/ui/session",
  );

  useEffect(() => {
    webSocketService.connect();
    console.log("websocket connected");
    webSocketService.subscribeToMessages((message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      webSocketService.disconnect();
    };
  }, []);

  return (
    <div className="Terminal">
      <p>The main terminal area</p>
      {messages.map((msg) => mapResponse(msg))}
    </div>
  );
}

export default Terminal;
