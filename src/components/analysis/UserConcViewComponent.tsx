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
    const [facePointAll, setFacePointAll] = useState();
    const [memo, setMemo] = useState();

    useEffect(() => {
        adminGetRecUserDate(concID).then((res: any) => {
            const resConc = res.data.concentration;
            const resMaxFreq = res.data.maxFrequency;
            const resMinFreq = res.data.minFrequency;
            console.log(res.data);

            setWork(resConc.work);
            setMaxFreqData(resMaxFreq);
            setMinFreqData(resMinFreq);
            setMaxFreqID(resConc.concentration.max_freq_id);
            setMinFreqID(resConc.concentration.min_freq_id);
            setMemo(resConc.memo);
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
        });
    }, []);

    return (
        <div>
            <h1>{work}</h1>
            <h1>{memo}</h1>

            <FreqViewComponent
                maxFreqData={maxFreqData}
                minFreqData={minFreqData}
                maxFreqID={maxFreqID}
                minFreqID={minFreqID}
            ></FreqViewComponent>

            <ConcViewComponent concViewData={concViewData}></ConcViewComponent>
            {console.log(maxFreqData)}
        </div>
    );
};

export default React.memo(UserConcViewComponent);
