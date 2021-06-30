import React, {
    useState,
    useEffect,
    useCallback,
    useMemo,
    useLayoutEffect,
    useRef,
} from "react";
import ChartViewComponent from "../../components/ChartViewComponent";
import ReactApexCharts from "react-apexcharts";
import ApexCharts from "apexcharts";
import { getRecAll } from "../../apis/backendAPI/analysis/getRecAll";
import UserConcAllViewComponent from "../../components/analysis/UserConcAllViewComponent";

const AnalysisPage: React.FC = () => {
    const [concViewData, setConcViewData] = useState<any>([]);
    const [getRecAllData, setGetRecAllData] = useState<any>([]);
    const [recDataCheck, setRecDataCheck] = useState<boolean>(false);
    const [freqViewData, setFreqViewData] = useState<any>([]);
    const [maxFreqData, setMaxFreqData] = useState<any>([]);
    const [minFreqData, setMinFreqData] = useState<any>([]);
    const listRefConcent = useRef<any>([]);

    useLayoutEffect(() => {
        getRecAll().then((res: any) => {
            console.log(res.data);

            res.data["concentration"].map((conc: any) => {
                let cnt = 0;
                let dataC3: any = [];
                let dataC2: any = [];
                let dataC1: any = [];

                conc["concentration"]["c3"].map((element: any) => {
                    dataC3 = dataC3.concat([
                        {
                            x: new Date(
                                conc["concentration"]["date"][cnt]
                            ).getTime(),
                            y: element,
                        },
                    ]);
                    cnt += 1;
                });
                cnt = 0;
                conc["concentration"]["c2"].map((element: any) => {
                    dataC2 = dataC2.concat([
                        {
                            x: new Date(
                                conc["concentration"]["date"][cnt]
                            ).getTime(),
                            y: element,
                        },
                    ]);
                    cnt += 1;
                });
                cnt = 0;
                conc["concentration"]["c1"].map((element: any) => {
                    dataC1 = dataC1.concat([
                        {
                            x: new Date(
                                conc["concentration"]["date"][cnt]
                            ).getTime(),
                            y: element,
                        },
                    ]);
                    cnt += 1;
                });

                listRefConcent.current = [
                    ...listRefConcent.current,
                    [
                        {
                            work: conc["work"],
                            max_freq_id: conc["concentration"]["max_freq_id"],
                            min_freq_id: conc["concentration"]["min_freq_id"],
                            datas: [
                                { name: "c3", data: dataC3 },
                                { name: "c2", data: dataC2 },
                                { name: "c1", data: dataC1 },
                            ],
                        },
                    ],
                ];
            });

            setMaxFreqData(res.data["maxFrequency"]);
            setMinFreqData(res.data["minFrequency"]);
            setConcViewData(listRefConcent.current);
        });
    }, []);

    return (
        <div>
            {/* <UserConcAllViewComponent
                concViewData={concViewData}
                maxFreqData={maxFreqData}
                minFreqData={minFreqData}
            ></UserConcAllViewComponent> */}
        </div>
    );
};

export default AnalysisPage;
