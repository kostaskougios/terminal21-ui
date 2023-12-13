import "./Terminal.css";
import { mapResponse } from "./mapResponse";
import UiHandlers from "../model/UiHandlers";

interface TerminalProps {
  sessionId: string;
  params: any;
}

const Terminal: React.FC<TerminalProps> = ({ sessionId, params }) => {
  const uiHandlers: UiHandlers = params.uiHandlers;
  const messages: any[] = params.elements;
  return (
    <div className="Terminal">
      <p>Started session {sessionId}</p>
      {messages.map((msg) => mapResponse(msg, uiHandlers))}
    </div>
  );
};

export default Terminal;
