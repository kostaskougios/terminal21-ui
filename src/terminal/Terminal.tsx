import "./Terminal.css";
import { useEffect, useState } from "react";
import WebSocketService from "../service/WebSocketService";
import { mapResponse } from "./mapResponse";
import WsRequest from "../service/json/WsRequest";
import SessionId from "../service/json/SessionId";
import UiHandlers from "../model/UiHandlers";
import OnClickBody from "../service/json/OnClickBody";

interface TerminalProps {
  sessionId: string;
}

const Terminal: React.FC<TerminalProps> = ({ sessionId }) => {
  const [messages, setMessages] = useState<any[]>([]);
  const webSocketService = new WebSocketService(
    `terminal-ws-${sessionId}`,
    "ws://localhost:8080/ui/session",
  );

  webSocketService.subscribeToOnOpen(() => {
    webSocketService.send(new WsRequest("init", new SessionId(sessionId)));
  });
  webSocketService.connect();

  useEffect(() => {
    webSocketService.subscribeToMessages((messages) => {
      setMessages((prev) => messages.elements);
    });

    return () => {
      webSocketService.disconnect();
    };
  }, []);

  const uiHandlers = new UiHandlers((key) => {
    webSocketService.send(new WsRequest("onclick", new OnClickBody(key)));
  });
  return (
    <div className="Terminal">
      <p>Started session {sessionId}</p>
      {messages.map((msg) => mapResponse(msg, uiHandlers))}
    </div>
  );
};

export default Terminal;
