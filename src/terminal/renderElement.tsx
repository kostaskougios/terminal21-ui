import UiHandlers from "../model/UiHandlers";

export const NoElement = "no-element";

export type MapElement = JSX.Element | null | typeof NoElement;

export type ComponentRenderFunction = (
  props: any,
  uiHandlers: UiHandlers
) => JSX.Element | typeof NoElement;

export function renderElement(
  elementMap: Record<string, ComponentRenderFunction>,
  uiHandlers: UiHandlers,
  element: any
): JSX.Element | typeof NoElement {
  const k = Object.keys(element).find((key) => elementMap[key] != null);
  if (k) {
    const f = elementMap[k];
    return f(element[k], uiHandlers);
  }
  return <div>Unkown element {element}</div>;
}

export function renderIfExists(
  elementMap: Record<string, ComponentRenderFunction>,
  uiHandlers: UiHandlers,
  msg: any,
  validType: boolean
): JSX.Element | null | typeof NoElement {
  return validType ? renderElement(elementMap, uiHandlers, msg) : null;
}
