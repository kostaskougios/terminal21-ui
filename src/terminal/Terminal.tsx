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
  const rootKeys: string[] = params.rootKeys;

  if (rootKeys) {
    const elements: any = params.elements;
    const keyTree: any = params.keyTree;

    const reconstruct = (key: string) => {
      const e = JSON.parse(JSON.stringify(elements[key])); // clone it
      const childKeys: string[] = keyTree[key];
      if (!childKeys) throw `can't find keyTree[${key}]`;
      const children: any[] = childKeys.map((k) => reconstruct(k));
      if (children.length > 0) {
        const topLevelKey = Object.keys(e)[0];
        const topLevel = e[topLevelKey];
        topLevel.children = children;
      }
      return e;
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
