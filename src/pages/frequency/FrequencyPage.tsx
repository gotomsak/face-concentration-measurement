import { Button } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { start } from "repl";
import FinishViewComponent from "../../components/utils/FinishViewComponent";
import MaxFrequencyComponent from "../../components/frequency/MaxFrequencyComponent";
import MinFrequencyComponent from "../../components/frequency/MinFrequencyComponent";
import ReadyViewComponent from "../../components/utils/ReadyViewComponent";
import WebCameraComponent from "../../components/WebCameraComponent";
import { useHistory } from "react-router";
import userEvent from "@testing-library/user-event";
import { BtoF } from "../../apis/backendAPI/frequency/interfaces";
import { initMaxFrequency } from "../../apis/backendAPI/frequency/initMaxFrequency";
import { initMinFrequency } from "../../apis/backendAPI/frequency/initMinFrequency";
import {
    InitMaxFrequency,
    InitMinFrequency,
} from "../../apis/backendAPI/frequency/interfaces";

function FrequencyPage() {
    const [startCheck, setStartCheck] = useState(false);
    const [cameraState, setCameraState] = useState(false);
    // データが取り終わった時のステート
    const [finishCheck, setFinishCheck] = useState(false);

    // 終了メッセージが表示されたあとのステート
    const [finishFlag, setFinishFlag] = useState(false);
    const [blobData, setBlobData] = useState<Blob | null>(null);
    const [maxRecord, setMaxRecord] = useState(false);
    const [minRecord, setMinRecord] = useState(false);
    const [maxSend, setMaxSend] = useState(false);
    const [minSend, setMinSend] = useState(false);
    const [ready, setReady] = useState(false);
    const [cameraStart, setCameraStart] = useState(false);
    const [cameraStop, setCameraStop] = useState(false);
    const history = useHistory();
    const [webSocketData, setWebSocketData] = useState<BtoF>({
        blink: 0,
        face_move: 0,
    });

    useEffect(() => {
        if (finishFlag === true) {
            if (maxSend === true) {
                initMaxFrequency(initMaxFrequencyValue())
                    .then((res) => {
                        console.log(res);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
            if (minSend === true) {
                initMinFrequency(initMinFrequencyValue())
                    .then((res) => {
                        console.log(res);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
            history.push("/");
        }
    }, [finishFlag]);

    useEffect(() => {
        if (finishCheck === true) {
            if (maxRecord === true) {
                setMaxSend(true);
                setMaxRecord(false);
                setStartCheck(false);
            }
            if (minRecord === true) {
                setMinSend(true);
                setMinRecord(false);
                setStartCheck(false);
            }
        }
    }, [finishCheck]);

    const initMaxFrequencyValue = (): InitMaxFrequency => {
        return {
            user_id: Number(localStorage.getItem("user_id")),
            max_frequency_video: blobData!,
            max_blink_number: webSocketData["blink"],
            max_face_move_number: webSocketData["face_move"],
        };
    };

    const initMinFrequencyValue = (): InitMinFrequency => {
        return {
            user_id: Number(localStorage.getItem("user_id")),
            min_frequency_video: blobData!,
            min_blink_number: webSocketData["blink"],
            min_face_move_number: webSocketData["face_move"],
        };
    };

    const recordSelect = (e: any) => {
        if (e.currentTarget.value == "max") setStartCheck(true);
        setMaxRecord(true);
        if (e.currentTarget.value == "min") setStartCheck(true);
        setMinRecord(true);
    };

    const readyViewText = () => {
        return (
            <div>
                <Button onClick={recordSelect} color="secondary" value={"max"}>
                    最高頻度を算出
                </Button>
                <Button onClick={recordSelect} color="secondary" value={"min"}>
                    最低頻度を算出
                </Button>
            </div>
        );
    };

    const changeMethod = (e: any) => {
        if (e.target.name == "camera") {
            setCameraState(e.target.checked);
        }
    };

    const renderRecord = () => {
        if (maxRecord) {
            return (
                <MaxFrequencyComponent
                    setFinishCheck={setFinishCheck}
                ></MaxFrequencyComponent>
            );
        }
        if (minRecord) {
            return (
                <MinFrequencyComponent
                    setFinishCheck={setFinishCheck}
                ></MinFrequencyComponent>
            );
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
        <div className="FrequencyPageContainer">
            {startCheck ? (
                renderRecord()
            ) : finishCheck ? (
                <FinishViewComponent
                    setFinishFlag={setFinishFlag}
                ></FinishViewComponent>
            ) : (
                <ReadyViewComponent
                    cameraState={cameraState}
                    changeMethod={changeMethod}
                    startCheckButton={startCheckButton}
                    readyViewText={readyViewText()}
                ></ReadyViewComponent>
            )}
            <WebCameraComponent
                start={startCheck}
                stop={finishCheck}
                method={false}
            ></WebCameraComponent>
        </div>
    );
}
export default FrequencyPage;
