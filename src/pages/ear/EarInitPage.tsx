import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import WebCameraComponent from "../../components/WebCameraComponent";
import ReadyViewComponent from "../../components/utils/ReadyViewComponent";
import { TextField } from "@material-ui/core";
import EarInitComponent from "../../components/ear/EarInitComponent";
import FinishViewComponent from "../../components/utils/FinishViewComponent";
import { EarInitPageStyle } from "../../Styles";
import { initEar } from "../../apis/backendAPI/ear/initEar";
import store from "../..";

const EarInitPage: React.FC = () => {
    const [ear, setEar] = useState();
    const [startCheck, setStartCheck] = useState(false);
    const [cameraStart, setCameraStart] = useState(false);
    const [cameraStop, setCameraStop] = useState(false);
    const [cameraState, setCameraState] = useState(false);
    const [environment, setEnvironment] = useState<string>("");
    const [finishCheck, setFinishCheck] = useState(false);
    const history = useHistory();

    const classes = EarInitPageStyle();
    const dispatch = useDispatch();

    useEffect(() => {
        if (finishCheck === true) {
            setCameraStop(true);
            setCameraStart(false);
            setStartCheck(false);
        }
    }, [finishCheck]);

    useEffect(() => {
        if (cameraStop) {
            const date = new Date();
            date.setHours(date.getHours() + 9);
            initEar({
                user_id: Number(localStorage.getItem("user_id")),
                left_ear_list:
                    store.getState().earLeftInitReducer.ear_left_init_list,
                left_ear_t: store.getState().earLeftInitReducer.ear_left_init_t,
                right_ear_list:
                    store.getState().earRightInitReducer.ear_right_init_list,
                right_ear_t:
                    store.getState().earRightInitReducer.ear_right_init_t,
                date: date,
            })
                .then((res) => {
                    console.log(res);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [cameraStop]);

    const changeMethod = (e: any) => {
        if (e.target.name == "camera") {
            setCameraState(e.target.checked);
        }
    };
    const readyViewText = () => {
        return (
            <div>
                <h1>スタートを押したら5秒間瞬きしないで目を開いてください</h1>
            </div>
        );
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
        dispatch({ type: "earLeftInitAllReset" });
        dispatch({ type: "earRightInitAllReset" });
    };

    return (
        <div className={classes.root}>
            {startCheck ? (
                <EarInitComponent
                    setFinishCheck={setFinishCheck}
                ></EarInitComponent>
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
                frequency={null}
                ear={true}
                downloadData={false}
            ></WebCameraComponent>
        </div>
    );
};

export default EarInitPage;
