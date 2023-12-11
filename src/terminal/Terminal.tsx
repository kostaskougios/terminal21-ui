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
  messages: any[];
}

const Terminal: React.FC<TerminalProps> = ({ sessionId, messages }) => {
  console.log("Terminal messages = ", messages);
  const uiHandlers = new UiHandlers((key) => {
    alert(key);
    // webSocketService.send(new WsRequest("onclick", new OnClickBody(key)));
  });
  return (
    <div className="Terminal">
      <p>Started session {sessionId}</p>
      {messages.map((msg) => mapResponse(msg, uiHandlers))}
    </div>
  );
};

export default Terminal;
