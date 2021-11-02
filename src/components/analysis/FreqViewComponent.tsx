import React, { useState, useEffect, useLayoutEffect } from "react";
import { environments } from "../../apis/backendAPI/admin/interfaces";
import { maxFreqViewDataType, minFreqViewDataType } from "./interfaces";

const FreqViewComponent: React.FC<{
    // maxFreqData: any;
    // minFreqData: any;
    environments: environments[];
    maxFreqID: string;
    minFreqID: string;
    // maxFreqViewData: maxFreqViewDataType;
    // minFreqViewData: minFreqViewDataType;
}> = ({ environments, maxFreqID, minFreqID }) => {
    const [maxFreqViewData, setMaxFreqViewData] = useState<maxFreqViewDataType>(
        { max_blink: null, max_face_move: null }
    );
    const [minFreqViewData, setMinFreqViewData] = useState<minFreqViewDataType>(
        { min_blink: null, min_face_move: null }
    );
    const [update, setUpdata] = useState<boolean>(false);

    useEffect(() => {
        if (
            environments?.length !== 0 &&
            maxFreqID !== "" &&
            environments !== undefined
        ) {
            const enviro = environments;
            console.log(enviro);
            // const maxData: any = Array.from(enviro).filter((elem: any) => {
            //     console.log(elem.max_freq.id);
            //     console.log(maxFreqID);
            //     return maxFreqID === elem.max_freq.id;
            // });
            const maxData: any = enviro.filter(
                (elem) => maxFreqID === elem.max_freq.id
            );
            console.log(environments);
            console.log(maxData);
            console.log(maxFreqID);
            if (maxData[0] != undefined) {
                setMaxFreqViewData(maxData[0].max_freq.max_frequency_data);
            }

            // setUpdata(update ? false : true);
        }
    }, [environments]);

    useEffect(() => {
        if (
            environments?.length !== 0 &&
            minFreqID !== "" &&
            environments !== undefined
        ) {
            const enviro = environments;
            const minData: any = Array.from(enviro).filter((elem: any) => {
                return minFreqID === elem.min_freq.id;
            });
            console.log(minData);
            if (minData[0] != undefined) {
                setMinFreqViewData(minData[0].min_freq.min_frequency_data);
            }

            // setUpdata(update ? false : true);
        }
    }, [environments]);

    return (
        <div>
            {maxFreqViewData?.max_blink !== null ? (
                <div>
                    <h3>maxBlink: {maxFreqViewData?.max_blink}</h3>
                    <h3>maxFaceMove: {maxFreqViewData?.max_face_move}</h3>
                </div>
            ) : (
                <h3>frequency notfound</h3>
            )}
            {minFreqViewData?.min_blink !== null ? (
                <div>
                    <h3>minBlink: {minFreqViewData?.min_blink}</h3>
                    <h3>minFaceMove: {minFreqViewData?.min_face_move}</h3>
                </div>
            ) : (
                <h3>frequency notfound</h3>
            )}
        </div>
    );
};

export default React.memo(FreqViewComponent);
