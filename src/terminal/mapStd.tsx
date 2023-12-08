import UiHandlers from "../model/UiHandlers";
import { ComponentRenderFunction, renderIfExists } from "./renderElement";

export function mapStd(msg: any,uiHandlers: UiHandlers): JSX.Element | null {
  return renderIfExists(ElementMap,uiHandlers, msg, msg.type == "Std");
}

const ElementMap: Record<string, ComponentRenderFunction> = {
  Paragraph: (b: any) => <p key={b.key}>{b.text}</p>,
  Header1: (b: any) => <h1 key={b.key}>{b.text}</h1>,
};
