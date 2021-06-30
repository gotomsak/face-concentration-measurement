import React, { useState, useEffect, useRef, createRef } from "react";

import ReactApexCharts from "react-apexcharts";
// import Chart from "react-apexcharts";
import ApexCharts from "apexcharts";
import store from "..";

import createStore from "../store";

const ChartViewComponent: React.FC<{ concViewData: any[] }> = ({
    concViewData,
}) => {
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

export default React.memo(ChartViewComponent);
