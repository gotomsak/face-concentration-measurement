import React, {
    useState,
    useEffect,
    useRef,
    useReducer,
    useCallback,
} from "react";

import { useSelector, useDispatch } from "react-redux";
import "./LearningPage.css";
import {
    GetQuestionIdsPost,
    CheckAnswerSectionPost,
    SonConc,
} from "../../apis/backendAPI/learning/interfaces";

// import ReadyViewComponent from "../../components/learning/ReadyViewComponent";
import { useHistory } from "react-router";
import QuestionViewComponent from "../../components/learning/QuestionViewComponent";
import { getQuestionIds } from "../../apis/backendAPI/learning/getQuestionIds";
import FinishViewComponent from "../../components/utils/FinishViewComponent";
import { checkAnswerSection } from "../../apis/backendAPI/learning/checkAnswerSection";

import store from "../..";

import { getNowTimeString } from "../../utils/utils";
import WebCameraComponent from "../../components/WebCameraComponent";
// import { BtoFtoC } from "../apis/backendAPI/interfaces";
import { Button, Checkbox, FormControlLabel } from "@material-ui/core";
import ConcentrationViewComponent from "../../components/learning/ConcentrationViewComponent";
import ReadyViewComponent from "../../components/utils/ReadyViewComponent";

function LearningPage() {
    const history = useHistory();
    const dispatch = useDispatch();
    const selector = useSelector((state) => state);
    const [startCheck, setStartCheck] = useState(false);
    const [startTime, setStartTime] = useState("");
    const [questionID, setQuestionID] = useState(0);
    const [next, setNext] = useState(false);

    const [cameraState, setCameraState] = useState(false);
    const [cameraStart, setCameraStart] = useState(false);
    const [cameraStop, setCameraStop] = useState(false);
    // 問題が10問とき終わったときのstate
    const [finish, setFinish] = useState(false);

    // FinishViewのボタンクリック時の判定
    // const [finishFlag, setFinishFlag] = useState(false);
    const [qCount, setQCount] = useState(0);

    const [concData, setConcData] = useState([]);

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
            setQuestionID(store.getState().questionIDsReducer[cnt]);
            setQCount(qCount + 1);
            setConcData([]);
            setNext(false);
        }
    }, [next]);

    useEffect(() => {
        if (finish === true) {
            console.log("owaru");
            checkAnswerSection(setSectionResult())
                .then((res) => {
                    console.log(res);
                    dispatch({
                        type: "ansResultSectionIDSet",
                        id: res.data["answer_result_section_id"],
                    });
                    dispatch({
                        type: "ansResultIDsReset",
                    });
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [finish]);

    useEffect(() => {
        if (startCheck === true) {
            console.log("startした");
            const getQuestionIdsPost: GetQuestionIdsPost = {
                solved_ids: store.getState().solvedIDsReducer,
                question_ids: store.getState().questionIDsReducer,
            };
            getQuestionIds(getQuestionIdsPost).then((res) => {
                dispatch({
                    type: "questionIDsSet",
                    id: res.data["question_ids"],
                });
                dispatch({ type: "solvedIDsSet", id: res.data["solved_ids"] });
            });
        }
    }, [startCheck]);

    useEffect(() => {
        console.log(selector);
        if (qCount === 0 && store.getState().questionIDsReducer !== 0) {
            setQuestionID(store.getState().questionIDsReducer[0]);
        }
    }, [selector]);

    const setSectionResult = (): CheckAnswerSectionPost => {
        return {
            user_id: Number(localStorage.getItem("user_id")),
            answer_result_ids: store.getState().ansResultIDsReducer,
            correct_answer_number: store.getState().correctNumberReducer,
            start_time: startTime,
            end_time: getNowTimeString(),
        };
    };

    const changeMethod = (e: any) => {
        if (e.target.name == "camera") {
            setCameraState(e.target.checked);
        }
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
        history.push("/questionnaire");
    };
    return (
        <div className="LearningPageContainer">
            {startCheck ? (
                questionID > 0 && (
                    <div>
                        <QuestionViewComponent
                            questionID={questionID}
                            concentrationData={concData}
                            setNext={setNext}
                        ></QuestionViewComponent>
                        {/* <ConcentrationViewComponent
                            concData1={c3}
                            concData2={sonConc}
                        ></ConcentrationViewComponent> */}
                    </div>
                )
            ) : finish ? (
                <FinishViewComponent
                    nextButton={nextButton}
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
                start={cameraStart}
                stop={cameraStop}
                method={false}
                frequency={null}
            ></WebCameraComponent>
        </div>
    );
}
export default LearningPage;
