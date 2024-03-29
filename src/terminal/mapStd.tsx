import UiHandlers from "../model/UiHandlers";
import { elementAttributes, mapResponses } from "./mapResponse";
import {
  ComponentRenderFunction,
  MapElement,
  NoElement,
  renderIfExists,
} from "./renderElement";
import Cookies from "js-cookie";
import { shouldProcessTransientRequestWith } from "./transientRequest";

export function mapStd(msg: any, uiHandlers: UiHandlers): MapElement {
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
  Header2: (b: any) => <h2 {...elementAttributes(b)}>{b.text}</h2>,
  Header3: (b: any) => <h3 {...elementAttributes(b)}>{b.text}</h3>,
  Header4: (b: any) => <h4 {...elementAttributes(b)}>{b.text}</h4>,
  Header5: (b: any) => <h5 {...elementAttributes(b)}>{b.text}</h5>,
  Header6: (b: any) => <h6 {...elementAttributes(b)}>{b.text}</h6>,
  Em: (b: any) => <em {...elementAttributes(b)}>{b.text}</em>,
  Input: (b: any, uiHandlers: UiHandlers) => (
    <input
      {...elementAttributes(b)}
      onChange={(event) => uiHandlers.onChange(b.key, event.target.value)}
    ></input>
  ),
  Cookie: (b: any, uiHandlers: UiHandlers) => {
    if (shouldProcessTransientRequestWith(b.requestId)) {
      const { key, name, value, ...expireProps } = b;
      Cookies.set(name, value);
    }
    return NoElement;
  },
  CookieReader: (b: any, uiHandlers: UiHandlers) => {
    if (shouldProcessTransientRequestWith(b.requestId)) {
      const v = Cookies.get(b.name);
      uiHandlers.onChange(b.key, v === undefined ? null : v);
    }
    return NoElement;
  },
};
