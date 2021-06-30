import React, { useState, useEffect } from "react";
import ChartViewComponent from "../ChartViewComponent";
import {
    concViewDataType,
    maxFreqViewDataType,
    minFreqViewDataType,
} from "./interfaces";

const ConcViewComponent: React.FC<{
    concViewData: concViewDataType[];
    // work: string;
    // maxFreqViewData: maxFreqViewDataType;
    // minFreqViewData: minFreqViewDataType;
}> = ({ concViewData }) => {
    return (
        <div>
            <ChartViewComponent
                concViewData={concViewData}
            ></ChartViewComponent>
        </div>
    );
};

export default React.memo(ConcViewComponent);
