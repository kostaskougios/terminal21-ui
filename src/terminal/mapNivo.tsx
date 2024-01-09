import { ResponsiveLine } from "@nivo/line";
import UiHandlers from "../model/UiHandlers";
import { ComponentRenderFunction, renderIfExists } from "./renderElement";

export function mapNivo(
    msg: any,
    uiHandlers: UiHandlers,
): JSX.Element | null {
    return renderIfExists(ElementMap, uiHandlers, msg, msg.type === "Nivo");
}

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

const ElementMap: Record<string, ComponentRenderFunction> = {
    ResponsiveLine: (b: any) => <div key={b.key+"wrapper"} style={{height: "200px"}}><ResponsiveLine theme={darkTheme} {...b}></ResponsiveLine></div>,
}  