import { ComponentRenderFunction, renderIfExists } from "./renderElement";

export function mapStd(msg: any): JSX.Element | null {
  return renderIfExists(ElementMap, msg.Std);
}

const ElementMap: Record<string, ComponentRenderFunction> = {
  Paragraph: (b: any) => <p key={b.key}>{b.text}</p>,
  Header1: (b: any) => <h1 key={b.key}>{b.text}</h1>,
};
