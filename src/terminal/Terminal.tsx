import "./Terminal.css";
import { mapResponse } from "./mapResponse";
import UiHandlers from "../model/UiHandlers";
import { NoElement } from "./renderElement";

interface TerminalProps {
  session: any;
  params: any;
}

const Terminal: React.FC<TerminalProps> = ({ session, params }) => {
  const uiHandlers: UiHandlers = params.uiHandlers;
  const elements: string[] = params.elements;

  if (elements) {
    return (
      <div className="Terminal">
        {elements
          .map((msg) => mapResponse(msg, uiHandlers))
          .filter((e) => e != NoElement)}
      </div>
    );
  } else return <div className="Terminal">Not yet ready</div>;
};

export default Terminal;
