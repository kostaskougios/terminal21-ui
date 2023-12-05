import React from "react";
import { mapStd } from "./mapStd";
import { mapChakra } from "./mapChakra";

export function mapResponse(msg: any): JSX.Element {
  const r = [mapStd(msg), mapChakra(msg)].filter((e) => e != null);
  if (r.length > 0) return r[0]!;
  return <div>Unknown message format {JSON.stringify(msg)}</div>;
}
