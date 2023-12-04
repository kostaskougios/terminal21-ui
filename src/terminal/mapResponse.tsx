import React from 'react';
import { mapStd } from './mapStd';

export function mapResponse(msg: any): JSX.Element {
    // Check for the presence of different keys and handle accordingly
    const r = [mapStd(msg)].filter((e) => e != null)
    if (r.length >0) return r[0]!;
    return <div>Unknown message format</div>;
}
