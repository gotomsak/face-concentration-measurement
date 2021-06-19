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
import store from "../..";
import { maxBlinkReducer } from "../../reducers/frequency/maxBlinkReducer";
import {
    makeStyles,
    styled,
    TextField,
    RadioGroup,
    FormControlLabel,
    Radio,
} from "@material-ui/core";
import { SourceCode } from "eslint";
import { FrequencyPageStyle } from "../../Styles";

function FrequencyPage() {
    const [startCheck, setStartCheck] = useState(false);
    const [cameraState, setCameraState] = useState(false);
    // データが取り終わった時のステート
    const [finishCheck, setFinishCheck] = useState(false);

    // 終了メッセージが表示されたあとのステート
    // const [finishFlag, setFinishFlag] = useState(false);

    const [ready, setReady] = useState(false);
    const [cameraStart, setCameraStart] = useState(false);
    const [cameraStop, setCameraStop] = useState(false);
    const history = useHistory();
    const [environment, setEnvironment] = useState<string>("");
    const [frequency, setFrequency] = useState<string | null>(null);

    const classes = FrequencyPageStyle();

    useEffect(() => {
        if (finishCheck === true) {
            setCameraStop(true);
            setCameraStart(false);
            setStartCheck(false);
            if (frequency === "max") {
                initMaxFrequency(initMaxFrequencyValue())
                    .then((res) => {
                        console.log(res);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
            if (frequency === "min") {
                initMinFrequency(initMinFrequencyValue())
                    .then((res) => {
                        console.log(res);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
        }
    }, [finishCheck]);

    // useEffect(() => {
    //     if (finishCheck === true) {
    //     }
    // }, [finishCheck]);

    const initMaxFrequencyValue = (): InitMaxFrequency => {
        return {
            user_id: Number(localStorage.getItem("user_id")),
            max_frequency_data: {
                max_blink: Number(store.getState().maxBlinkReducer),
                max_face_move: Number(store.getState().maxFaceMoveReducer),
                face_point_all: store.getState().facePointReducer,
            },
            environment: environment,
        };
    };

    const initMinFrequencyValue = (): InitMinFrequency => {
        return {
            user_id: Number(localStorage.getItem("user_id")),
            min_frequency_data: {
                min_blink: Number(store.getState().minBlinkReducer),
                min_face_move: Number(store.getState().minFaceMoveReducer),
                face_point_all: store.getState().facePointReducer,
            },
            environment: environment,
        };
    };

    const recordSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFrequency((e.target as HTMLInputElement).value);
    };

    const readyViewText = () => {
        return (
            <div>
                <TextField
                    label="環境"
                    variant="outlined"
                    onChange={(e: any) => {
                        setEnvironment(e.target.value);
                    }}
                />

                <RadioGroup
                    aria-label="frequency"
                    name="frequency"
                    value={frequency}
                    onChange={recordSelect}
                >
                    <FormControlLabel
                        value="max"
                        control={<Radio />}
                        label="Max"
                    />
                    <FormControlLabel
                        value="min"
                        control={<Radio />}
                        label="Min"
                    />
                </RadioGroup>

                {/* <Button onClick={recordSelect} color="secondary" value={"max"}>
                    最高頻度を算出
                </Button>
                <Button onClick={recordSelect} color="secondary" value={"min"}>
                    最低頻度を算出
                </Button> */}
            </div>
        );
    };

    const changeMethod = (e: any) => {
        if (e.target.name == "camera") {
            setCameraState(e.target.checked);
        }
    };

    const renderRecord = () => {
        if (frequency === "max") {
            return (
                <MaxFrequencyComponent
                    setFinishCheck={setFinishCheck}
                ></MaxFrequencyComponent>
            );
        }
        if (frequency === "min") {
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
    const nextButton = (e: any) => {
        history.push("/");
    };
    return (
        <div className={classes.root}>
            {/* <div className={classes.head}></div> */}
            {startCheck ? (
                renderRecord()
            ) : finishCheck ? (
                <FinishViewComponent
                    nextButton={nextButton}
                ></FinishViewComponent>
            ) : (
                <div className={classes.menu}>
                    <ReadyViewComponent
                        cameraState={cameraState}
                        changeMethod={changeMethod}
                        startCheckButton={startCheckButton}
                        readyViewText={readyViewText()}
                    ></ReadyViewComponent>
                </div>
            )}
            <WebCameraComponent
                start={cameraStart}
                stop={cameraStop}
                frequency={frequency}
                downloadData={false}
            ></WebCameraComponent>
        </div>
    );
}
export default FrequencyPage;
