import React, { useState, useEffect, useLayoutEffect } from "react";
import { adminGetRecUserDate } from "../../apis/backendAPI/admin/getRecUserDate";
import { environments } from "../../apis/backendAPI/admin/interfaces";
import FrequencyPage from "../../pages/frequency/FrequencyPage";
import ConcViewComponent from "./ConcViewComponent";
import FreqViewComponent from "./FreqViewComponent";
import { concViewDataType } from "./interfaces";
import { maxFreqViewDataType, minFreqViewDataType } from "./interfaces";
import ReConcEstimateComponent from "./ReConcEstimateComponent";
const UserConcViewComponent: React.FC<{
    concID: string;
    concViewData: concViewDataType[];
    // maxFreqData: any;
    // minFreqData: any;
    environments: environments[];
    work: string;
    memo: string;
    maxFreqID: string;
    minFreqID: string;
    facePointAll: any;
}> = ({
    concID,
    concViewData,
    // maxFreqData,
    // minFreqData,
    environments,
    work,
    memo,
    maxFreqID,
    minFreqID,
    facePointAll,
}) => {
    useEffect(() => {}, []);

    return (
        <div style={{ whiteSpace: "pre-line" }}>
            <h1>{work}</h1>
            <h1>{memo}</h1>

            <FreqViewComponent
                // maxFreqData={maxFreqData}
                // minFreqData={minFreqData}
                environments={environments}
                maxFreqID={maxFreqID}
                minFreqID={minFreqID}
            ></FreqViewComponent>

            <ConcViewComponent concViewData={concViewData}></ConcViewComponent>
        </div>
    );
};

export default React.memo(UserConcViewComponent);
