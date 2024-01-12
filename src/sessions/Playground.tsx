import { ResponsiveBar } from "@nivo/bar";
import { ResponsiveLine } from "@nivo/line";
import { MathJax } from "better-react-mathjax";

const PlaygroundData = [
  {
    country: "AD",
    "hot dog": 150,
    "hot dogColor": "hsl(202, 70%, 50%)",
    burger: 189,
    burgerColor: "hsl(106, 70%, 50%)",
    sandwich: 170,
    sandwichColor: "hsl(115, 70%, 50%)",
    kebab: 52,
    kebabColor: "hsl(110, 70%, 50%)",
    fries: 161,
    friesColor: "hsl(193, 70%, 50%)",
    donut: 116,
    donutColor: "hsl(205, 70%, 50%)",
  },
  {
    country: "AE",
    "hot dog": 124,
    "hot dogColor": "hsl(340, 70%, 50%)",
    burger: 84,
    burgerColor: "hsl(349, 70%, 50%)",
    sandwich: 196,
    sandwichColor: "hsl(108, 70%, 50%)",
    kebab: 136,
    kebabColor: "hsl(113, 70%, 50%)",
    fries: 72,
    friesColor: "hsl(209, 70%, 50%)",
    donut: 145,
    donutColor: "hsl(47, 70%, 50%)",
  },
  {
    country: "AF",
    "hot dog": 2,
    "hot dogColor": "hsl(8, 70%, 50%)",
    burger: 86,
    burgerColor: "hsl(94, 70%, 50%)",
    sandwich: 30,
    sandwichColor: "hsl(297, 70%, 50%)",
    kebab: 189,
    kebabColor: "hsl(208, 70%, 50%)",
    fries: 166,
    friesColor: "hsl(230, 70%, 50%)",
    donut: 185,
    donutColor: "hsl(189, 70%, 50%)",
  },
  {
    country: "AG",
    "hot dog": 3,
    "hot dogColor": "hsl(295, 70%, 50%)",
    burger: 138,
    burgerColor: "hsl(68, 70%, 50%)",
    sandwich: 95,
    sandwichColor: "hsl(227, 70%, 50%)",
    kebab: 163,
    kebabColor: "hsl(304, 70%, 50%)",
    fries: 143,
    friesColor: "hsl(158, 70%, 50%)",
    donut: 8,
    donutColor: "hsl(316, 70%, 50%)",
  },
  {
    country: "AI",
    "hot dog": 174,
    "hot dogColor": "hsl(136, 70%, 50%)",
    burger: 138,
    burgerColor: "hsl(358, 70%, 50%)",
    sandwich: 110,
    sandwichColor: "hsl(287, 70%, 50%)",
    kebab: 12,
    kebabColor: "hsl(239, 70%, 50%)",
    fries: 50,
    friesColor: "hsl(230, 70%, 50%)",
    donut: 98,
    donutColor: "hsl(141, 70%, 50%)",
  },
  {
    country: "AL",
    "hot dog": 188,
    "hot dogColor": "hsl(201, 70%, 50%)",
    burger: 133,
    burgerColor: "hsl(325, 70%, 50%)",
    sandwich: 42,
    sandwichColor: "hsl(316, 70%, 50%)",
    kebab: 191,
    kebabColor: "hsl(113, 70%, 50%)",
    fries: 180,
    friesColor: "hsl(353, 70%, 50%)",
    donut: 27,
    donutColor: "hsl(56, 70%, 50%)",
  },
  {
    country: "AM",
    "hot dog": 35,
    "hot dogColor": "hsl(120, 70%, 50%)",
    burger: 98,
    burgerColor: "hsl(91, 70%, 50%)",
    sandwich: 182,
    sandwichColor: "hsl(149, 70%, 50%)",
    kebab: 196,
    kebabColor: "hsl(340, 70%, 50%)",
    fries: 197,
    friesColor: "hsl(129, 70%, 50%)",
    donut: 14,
    donutColor: "hsl(26, 70%, 50%)",
  },
];
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
const Playground = () => (
  <>
    <MathJax>{"\\(\\frac{10}{4x} \\approx 2^{12}\\)"}</MathJax>
    <p>
      When 
      <MathJax>{"\\(a \\ne 0\\)"}</MathJax>
      , there are two solutions to 
      <MathJax>{"\\(ax^2 + bx + c = 0\\)"}</MathJax>
      and they are
      <MathJax>{"$$x = {-b \\pm \\sqrt{b ^ 2 - 4ac} \\over 2a}.$$"}</MathJax>
    </p>
    <ResponsiveBar
      data={PlaygroundData}
      theme={darkTheme}
      keys={["hot dog", "burger", "sandwich", "kebab", "fries", "donut"]}
      indexBy="country"
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      padding={0.3}
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      colors={{ scheme: "nivo" }}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "#38bcb2",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "#eed312",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      fill={[
        {
          match: {
            id: "fries",
          },
          id: "dots",
        },
        {
          match: {
            id: "sandwich",
          },
          id: "lines",
        },
      ]}
      borderColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "country",
        legendPosition: "middle",
        legendOffset: 32,
        truncateTickAt: 0,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "food",
        legendPosition: "middle",
        legendOffset: -40,
        truncateTickAt: 0,
      }}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      legends={[
        {
          dataFrom: "keys",
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 120,
          translateY: 0,
          itemsSpacing: 2,
          itemWidth: 100,
          itemHeight: 20,
          itemDirection: "left-to-right",
          itemOpacity: 0.85,
          symbolSize: 20,
          effects: [
            {
              on: "hover",
              style: {
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
      role="application"
      ariaLabel="Nivo bar chart demo"
      barAriaLabel={(e) =>
        e.id + ": " + e.formattedValue + " in country: " + e.indexValue
      }
    />

  </>
);

export default Playground;
