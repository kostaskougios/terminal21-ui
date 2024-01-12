import { MathJax } from "better-react-mathjax";
import UiHandlers from "../model/UiHandlers";
import { ComponentRenderFunction, renderIfExists } from "./renderElement";

export function mapMathJax(
  msg: any,
  uiHandlers: UiHandlers
): JSX.Element | null {
  return renderIfExists(ElementMap, uiHandlers, msg, msg.type === "MathJax");
}

const ElementMap: Record<string, ComponentRenderFunction> = {
  MathJax: (b: any) => <MathJax key={b.key}>{b.expression}</MathJax>,
};
