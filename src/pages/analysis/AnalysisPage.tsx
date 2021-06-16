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
import UserConcViewComponent from "../../components/analysis/UserConcViewComponent";

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

    // const renderWork = (work: string) => {
    //     return <h1>{work}</h1>;
    // };
    // const renderFreq = (max_freq_id: string, min_freq_id: string) => {
    //     const maxData = maxFreqData.filter((elem: any) => {
    //         return max_freq_id === elem["id"];
    //     });
    //     const minData = minFreqData.filter((elem: any) => {
    //         return min_freq_id === elem["id"];
    //     });

    //     if (maxData[0] == undefined || minData[0] == undefined) {
    //         return (
    //             <div>
    //                 <h3>frequency notfound</h3>
    //             </div>
    //         );
    //     }

    //     return (
    //         <div>
    //             <h3>maxBlink: {maxData[0].max_frequency_data.max_blink}</h3>
    //             <h3>
    //                 maxFaveMove: {maxData[0].max_frequency_data.max_face_move}
    //             </h3>
    //             <h3>minBlink: {minData[0].min_frequency_data.min_blink}</h3>
    //             <h3>
    //                 minFaveMove: {minData[0].min_frequency_data.min_face_move}
    //             </h3>
    //         </div>
    //     );
    // };

    return (
        <div>
            {/* {concViewData.map((elem: any) => {
                console.log(elem);

                return (
                    <div>
                        {renderWork(elem[0]["work"])}
                        {renderFreq(
                            elem[0]["max_freq_id"],
                            elem[0]["min_freq_id"]
                        )}

                        <ChartViewComponent
                            concViewData={elem[0]["datas"]}
                        ></ChartViewComponent>
                    </div>
                );
            })} */}
            <UserConcViewComponent
                concViewData={concViewData}
                maxFreqData={maxFreqData}
                minFreqData={minFreqData}
            ></UserConcViewComponent>
        </div>
    );
};

export default AnalysisPage;
