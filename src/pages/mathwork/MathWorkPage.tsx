import React, { useState, useEffect } from "react";
import { MathWorkPageStyle } from "../../Styles";
import ReadyViewComponent from "../../components/utils/ReadyViewComponent";
import WebCameraComponent from "../../components/WebCameraComponent";
import ConcentTextViewComponent from "../../components/ConcentTextViewComponent";
import { getNowTimeString } from "../../utils/utils";
import { getFrequency } from "../../apis/backendAPI/frequency/getFrequency";
import store from "../..";
import { postConcentSplitSave } from "../../apis/backendAPI/postConcentSplitSave";
import { useDispatch } from "react-redux";
import SetFrequencyComponent from "../../components/utils/SetFrequencyComponent";
import QuestionComponent from "../../components/mathwork/QuestionComponent";
import { getID } from "../../apis/backendAPI/getID";
import { FormControlLabel } from "@material-ui/core";
import { Checkbox } from "@material-ui/core";
const MathWorkPage: React.FC = () => {
    const [startCheck, setStartCheck] = useState(false);
    const classes = MathWorkPageStyle();
    const [cameraState, setCameraMethod] = useState(false);
    const [cameraStart, setCameraStart] = useState(false);
    const [cameraStop, setCameraStop] = useState(false);
    const [startTime, setStartTime] = useState("");
    const [viewC3, setViewC3] = useState(0);
    const [viewC2, setViewC2] = useState(0);
    const [viewC1, setViewC1] = useState(0);
    const [viewW, setViewW] = useState(0);
    const dispatch = useDispatch();
    const [intervalID, setIntervalID] = useState<NodeJS.Timeout>();
    const [downloadData, setDownloadData] = useState<boolean>(false);
    const [frequencys, setFrequencys] = useState<any>();
    const [finish, setFinish] = useState<boolean>(false);

    useEffect(() => {
        setStartTime(getNowTimeString());
        getFrequency().then((res: any) => {
            setFrequencys(res);

            console.log(res);
        });
    }, []);

    useEffect(() => {
        if (startCheck === true) {
            console.log("startした");
            if (cameraState == true) {
                setIntervalID(setInterval(sendConcentSplit, 10000));
            }
        }
    }, [startCheck]);

    useEffect(() => {
        if (cameraState === true) {
            getID({
                type: "gotoSys",
                work: "mathwork",
                memo: "計算問題",
                measurement: "gotoConc",
                user_id: Number(localStorage.getItem("user_id")),
                concentration: store.getState().concReducer,
            }).then((res) => {
                console.log(res);
                console.log(res.data.conc_id);
                console.log(res.data.face_point_id);
                // setID(res.data.conc_id);
                dispatch({
                    type: "concIDSet",
                    conc_id: res.data.conc_id,
                });
                dispatch({
                    type: "facePointIDSet",
                    face_point_id: res.data.face_point_id,
                });
            });
        }
    }, [cameraState]);

    const finishHandler = (finish: boolean) => {
        setFinish(finish);
        setStartCheck(false);
    };

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

    const downloadDataHandleChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setDownloadData(event.target.checked);
    };

    useEffect(() => {
        if (finish === true) {
            console.log("owaru");
            setCameraStart(false);
            setCameraStop(true);
            clearInterval(Number(intervalID));
            sendConcentSplit();
        }
    }, [finish]);

    const sendConcentSplit = () => {
        postConcentSplitSave({
            type: "gotoSys",
            id: store.getState().concIDReducer,
            memo: "",
            measurement: "gotoConc",
            concentration: store.getState().concReducer,
        }).then((res: any) => {
            console.log(res);
            dispatch({
                type: "concReset",
            });
        });
    };

    const readyViewText = () => {
        return (
            <div>
                <h1>準備は良いですか？</h1>
                <h2>良ければスタートボタンを押してください</h2>
                <h3>10問おきに継続，終了を選べます</h3>
                <h3>終了後アンケートにお答えください</h3>
            </div>
        );
    };

    return (
        <div className={classes.root}>
            <h1>MathWorkPage</h1>

            {startCheck ? (
                <QuestionComponent
                    finishHandler={finishHandler}
                ></QuestionComponent>
            ) : finish ? (
                <h1>終了</h1>
            ) : (
                <div>
                    <ReadyViewComponent
                        cameraState={cameraState}
                        changeMethod={changeMethod}
                        startCheckButton={startCheckButton}
                        readyViewText={readyViewText()}
                    ></ReadyViewComponent>
                    {frequencys ? (
                        <SetFrequencyComponent
                            frequencys={frequencys}
                        ></SetFrequencyComponent>
                    ) : (
                        <div></div>
                    )}
                    <p>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={downloadData}
                                    onChange={downloadDataHandleChange}
                                    inputProps={{
                                        "aria-label": "primary checkbox",
                                    }}
                                />
                            }
                            label="動画ダウンロード"
                        />
                    </p>
                </div>
            )}

            <WebCameraComponent
                start={cameraStart}
                stop={cameraStop}
                frequency={null}
                ear={false}
                downloadData={downloadData}
            ></WebCameraComponent>
            <ConcentTextViewComponent></ConcentTextViewComponent>
        </div>
    );
};

export default React.memo(MathWorkPage);
