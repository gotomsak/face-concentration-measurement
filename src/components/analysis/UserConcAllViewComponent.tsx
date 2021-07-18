import React, { useState, useEffect, useRef } from "react";
import ChartViewComponent from "../ChartViewComponent";
import { adminGetRecAll } from "../../apis/backendAPI/admin/getRecAll";
import { concViewDataType } from "./interfaces";
import FreqViewComponent from "./FreqViewComponent";
import ConcViewComponent from "./ConcViewComponent";

const UserConcAllViewComponent: React.FC<{ userID: number | undefined }> = ({
    userID,
}) => {
    // const [concViewData, setConcViewData] = useState<any>([]);
    // const [maxFreqData, setMaxFreqData] = useState<any>([]);
    // const [minFreqData, setMinFreqData] = useState<any>([]);
    const [concViewData, setConcViewData] = useState<concViewDataType[]>([]);
    // const []
    const [maxFreqData, setMaxFreqData] = useState<any>([]);
    const [minFreqData, setMinFreqData] = useState<any>([]);
    const [renderUserID, setRenderUserID] = useState<boolean>(false);
    const [concNotFound, setConcNotFound] = useState<boolean>(false);
    const listRefConcent = useRef<any>([]);

    useEffect(() => {
        if (userID !== undefined) {
            setRenderUserID(true);
            adminGetRecAll(userID).then((res: any) => {
                console.log(res.data);
                if (res.data["concentration"] === null) {
                    setConcNotFound(true);
                    console.log("null");
                    return;
                }
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
                                max_freq_id:
                                    conc["concentration"]["max_freq_id"],
                                min_freq_id:
                                    conc["concentration"]["min_freq_id"],
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
        }
    }, []);

    const renderWork = (work: string) => {
        return <h1>{work}</h1>;
    };

    return (
        <div>
            {concNotFound ? (
                <div>
                    <h1>notData</h1>
                </div>
            ) : (
                concViewData.map((elem: any) => {
                    console.log(elem);

                    return (
                        <div>
                            {renderWork(elem[0]["work"])}
                            <FreqViewComponent
                                maxFreqData={maxFreqData}
                                minFreqData={minFreqData}
                                maxFreqID={elem[0]["max_freq_id"]}
                                minFreqID={elem[0]["min_freq_id"]}
                            ></FreqViewComponent>
                            {/* {renderFreq(
                                elem[0]["max_freq_id"],
                                elem[0]["min_freq_id"]
                            )} */}
                            <ConcViewComponent
                                concViewData={elem[0]["datas"]}
                            ></ConcViewComponent>

                            {/* <ChartViewComponent
                                concViewData={elem[0]["datas"]}
                            ></ChartViewComponent> */}
                        </div>
                    );
                })
            )}
        </div>
    );
};

export default React.memo(UserConcAllViewComponent);
