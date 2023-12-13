import UiHandlers from "../model/UiHandlers";
import { mapResponse, mapResponses } from "./mapResponse";
import { ComponentRenderFunction, renderIfExists } from "./renderElement";

export function mapStd(msg: any, uiHandlers: UiHandlers): JSX.Element | null {
  return renderIfExists(ElementMap, uiHandlers, msg, msg.type == "Std");
}

const ElementMap: Record<string, ComponentRenderFunction> = {
  Paragraph: (b: any, uiHandlers: UiHandlers) => <p key={b.key}>
    {b.text}
    {mapResponses(b.children, uiHandlers)}
  </p>,
  Header1: (b: any) => <h1 key={b.key}>{b.text}</h1>,
};
