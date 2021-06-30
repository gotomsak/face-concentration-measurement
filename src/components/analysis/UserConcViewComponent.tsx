import React, { useState, useEffect, useLayoutEffect } from "react";
import { adminGetRecUserDate } from "../../apis/backendAPI/admin/getRecUserDate";
import FrequencyPage from "../../pages/frequency/FrequencyPage";
import ConcViewComponent from "./ConcViewComponent";
import FreqViewComponent from "./FreqViewComponent";
import { concViewDataType } from "./interfaces";
import { maxFreqViewDataType, minFreqViewDataType } from "./interfaces";

const UserConcViewComponent: React.FC<{ concID: string }> = ({ concID }) => {
    const [work, setWork] = useState("");
    const [maxFreqData, setMaxFreqData] = useState<any>([]);
    const [minFreqData, setMinFreqData] = useState<any>([]);
    const [maxFreqID, setMaxFreqID] = useState<string>("");
    const [minFreqID, setMinFreqID] = useState<string>("");
    const [concViewData, setConcViewData] = useState<concViewDataType[]>([]);
    const [maxFreqViewData, setMaxFreqViewData] = useState<maxFreqViewDataType>(
        { max_blink: 0, max_face_move: 0 }
    );
    const [minFreqViewData, setMinFreqViewData] = useState<minFreqViewDataType>(
        { min_blink: 0, min_face_move: 0 }
    );
    useEffect(() => {
        adminGetRecUserDate(concID).then((res: any) => {
            const resConc = res.data.concentration;
            const resMaxFreq = res.data.maxFrequency;
            const resMinFreq = res.data.minFrequency;

            setWork(resConc.work);
            setMaxFreqData(resMaxFreq);
            setMinFreqData(resMinFreq);
            setMaxFreqID(resConc.concentration.max_freq_id);
            setMinFreqID(resConc.concentration.min_freq_id);
            let cnt = 0;
            let dataC3: any = [];
            let dataC2: any = [];
            let dataC1: any = [];
            let conc = res.data.concentration;
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
            setConcViewData([
                { name: "c3", data: dataC3 },
                { name: "c2", data: dataC2 },
                { name: "c1", data: dataC1 },
            ]);

            const maxData = resMaxFreq.filter((elem: any) => {
                return resConc.concentration.max_freq_id === elem["id"];
            });
            if (maxData[0] !== undefined) {
                setMaxFreqViewData(maxData[0].max_frequency_data);
            }

            const minData = resMinFreq.filter((elem: any) => {
                return resConc.concentration.min_freq_id === elem["id"];
            });
            if (minData[0] !== undefined) {
                setMinFreqViewData(minData[0].min_frequency_data);
            }
        });
    }, []);
    // useEffect(() => {
    //     console.log(maxFreqData);
    // }, [maxFreqData]);

    // useEffect(() => {
    //     if (maxFreqData.length !== 0 && maxFreqID !== "") {
    //         const maxData = maxFreqData.filter((elem: any) => {
    //             console.log(elem["id"]);
    //             console.log(maxFreqID);
    //             return maxFreqID === elem["id"];
    //         });
    //         console.log(maxFreqData);
    //         console.log(maxData);
    //         console.log(maxFreqID);

    //         setMaxFreqViewData(maxData[0].max_frequency_data);
    //     }
    // }, [maxFreqData]);

    // useEffect(() => {
    //     if (minFreqData.length !== 0 && minFreqID !== "") {
    //         const minData = minFreqData.filter((elem: any) => {
    //             return minFreqID === elem["id"];
    //         });
    //         console.log(minData);
    //         setMinFreqViewData(minData[0].min_frequency_data);
    //     }
    // }, [minFreqData]);

    return (
        <div>
            <h1>{work}</h1>

            <FreqViewComponent
                maxFreqViewData={maxFreqViewData}
                minFreqViewData={minFreqViewData}
                // maxFreqData={maxFreqData}
                // minFreqData={minFreqData}
                // maxFreqID={maxFreqID}
                // minFreqID={minFreqID}
            ></FreqViewComponent>
            {/* {renderFreq(
                                elem[0]["max_freq_id"],
                                elem[0]["min_freq_id"]
                            )} */}

            <ConcViewComponent concViewData={concViewData}></ConcViewComponent>
            {console.log(maxFreqData)}

            {/* <ChartViewComponent
                                concViewData={elem[0]["datas"]}
                            ></ChartViewComponent> */}
        </div>
    );
};

export default React.memo(UserConcViewComponent);
