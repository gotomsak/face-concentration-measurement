import React, { useState, useEffect } from "react";
import store from "..";

const ConcentTextViewComponent: React.FC<{}> = () => {
    const [ViewC3, setViewC3] = useState(0);
    const [ViewC2, setViewC2] = useState(0);
    const [ViewC1, setViewC1] = useState(0);
    const [ViewW, setViewW] = useState(0);
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
        <div>
            <h5>c3: {ViewC3}</h5>
            <h5>c2: {ViewC2}</h5>
            <h5>c1: {ViewC1}</h5>
            <h5>w: {ViewW}</h5>
        </div>
    );
};

export default React.memo(ConcentTextViewComponent);
