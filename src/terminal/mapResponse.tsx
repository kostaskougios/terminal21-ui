import React from "react";
import { mapStd } from "./mapStd";
import { mapChakra } from "./mapChakra";
import UiHandlers from "../model/UiHandlers";

export function mapResponse(msg: any, uiHandlers: UiHandlers): JSX.Element {
  const r = [mapStd(msg, uiHandlers), mapChakra(msg, uiHandlers)].filter(
    (e) => e != null,
  );
  if (r.length > 0) return r[0]!;
  return <div>Unknown message format {JSON.stringify(msg)}</div>;
}

export function mapResponses(
  msgs: any[],
  uiHandlers: UiHandlers,
): JSX.Element[] {
  return msgs.map((msg) => mapResponse(msg, uiHandlers));
}
