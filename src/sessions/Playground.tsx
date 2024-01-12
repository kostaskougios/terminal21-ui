import { ResponsiveBar } from "@nivo/bar";
import { ResponsiveLine } from "@nivo/line";
import { MathJax } from "better-react-mathjax";

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

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const Playground = () => <></>;

export default Playground;
