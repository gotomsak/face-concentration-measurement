import * as React from "react";
import { useState, useEffect } from "react";

import ApexCharts from "apexcharts";

import ReactApexCharts from "react-apexcharts";
// import data from "./scatter-plot-data.json";

const ScatterViewComponent: React.FC<{ data: any }> = (props) => {
    //boolean型のstateを作成
    const [update, setUpdata] = useState<boolean>(false);
    //レンダリングしたい場所でこれを差し込むだけ

    useEffect(() => {
        console.log(props.data);
        setUpdata(update ? false : true);
    }, [props.data]);

    const state = {
        series: [
            {
                name: "中央を見ている割合と試合時間",
                data: props.data,
            },
            // {
            //     name: "Instagram",
            //     data: [
            //         [6.4, 5.4],
            //         [11.7, 4],
            //         [15.4, 3],
            //         [9, 2],
            //         [10.9, 11],
            //         [20.9, 7],
            //         [12.9, 8.2],
            //         [6.4, 14],
            //         [11.6, 12],
            //     ],
            // },
        ],
        options: {
            chart: {
                height: 350,
                type: "scatter",
                animations: {
                    enabled: false,
                },
                zoom: {
                    enabled: false,
                },
                toolbar: {
                    show: false,
                },
            },
            colors: ["#056BF6", "#D2376A"],
            xaxis: {
                tickAmount: 10,
                min: 0,
                max: 1000,
            },
            yaxis: {
                tickAmount: 7,
                max: 100,
                min: 0,
            },
            markers: {
                size: 5,
            },
            fill: {
                // type: "image",
                // opacity: 1,
                // image: {
                //     src: [
                //         "../../assets/images/ico-messenger.png",
                //         "../../assets/images/ico-instagram.png",
                //     ],
                //     width: 40,
                //     height: 40,
                // },
            },
            legend: {
                labels: {
                    useSeriesColors: true,
                },
                markers: {
                    customHTML: [
                        function () {
                            return "";
                        },
                        function () {
                            return "";
                        },
                    ],
                },
            },
        },
    };
    return (
        <ReactApexCharts
            options={state.options}
            series={state.series}
            type="scatter"
            height={350}
        />
    );
};
export default ScatterViewComponent;
