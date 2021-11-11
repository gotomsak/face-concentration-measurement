import React, { useState, useEffect } from "react";
import store from "..";

import { RecordingPageStyle } from "../Styles";

import ArcGaugeComponent from "../utils/ArcGaugeComponent";

const ConcentTextViewComponent: React.FC<{}> = () => {
    const [ViewC3, setViewC3] = useState(0);
    const [ViewC2, setViewC2] = useState(0);
    const [ViewC1, setViewC1] = useState(0);
    const [ViewW, setViewW] = useState(0);
    const classes = RecordingPageStyle();

    useEffect(() => {
        store.subscribe(() => {
            console.log(store.getState().concReducer.c3);

            if (store.getState().concReducer.c3.length !== 0) {
                setViewC3(
                    Math.round(
                        store.getState().concReducer.c3.slice(-1)[0] * 100
                    ) / 100
                );
                setViewC2(
                    Math.round(
                        store.getState().concReducer.c2.slice(-1)[0] * 100
                    ) / 100
                );
                setViewC1(
                    Math.round(
                        store.getState().concReducer.c1.slice(-1)[0] * 100
                    ) / 100
                );
                setViewW(
                    Math.round(
                        store.getState().concReducer.w.slice(-1)[0] * 100
                    ) / 100
                );
            }
        });
    }, []);
    return (
        <div className={classes.fID}>
            <div className={classes.concentTextView}>
                <div>
                    <div className={classes.arcGauge}>
                        <ArcGaugeComponent value={ViewC1}></ArcGaugeComponent>
                    </div>
                    <h3>c1</h3>
                </div>
                <div>
                    <div className={classes.arcGauge}>
                        <ArcGaugeComponent value={ViewC2}></ArcGaugeComponent>
                    </div>
                    <h3>c2</h3>
                </div>
                <div>
                    <div className={classes.arcGauge}>
                        <ArcGaugeComponent value={ViewW}></ArcGaugeComponent>
                    </div>

                    <h3>w</h3>
                </div>
                <div>
                    <div className={classes.arcGauge}>
                        <ArcGaugeComponent value={ViewC3}></ArcGaugeComponent>
                    </div>
                    <h3>C</h3>
                </div>
            </div>
        </div>
    );
};

export default React.memo(ConcentTextViewComponent);
