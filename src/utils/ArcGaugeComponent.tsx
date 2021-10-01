import * as React from "react";
// import * as ReactDOM from "react-dom";
import { ArcGauge, ArcGaugeProps } from "@progress/kendo-react-gauges";

const colors = [
    {
        to: 25,
        color: "#0058e9",
    },
    {
        from: 25,
        to: 5,
        color: "#37b400",
    },
    {
        from: 5,
        to: 75,
        color: "#ffc000",
    },
    {
        from: 75,
        color: "#f31700",
    },
];

const ArcGaugeComponent: React.FC<{ value: any }> = ({ value }) => {
    const arcOptions: ArcGaugeProps = {
        value: Math.floor(value * 100),
        style: { position: "relative", width: 200, height: 100 },

        colors,
    };

    const arcCenterRenderer = (value: any, color: any) => {
        return (
            <h3
                style={{
                    color: color,
                    position: "relative",
                }}
            >
                {value}%
            </h3>
        );
    };

    return <ArcGauge {...arcOptions} arcCenterRender={arcCenterRenderer} />;
};

export default React.memo(ArcGaugeComponent);
