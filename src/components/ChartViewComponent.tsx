import React, { useState, useEffect, useRef, createRef } from "react";

import ReactApexCharts from "react-apexcharts";
// import Chart from "react-apexcharts";
import ApexCharts from "apexcharts";
import store from "..";

import createStore from "../store";

const ChartViewComponent: React.FC<{ concViewData: any[] }> = ({
    concViewData,
}) => {
    // const [concViewData, setConcViewData] = useState<any[]>([
    //     {
    //         name: "c3",
    //         data: [],
    //     },
    // ]);
    const chartRef = createRef();
    // store.subscribe(() => {
    //     const valueLen = store.getState().concReducer["c3"].length;

    //     if (store.getState().concReducer["c3"].length > 10) {
    //         concViewData[0]["data"].push({
    //             x: store.getState().concReducer["date"][valueLen - 1],
    //             y: store.getState().concReducer["c3"][valueLen - 1],
    //         });
    //         // {
    //         //     x: store.getState().concReducer["date"][valueLen - 10],
    //         //     y: store.getState().concReducer["c3"][valueLen - 10],
    //         // },
    //         // {
    //         //     x: store.getState().concReducer["date"][valueLen - 9],
    //         //     y: store.getState().concReducer["c3"][valueLen - 9],
    //         // },
    //         // {
    //         //     x: store.getState().concReducer["date"][valueLen - 8],
    //         //     y: store.getState().concReducer["c3"][valueLen - 8],
    //         // },
    //         // {
    //         //     x: store.getState().concReducer["date"][valueLen - 7],
    //         //     y: store.getState().concReducer["c3"][valueLen - 7],
    //         // },
    //         // {
    //         //     x: store.getState().concReducer["date"][valueLen - 6],
    //         //     y: store.getState().concReducer["c3"][valueLen - 6],
    //         // },
    //         // {
    //         //     x: store.getState().concReducer["date"][valueLen - 5],
    //         //     y: store.getState().concReducer["c3"][valueLen - 5],
    //         // },
    //         // {
    //         //     x: store.getState().concReducer["date"][valueLen - 4],
    //         //     y: store.getState().concReducer["c3"][valueLen - 4],
    //         // },
    //         // {
    //         //     x: store.getState().concReducer["date"][valueLen - 3],
    //         //     y: store.getState().concReducer["c3"][valueLen - 3],
    //         // },
    //         // {
    //         //     x: store.getState().concReducer["date"][valueLen - 2],
    //         //     y: store.getState().concReducer["c3"][valueLen - 2],
    //         // },
    //         // {
    //         //     x: store.getState().concReducer["date"][valueLen - 1],
    //         //     y: store.getState().concReducer["c3"][valueLen - 1],
    //         // },
    //         //];
    //         ApexCharts.exec("realtime", "updateSeries", concViewData);

    //         // xLange.push(
    //         //     xLange.push(store.getState().concReducer["date"][valueLen - 1])
    //         // );
    //     }
    // });

    return (
        <div>
            <ReactApexCharts
                height={350}
                width={1000}
                type="line"
                options={{
                    chart: {
                        // id: "realtime",
                        // animations: {
                        //     enabled: true,
                        //     easing: "linear",
                        //     dynamicAnimation: {
                        //         speed: 500,
                        //     },
                        // },
                        // zoom: {
                        //     enabled: false,
                        // },
                        toolbar: {
                            export: {
                                csv: {
                                    dateFormatter(timestamp: any) {
                                        return new Date(
                                            timestamp
                                        ).toLocaleString();
                                    },
                                },
                            },
                        },
                    },
                    tooltip: {
                        enabled: true,
                        x: {
                            format: "yyyy/MM/dd HH:mm:ss.f",
                        },
                    },
                    xaxis: {
                        type: "datetime",
                        // categorise: concViewData[0][x],
                        // range: concViewData.length,
                        labels: {
                            show: true,
                        },
                        axisBorder: {
                            show: true,
                        },
                        axisTicks: {
                            show: true,
                        },
                        crosshairs: {
                            show: true,
                        },
                        // range: 10,
                    },
                    yaxis: {
                        max: 1,
                        min: 0,
                    },

                    noData: {
                        text: "Loading...",
                    },
                    // stroke: {
                    //     curve: "smooth",
                    // },
                    legend: {
                        show: true,
                    },
                }}
                series={concViewData}
            />
        </div>
    );
};

export default ChartViewComponent;
