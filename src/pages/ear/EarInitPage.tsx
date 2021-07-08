import React, { useState, useEffect } from "react";
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

    useEffect(() => {
        const date = new Date();
        date.setHours(date.getHours() + 9);

        if (finishCheck === true) {
            setCameraStop(true);
            setCameraStart(false);
            setStartCheck(false);
            initEar({
                user_id: Number(localStorage.getItem("user_id")),
                left_ear: store.getState().earLeftInitReducer,
                right_ear: store.getState().earRightInitReducer,
                date: date,
            })
                .then((res) => {
                    console.log(res);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [finishCheck]);

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
