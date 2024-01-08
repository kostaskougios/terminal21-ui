import { ResponsiveLine } from '@nivo/line'

const PlaygroundData = [
    {
        "id": "japan",
        "color": "hsl(88, 70%, 50%)",
        "data": [
            {
                "x": "plane",
                "y": 262
            },
            {
                "x": "helicopter",
                "y": 26
            },
            {
                "x": "boat",
                "y": 43
            },
            {
                "x": "train",
                "y": 255
            },
            {
                "x": "subway",
                "y": 260
            },
            {
                "x": "bus",
                "y": 204
            },
            {
                "x": "car",
                "y": 216
            },
            {
                "x": "moto",
                "y": 218
            },
            {
                "x": "bicycle",
                "y": 192
            },
            {
                "x": "horse",
                "y": 266
            },
            {
                "x": "skateboard",
                "y": 56
            },
            {
                "x": "others",
                "y": 169
            }
        ]
    },
    {
        "id": "france",
        "color": "hsl(186, 70%, 50%)",
        "data": [
            {
                "x": "plane",
                "y": 271
            },
            {
                "x": "helicopter",
                "y": 31
            },
            {
                "x": "boat",
                "y": 27
            },
            {
                "x": "train",
                "y": 138
            },
            {
                "x": "subway",
                "y": 219
            },
            {
                "x": "bus",
                "y": 160
            },
            {
                "x": "car",
                "y": 213
            },
            {
                "x": "moto",
                "y": 296
            },
            {
                "x": "bicycle",
                "y": 244
            },
            {
                "x": "horse",
                "y": 233
            },
            {
                "x": "skateboard",
                "y": 106
            },
            {
                "x": "others",
                "y": 48
            }
        ]
    },
    {
        "id": "us",
        "color": "hsl(15, 70%, 50%)",
        "data": [
            {
                "x": "plane",
                "y": 23
            },
            {
                "x": "helicopter",
                "y": 95
            },
            {
                "x": "boat",
                "y": 187
            },
            {
                "x": "train",
                "y": 248
            },
            {
                "x": "subway",
                "y": 7
            },
            {
                "x": "bus",
                "y": 122
            },
            {
                "x": "car",
                "y": 65
            },
            {
                "x": "moto",
                "y": 178
            },
            {
                "x": "bicycle",
                "y": 273
            },
            {
                "x": "horse",
                "y": 171
            },
            {
                "x": "skateboard",
                "y": 128
            },
            {
                "x": "others",
                "y": 180
            }
        ]
    },
    {
        "id": "germany",
        "color": "hsl(265, 70%, 50%)",
        "data": [
            {
                "x": "plane",
                "y": 47
            },
            {
                "x": "helicopter",
                "y": 42
            },
            {
                "x": "boat",
                "y": 204
            },
            {
                "x": "train",
                "y": 50
            },
            {
                "x": "subway",
                "y": 206
            },
            {
                "x": "bus",
                "y": 244
            },
            {
                "x": "car",
                "y": 166
            },
            {
                "x": "moto",
                "y": 112
            },
            {
                "x": "bicycle",
                "y": 294
            },
            {
                "x": "horse",
                "y": 234
            },
            {
                "x": "skateboard",
                "y": 3
            },
            {
                "x": "others",
                "y": 104
            }
        ]
    },
    {
        "id": "norway",
        "color": "hsl(296, 70%, 50%)",
        "data": [
            {
                "x": "plane",
                "y": 56
            },
            {
                "x": "helicopter",
                "y": 0
            },
            {
                "x": "boat",
                "y": 50
            },
            {
                "x": "train",
                "y": 292
            },
            {
                "x": "subway",
                "y": 267
            },
            {
                "x": "bus",
                "y": 106
            },
            {
                "x": "car",
                "y": 4
            },
            {
                "x": "moto",
                "y": 10
            },
            {
                "x": "bicycle",
                "y": 102
            },
            {
                "x": "horse",
                "y": 128
            },
            {
                "x": "skateboard",
                "y": 57
            },
            {
                "x": "others",
                "y": 210
            }
        ]
    }
];

const darkTheme = {
    background: "black",
    axis: {
        domain: {
            line: {
                stroke: "#777777",
                strokeWidth: 1
            }
        },
        ticks: {
            line: {
                stroke: "#777777",
                strokeWidth: 1
            },
            text: {
                fill: "#ffffff"
            }
        },
        legend: {
            text: {
                fill: "#aaaaaa"
            }
        }
    },
    grid: {
        line: {
            stroke: "#555555",
            strokeWidth: 1
        }
    },
    legends: {
        text: {
            fill: "#ffffff"
        }
    },
    tooltip: {
        container: {
            background: "#000000",
            color: "#ffffff",
            fontSize: "13px"
        }
    }
};

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const Playground = () => (

    <ResponsiveLine
        data={PlaygroundData}
        theme={darkTheme}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: 'point' }}
        yScale={{
            type: 'linear',
            min: 'auto',
            max: 'auto',
            stacked: true,
            reverse: false
        }}
        yFormat=" >-.2f"
        axisTop={null}
        axisRight={null}
        axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'transportation',
            legendOffset: 36,
            legendPosition: 'middle'
        }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'count',
            legendOffset: -40,
            legendPosition: 'middle'
        }}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-12}
        useMesh={true}
        legends={[
            {
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 100,
                translateY: 0,
                itemsSpacing: 0,
                itemDirection: 'left-to-right',
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: 'circle',
                symbolBorderColor: 'rgba(0, 0, 0, .5)',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemBackground: 'rgba(0, 0, 0, .03)',
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
    />
);

export default Playground;
