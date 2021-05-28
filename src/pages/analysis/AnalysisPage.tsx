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

const AnalysisPage: React.FC = () => {
    const [concViewData, setConcViewData] = useState<any>([]);
    const [getRecAllData, setGetRecAllData] = useState<any>([]);
    const [recDataCheck, setRecDataCheck] = useState<boolean>(false);
    const [freqViewData, setFreqViewData] = useState<any>([]);

    const listRefConcent = useRef<any>([]);

    // const setRes = useCallback(
    //     (e) => {
    //         setGetRecAllData(e.data);
    //     },
    //     [setGetRecAllData]
    // );

    useLayoutEffect(() => {
        getRecAll().then((res: any) => {
            console.log(res.data);
            // setGetRecAllData(res.data);

            res.data["concentration"].map((conc: any) => {
                let cnt = 0;
                let dataC3: any = [];
                let dataC2: any = [];
                let dataC1: any = [];
                // workRef.current.concat([res.data["concentration"]["work"]]);
                conc["concentration"]["c3"].map((element: any) => {
                    console.log(element);
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
                    console.log(element);
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
                    console.log(element);
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
                console.log(dataC2);
                listRefConcent.current = [
                    ...listRefConcent.current,
                    [
                        {
                            work: conc["work"],
                            datas: [
                                { name: "c3", data: dataC3 },
                                { name: "c2", data: dataC2 },
                                { name: "c1", data: dataC1 },
                            ],
                        },
                    ],
                ];
                // setConcViewData(newList);
                // concViewData.push({
                //     data: data,
                // });
            });
            console.log(listRefConcent.current);
            setConcViewData(listRefConcent.current);
            // setWorkNames(workRef.current);
        });
    }, []);

    useEffect(() => {
        console.log(concViewData);
    }, [concViewData]);

    const renderWork = (work: string) => {
        return <h1>{work}</h1>;
    };
    // const MemoChartViewComponent = React.memo((concViewData: any) => (
    //     <ChartViewComponent concViewData={concViewData}></ChartViewComponent>
    // ));
    return (
        <div>
            {/* <ChartViewComponent
                concViewData={concViewData}
            ></ChartViewComponent> */}

            {/* {getRecAllData["concentration"].map((data: any) => {
                let cnt = 0;
                let list: any = [];
                data["concentration"]["c3"].map((element: any) => {
                    console.log(element);
                    list = list.concat({
                        x: data["concentration"]["date"][cnt],
                        y: element,
                    });
                    cnt += 1;
                });
                console.log(list);
                return (
                    <ChartViewComponent
                        concViewData={list}
                    ></ChartViewComponent>
                );
            })} */}
            {console.log(concViewData)}
            {concViewData.map((elem: any) => {
                console.log(elem);

                return (
                    <div>
                        {renderWork(elem[0]["work"])}

                        <ChartViewComponent
                            concViewData={elem[0]["datas"]}
                        ></ChartViewComponent>
                    </div>
                );
            })}
            {/* <ChartViewComponent
                concViewData={concViewData}
            ></ChartViewComponent> */}
            {/* {check()} */}

            {/* {recAllView(getRecAllData)} */}
            {/* <MemoChartViewComponent concViewData={}></MemoChartViewComponent> */}

            {/* <div>
                <ConcentrationViewComponent
                    concData1={concData}
                ></ConcentrationViewComponent>
            </div> */}
        </div>
    );
};

export default AnalysisPage;
