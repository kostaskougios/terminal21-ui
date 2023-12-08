import UiHandlers from "../model/UiHandlers";

export type ComponentRenderFunction = (props: any, uiHandlers: UiHandlers) => JSX.Element;

export function renderElement(
  elementMap: Record<string, ComponentRenderFunction>,
  uiHandlers: UiHandlers,
  element: any,
): JSX.Element {
  const k = Object.keys(element).find((key) => elementMap[key] != null);
  if (k) return elementMap[k](element[k], uiHandlers);
  return <div>Unkown element {element}</div>;
}

export function renderIfExists(
  elementMap: Record<string, ComponentRenderFunction>,
  uiHandlers: UiHandlers,
  msg: any,
  validType: boolean
): JSX.Element | null {
  return validType ? renderElement(elementMap,uiHandlers, msg) : null;
}
