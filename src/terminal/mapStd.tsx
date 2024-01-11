import UiHandlers from "../model/UiHandlers";
import { elementAttributes, mapResponses } from "./mapResponse";
import { ComponentRenderFunction, renderIfExists } from "./renderElement";

export function mapStd(msg: any, uiHandlers: UiHandlers): JSX.Element | null {
  return renderIfExists(ElementMap, uiHandlers, msg, msg.type === "Std");
}

const ElementMap: Record<string, ComponentRenderFunction> = {
  Span: (b: any) => <span {...elementAttributes(b)}>{b.text}</span>,
  NewLine: (b: any) => <br {...elementAttributes(b)} />,
  Paragraph: (b: any, uiHandlers: UiHandlers) => (
    <p {...elementAttributes(b)}>
      {b.text}
      {mapResponses(b.children, uiHandlers)}
    </p>
  ),
  Header1: (b: any) => <h1 {...elementAttributes(b)}>{b.text}</h1>,
  Em: (b: any) => <em {...elementAttributes(b)}>{b.text}</em>,
  Input: (b: any, uiHandlers: UiHandlers) => (
    <input
      {...elementAttributes(b)}
      onChange={(event) => uiHandlers.onChange(b.key, event.target.value)}
    ></input>
  ),
};
