import React, { useState, useEffect } from "react";
import ChartViewComponent from "../ChartViewComponent";

const UserConcViewComponent: React.FC<{
    concViewData: any;
    maxFreqData: any;
    minFreqData: any;
}> = ({ concViewData, maxFreqData, minFreqData }) => {
    // const [concViewData, setConcViewData] = useState<any>([]);
    // const [maxFreqData, setMaxFreqData] = useState<any>([]);
    // const [minFreqData, setMinFreqData] = useState<any>([]);
    const renderWork = (work: string) => {
        return <h1>{work}</h1>;
    };

    const renderFreq = (max_freq_id: string, min_freq_id: string) => {
        const maxData = maxFreqData.filter((elem: any) => {
            return max_freq_id === elem["id"];
        });
        const minData = minFreqData.filter((elem: any) => {
            return min_freq_id === elem["id"];
        });

        if (maxData[0] == undefined || minData[0] == undefined) {
            return (
                <div>
                    <h3>frequency notfound</h3>
                </div>
            );
        }

        return (
            <div>
                <h3>maxBlink: {maxData[0].max_frequency_data.max_blink}</h3>
                <h3>
                    maxFaveMove: {maxData[0].max_frequency_data.max_face_move}
                </h3>
                <h3>minBlink: {minData[0].min_frequency_data.min_blink}</h3>
                <h3>
                    minFaveMove: {minData[0].min_frequency_data.min_face_move}
                </h3>
            </div>
        );
    };

    return (
        <div>
            {concViewData.map((elem: any) => {
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
            })}
        </div>
    );
};

export default React.memo(UserConcViewComponent);
