import React, {
    useState,
    useEffect,
    useRef,
    useReducer,
    useCallback,
} from "react";

import { useSelector, useDispatch } from "react-redux";
import "./LearningPage.css";
// import ReadyViewComponent from "../../components/learning/ReadyViewComponent";
import { useHistory } from "react-router";
import GymQuestionViewComponent from "../../components/learning/GymQuestionViewComponent";
import { getQuestionIds } from "../../apis/backendAPI/learning/getQuestionIds";
import FinishViewComponent from "../../components/utils/FinishViewComponent";
import { checkAnswerSection } from "../../apis/backendAPI/learning/checkAnswerSection";
// import { pync } from "../apis/pyncAPI";
import store from "../..";

import { getNowTimeString } from "../../utils/utils";
import WebCameraComponent from "../../components/WebCameraComponent";
import { BtoFtoC } from "../../apis/backendAPI/learning/interfaces";
import { Button, Checkbox, FormControlLabel } from "@material-ui/core";
import ConcentrationViewComponent from "../../components/learning/ConcentrationViewComponent";

function GymPage() {
    const history = useHistory();
    const dispatch = useDispatch();
    const selector = useSelector((state) => state);
    const [startCheck, setStartCheck] = useState(false);
    const [startTime, setStartTime] = useState("");
    const [questionID, setQuestionID] = useState(0);
    const [next, setNext] = useState(false);
    const [method, setMethod] = useState(0);
    const [method1, setMethod1] = useState(false);
    const [method2, setMethod2] = useState(false);
    const [cameraMethod, setCameraMethod] = useState(false);
    const [cameraStop, setCameraStop] = useState(false);
    // 問題が10問とき終わったときのstate
    const [finish, setFinish] = useState(false);

    // FinishViewのボタンクリック時の判定
    // const [finishFlag, setFinishFlag] = useState(false);
    const [qCount, setQCount] = useState(0);
    const [blobData, setBlobData] = useState<Blob | null>(null);
    const [imagePath, setImagePath] = useState("");
    const [concData, setConcData] = useState([]);
    const [cameraStart, setCameraStart] = useState(false);

    useEffect(() => {
        setStartTime(getNowTimeString());
    }, []);

    useEffect(() => {
        console.log(qCount);
        if (qCount > 9) {
            setFinish(true);
            if (cameraStart === true) {
                setCameraStop(true);
            }
            setStartCheck(false);
        }
        if (next === true && qCount <= 9) {
            const cnt = qCount + 1;
            setConcData([]);
            setNext(false);
        }
    }, [next]);

    useEffect(() => {
        if (finish === true) {
            console.log("owaru");
            history.push("/");
        }
    }, [finish]);

    useEffect(() => {
        if (startCheck === true) {
            console.log("startした");
        }
    }, [startCheck]);

    useEffect(() => {
        console.log(selector);
        if (qCount === 0 && store.getState().questionIDsReducer !== 0) {
            setQuestionID(1);
        }
    }, [selector]);

    const sendData = () => {};

    const changeMethod = (e: any) => {
        console.log(e.target.checked);
        if (e.target.name == "method1") {
            setMethod1(e.target.checked);
        }
        if (e.target.name == "method2") {
            setMethod2(e.target.checked);
        }
        if (e.target.name == "camera") {
            setCameraMethod(e.target.checked);
        }
    };
    const startCheckButton = (e: any) => {
        console.log(e.currentTarget.value);
        if (e.currentTarget.value == 1) {
            if (cameraMethod === true) {
                setCameraStart(true);
            }
            setStartCheck(true);
        }
    };
    const readyViewText = () => {
        return (
            <div>
                <h1>準備は良いですか？</h1>
                <h2>良ければスタートボタンを押してください</h2>
                <h3>10問おきに継続，終了を選べます</h3>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={method1}
                            onChange={changeMethod}
                            inputProps={{ "aria-label": "primary checkbox" }}
                            name="method1"
                        />
                    }
                    label="Method1"
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={cameraMethod}
                            onChange={changeMethod}
                            inputProps={{ "aria-label": "primary checkbox" }}
                            name="camera"
                        />
                    }
                    label="UseCamera"
                />
                <Button onClick={startCheckButton} color="secondary" value={1}>
                    start
                </Button>
            </div>
        );
    };
    const nextButton = (e: any) => {
        history.push("/questionnaire");
    };
    return (
        <div className="LearningPageContainer">
            {startCheck ? (
                questionID > 0 && (
                    <div>
                        <GymQuestionViewComponent
                            questionID={questionID}
                            concentrationData={concData}
                            setNext={setNext}
                        ></GymQuestionViewComponent>
                    </div>
                )
            ) : finish ? (
                <FinishViewComponent
                    nextButton={nextButton}
                ></FinishViewComponent>
            ) : (
                <h1>準備中</h1>
                // <ReadyViewComponent
                //     setStartCheck={setStartCheck}
                //     readyViewText={readyViewText}
                // ></ReadyViewComponent>
            )}

            <WebCameraComponent
                start={cameraStart}
                stop={cameraStop}
                frequency={null}
                downloadData={false}
                // setBlobData={setBlobData}
                // setWebSocketData={webSocketDataAdd}
                // method1={method1}
                // method2={method2}
                // sendData={sendData}
            ></WebCameraComponent>
        </div>
    );
}
export default GymPage;
