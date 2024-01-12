import { MathJax } from "better-react-mathjax";
import UiHandlers from "../model/UiHandlers";
import { ComponentRenderFunction, renderIfExists } from "./renderElement";

export function mapMathJax(
  msg: any,
  uiHandlers: UiHandlers
): JSX.Element | null {
  return renderIfExists(ElementMap, uiHandlers, msg, msg.type === "MathJax");
}

export function elementAttributes(b: any) {
  const { expression, ...buttonProps } = b;
  return buttonProps;
}

const ElementMap: Record<string, ComponentRenderFunction> = {
  MathJax: (b: any) => (
    <MathJax inline {...elementAttributes(b)}>
      {b.expression}
    </MathJax>
  ),
};
