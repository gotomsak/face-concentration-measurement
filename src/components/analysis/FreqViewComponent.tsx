import React, { useState, useEffect, useLayoutEffect } from "react";
import { maxFreqViewDataType, minFreqViewDataType } from "./interfaces";

const FreqViewComponent: React.FC<{
    // maxFreqData: any;
    // minFreqData: any;
    // maxFreqID: string;
    // minFreqID: string;
    maxFreqViewData: maxFreqViewDataType;
    minFreqViewData: minFreqViewDataType;
}> = ({ maxFreqViewData, minFreqViewData }) => {
    // const [maxFreqViewData, setMaxFreqViewData] = useState<maxFreqViewDataType>(
    //     { max_blink: 0, max_face_move: 0 }
    // );
    // const [minFreqViewData, setMinFreqViewData] = useState<minFreqViewDataType>(
    //     { min_blink: 0, min_face_move: 0 }
    // );

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
            {maxFreqViewData !== undefined ? (
                <div>
                    <h3>maxBlink: {maxFreqViewData.max_blink}</h3>
                    <h3>maxFaveMove: {maxFreqViewData.max_face_move}</h3>
                </div>
            ) : (
                <h3>frequency notfound</h3>
            )}
            {minFreqViewData !== undefined ? (
                <div>
                    <h3>minBlink: {minFreqViewData.min_blink}</h3>
                    <h3>minFaveMove: {minFreqViewData.min_face_move}</h3>
                </div>
            ) : (
                <h3>frequency notfound</h3>
            )}
        </div>
    );
};

export default React.memo(FreqViewComponent);
