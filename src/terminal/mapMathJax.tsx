import { MathJax } from "better-react-mathjax";
import UiHandlers from "../model/UiHandlers";
import {
  ComponentRenderFunction,
  MapElement,
  NoElement,
  renderIfExists,
} from "./renderElement";

export function mapMathJax(msg: any, uiHandlers: UiHandlers): MapElement {
  return renderIfExists(ElementMap, uiHandlers, msg, msg.type === "MathJax");
}

export function elementAttributes(b: any) {
  const { expression, ...buttonProps } = b;
  return buttonProps;
}

const ElementMap: Record<string, ComponentRenderFunction> = {
  MathJax: (b: any) => (
    <MathJax {...elementAttributes(b)}>{b.expression}</MathJax>
  ),
};
