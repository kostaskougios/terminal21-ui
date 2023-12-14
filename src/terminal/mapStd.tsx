import UiHandlers from "../model/UiHandlers";
import { mapResponse, mapResponses } from "./mapResponse";
import { ComponentRenderFunction, renderIfExists } from "./renderElement";

export function mapStd(msg: any, uiHandlers: UiHandlers): JSX.Element | null {
  return renderIfExists(ElementMap, uiHandlers, msg, msg.type == "Std");
}

const ElementMap: Record<string, ComponentRenderFunction> = {
  Span: (b: any) => <span key={b.key}>{b.text}</span>,
  NewLine: (b: any) => <br key={b.key} />,
  Paragraph: (b: any, uiHandlers: UiHandlers) => (
    <p key={b.key}>
      {b.text}
      {mapResponses(b.children, uiHandlers)}
    </p>
  ),
  Header1: (b: any) => <h1 key={b.key}>{b.text}</h1>,
  Em: (b: any) => <em key={b.key}>{b.text}</em>,
};
