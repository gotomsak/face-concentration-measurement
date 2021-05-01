import React, { useState, useEffect } from "react";
import { MathWorkPageStyle } from "../../Styles";
import ReadyViewComponent from "../../utils/ReadyViewComponent";
import WebCameraComponent from "../../components/WebCameraComponent";
function MathWorkPage() {
    const [startCheck, setStartCheck] = useState(false);
    const classes = MathWorkPageStyle();
    const [cameraState, setCameraMethod] = useState(false);
    const [cameraStart, setCameraStart] = useState(false);
    const [cameraStop, setCameraStop] = useState(false);
    const changeMethod = (e: any) => {
        if (e.target.name == "camera") {
            setCameraMethod(e.target.checked);
        }
    };

    const startCheckButton = (e: any) => {
        console.log(e.currentTarget.value);
        if (e.currentTarget.value == 1) {
            if (cameraState === true) {
                setCameraStart(true);
            }
            setStartCheck(true);
        }
    };
    return (
        <div className={classes.root}>
            <h1>MathWorkPage</h1>
            <ReadyViewComponent
                cameraState={cameraState}
                changeMethod={changeMethod}
                startCheckButton={startCheckButton}
            ></ReadyViewComponent>

            <WebCameraComponent
                start={cameraStart}
                stop={cameraStop}
                method={false}
            ></WebCameraComponent>
        </div>
    );
}

export default MathWorkPage;
