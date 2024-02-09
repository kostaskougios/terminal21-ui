import "./Terminal.css";
import { mapResponse } from "./mapResponse";
import UiHandlers from "../model/UiHandlers";
import { NoElement } from "./renderElement";

interface TerminalProps {
  sessionId: string;
  params: any;
}

const Terminal: React.FC<TerminalProps> = ({ sessionId, params }) => {
  const uiHandlers: UiHandlers = params.uiHandlers;
  const rootKeys: string[] = params.rootKeys;

  if (rootKeys) {
    const elements: any = params.elements;
    const keyTree: any = params.keyTree;

    const reconstruct = (key: string) => {
      const e = elements[key];
      const childKeys: string[] = keyTree[key];
      if (!childKeys) throw `can't find keyTree[${key}]`;
      const children: any[] = childKeys.map((k) => reconstruct(k));
      const ec = e; //JSON.parse(JSON.stringify(e));
      if (children.length > 0) {
        const topLevelKey = Object.keys(ec)[0];
        ec[topLevelKey].children = children;
      }
      return ec;
    };

    const reconstructed: any[] = rootKeys.map((key) => reconstruct(key));
    return (
      <div className="Terminal">
        {reconstructed
          .map((msg) => mapResponse(msg, uiHandlers))
          .filter((e) => e != NoElement)}
      </div>
    );
  } else return <div className="Terminal">Not yet ready</div>;
};

export default Terminal;
