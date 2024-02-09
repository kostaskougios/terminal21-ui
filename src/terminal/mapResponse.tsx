import React from "react";
import { mapStd } from "./mapStd";
import { mapChakra } from "./mapChakra";
import UiHandlers from "../model/UiHandlers";
import { mapNivo } from "./mapNivo";
import { mapMathJax } from "./mapMathJax";
import { NoElement } from "./renderElement";

export function mapResponse(
  msg: any,
  uiHandlers: UiHandlers
): JSX.Element | typeof NoElement {
  const r = [
    mapStd(msg, uiHandlers),
    mapChakra(msg, uiHandlers),
    mapNivo(msg, uiHandlers),
    mapMathJax(msg, uiHandlers),
  ].filter((e) => e != null);
  if (r.length > 0) {
    const res = r[0];
    return res!;
  }
  return <div>Unknown message format {JSON.stringify(msg)}</div>;
}

export function mapResponses(
  msgs: any[],
  uiHandlers: UiHandlers
): JSX.Element[] {
  return msgs
    .map((msg) => mapResponse(msg, uiHandlers))
    .filter((e) => e != NoElement) as JSX.Element[];
}

export function elementAttributes(b: any) {
  const { text, leftIcon, rightIcon, ...props } = b;
  return props;
}
