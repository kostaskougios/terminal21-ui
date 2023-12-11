import "./Terminal.css";
import { mapResponse } from "./mapResponse";
import UiHandlers from "../model/UiHandlers";

interface TerminalProps {
  sessionId: string;
  messages: any[];
  uiHandlers: UiHandlers;
}

const Terminal: React.FC<TerminalProps> = ({ sessionId, messages, uiHandlers }) => {
  return (
    <div className="Terminal">
      <p>Started session {sessionId}</p>
      {messages.map((msg) => mapResponse(msg, uiHandlers))}
    </div>
  );
};

export default Terminal;
