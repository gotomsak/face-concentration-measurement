import React, { useState, useEffect } from 'react'
import ReactApexChart from 'react-apexcharts'
import { ReactReduxContext } from 'react-redux'
import { concIDReducer } from '../../reducers/concIDReducer'



const ConcToCorrectViewComponent: React.FC<{ConcToCorrectData: any}>=(props)=>{


    return(
        <div>
            <ReactApexChart 
                height={350} 
                width={1000} 
                type="scatter"
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
                    // tooltip: {
                    //     enabled: true,
                    //     x: {
                    //         format: "yyyy/MM/dd HH:mm:ss.f",
                    //     },
                    // },
                    // xaxis: {
                    //     type: "datetime",
                    //     // categorise: concViewData[0][x],
                    //     // range: concViewData.length,
                    //     labels: {
                    //         show: true,
                    //     },
                    //     axisBorder: {
                    //         show: true,
                    //     },
                    //     axisTicks: {
                    //         show: true,
                    //     },
                    //     crosshairs: {
                    //         show: true,
                    //     },
                    //     // range: 10,
                    // },
                    // yaxis: {
                    //     max: 1,
                    //     min: 0,
                    // },

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
                series={props.ConcToCorrectData}
                ></ReactApexChart>

        </div>
    )
}

export default ConcToCorrectViewComponent