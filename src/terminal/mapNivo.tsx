import { ResponsiveLine } from "@nivo/line";
import UiHandlers from "../model/UiHandlers";
import { ComponentRenderFunction, renderIfExists } from "./renderElement";

export function mapNivo(msg: any, uiHandlers: UiHandlers): JSX.Element | null {
    console.log(msg);
  return renderIfExists(ElementMap, uiHandlers, msg, msg.type === "Nivo");
}

const darkTheme = {
  background: "black",
  axis: {
    domain: {
      line: {
        stroke: "#777777",
        strokeWidth: 1,
      },
    },
    ticks: {
      line: {
        stroke: "#777777",
        strokeWidth: 1,
      },
      text: {
        fill: "#ffffff",
      },
    },
    legend: {
      text: {
        fill: "#aaaaaa",
      },
    },
  },
  grid: {
    line: {
      stroke: "#555555",
      strokeWidth: 1,
    },
  },
  legends: {
    text: {
      fill: "#ffffff",
    },
  },
  tooltip: {
    container: {
      background: "#000000",
      color: "#ffffff",
      fontSize: "13px",
    },
  },
};

function elementAttributes(b: any) {
  const { wrapperStyle, ...buttonProps } = b;
  return buttonProps;
}

const ElementMap: Record<string, ComponentRenderFunction> = {
  ResponsiveLine: (b: any) => (
    <div key={b.key + "-wrapper"} style={b.wrapperStyle}>
      <ResponsiveLine
        theme={darkTheme}
        {...elementAttributes(b)}
      ></ResponsiveLine>
    </div>
  ),
};
