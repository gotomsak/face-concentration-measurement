import React, { useState, useEffect, useLayoutEffect } from "react";
import { maxFreqViewDataType, minFreqViewDataType } from "./interfaces";

const FreqViewComponent: React.FC<{
    maxFreqData: any;
    minFreqData: any;
    maxFreqID: string;
    minFreqID: string;
    // maxFreqViewData: maxFreqViewDataType;
    // minFreqViewData: minFreqViewDataType;
}> = ({ maxFreqData, minFreqData, maxFreqID, minFreqID }) => {
    const [maxFreqViewData, setMaxFreqViewData] = useState<maxFreqViewDataType>(
        { max_blink: null, max_face_move: null }
    );
    const [minFreqViewData, setMinFreqViewData] = useState<minFreqViewDataType>(
        { min_blink: null, min_face_move: null }
    );
    const [update, setUpdata] = useState<boolean>(false);

    useEffect(() => {
        if (maxFreqData.length !== 0 && maxFreqID !== "") {
            const maxData = maxFreqData.filter((elem: any) => {
                console.log(elem["id"]);
                console.log(maxFreqID);
                return maxFreqID === elem["id"];
            });
            console.log(maxFreqData);
            console.log(maxData);
            console.log(maxFreqID);

            setMaxFreqViewData(maxData[0].max_frequency_data);
            // setUpdata(update ? false : true);
        }
    });

    useEffect(() => {
        if (minFreqData.length !== 0 && minFreqID !== "") {
            const minData = minFreqData.filter((elem: any) => {
                return minFreqID === elem["id"];
            });
            console.log(minData);
            setMinFreqViewData(minData[0].min_frequency_data);
            // setUpdata(update ? false : true);
        }
    });

    return (
        <div>
            {maxFreqViewData.max_blink !== null ? (
                <div>
                    <h3>maxBlink: {maxFreqViewData.max_blink}</h3>
                    <h3>maxFaveMove: {maxFreqViewData.max_face_move}</h3>
                </div>
            ) : (
                <h3>frequency notfound</h3>
            )}
            {minFreqViewData.min_blink !== null ? (
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
