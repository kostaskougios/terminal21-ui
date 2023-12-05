
export type ComponentRenderFunction = (props: any) => JSX.Element;

export function renderElement(elementMap: Record<string, ComponentRenderFunction>, element: any): JSX.Element {
    const k = Object.keys(element).find((key) => (elementMap[key]) != null);
    if (k) return elementMap[k](element[k]);
    return <div>Unkown element {element}</div>;
}


export function renderIfExists(elementMap: Record<string, ComponentRenderFunction>, msg: any): JSX.Element | null {
    return msg != null ? renderElement(elementMap, msg.element) : null;
}
