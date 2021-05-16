import React, { useState, useEffect } from "react";
import ChartViewComponent from "../../components/ChartViewComponent";
import ReactApexCharts from "react-apexcharts";
import ApexCharts from "apexcharts";
import { getRecAll } from "../../apis/backendAPI/analysis/getRecAll";

function AnalysisPage() {
    const [concViewData, setConcViewData] = useState<any[]>([]);
    useEffect(() => {
        getRecAll().then((res: any) => {
            console.log(res);
        });
    });
    return (
        <div>
            <ChartViewComponent
                concViewData={concViewData}
            ></ChartViewComponent>

            {/* <div>
                <ConcentrationViewComponent
                    concData1={concData}
                ></ConcentrationViewComponent>
            </div> */}
        </div>
    );
}

export default AnalysisPage;
