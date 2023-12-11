import "./Terminal.css";
import { mapResponse } from "./mapResponse";
import UiHandlers from "../model/UiHandlers";

interface TerminalProps {
  sessionId: string;
  messages: any[];
}

const Terminal: React.FC<TerminalProps> = ({ sessionId, messages }) => {
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
