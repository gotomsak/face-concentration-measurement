import React, { useState, useEffect, useRef } from "react";
import TitleComponent from "./TitleComponent";
import QuestionComponent from "./QuestionComponent";
import LogComponent from "./LogComponent";
import CalculatorComponent from "./CalculatorComponent";
import AnsResultComponent from "./AnsResultComponent";
import { getQuestionGym } from "../../apis/backendAPI/learning/getQuestionGym";
import "./QuestionViewComponent.css";
import { checkAnswer } from "../../apis/backendAPI/learning/checkAnswer";
import { CheckAnswerPost } from "../../apis/backendAPI/learning/interfaces";
import { getNowTimeString } from "../../utils/utils";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid, { GridSpacing } from "@material-ui/core/Grid";
import AnsTextComponent from "./AnsTextComponent";
import AnsImgComponent from "./AnsImgComponent";

const GymQuestionViewComponent: React.FC<{
    questionID: number;
    setNext: any;
    concentrationData: any[];
}> = ({ questionID, setNext, concentrationData }) => {
    const dispatch = useDispatch();
    const [questionText, setQuestionText] = useState("");
    const [answerText, setAnswerText] = useState([]);
    const [calculatorResult, setCalculatorResult] = useState("");
    const [log, setLog] = useState("");
    const [answerResult, setAnswerResult] = useState("");
    const [answerFinal, setAnswerFinal] = useState("");
    const [startTime, setStartTime] = useState("");
    const [windowNonFocusTimer, setNonFocusTimer] = useState(0);
    const refWindowNonFocusTimer = useRef(windowNonFocusTimer);
    const [nowLevel, setNowLevel] = useState(5);
    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            root: {
                flexGrow: 1,
                margin: theme.spacing(2),
            },
            paper: {
                color: theme.palette.text.secondary,
            },
        })
    );
    const [spacing, setSpacing] = useState<GridSpacing>(2);
    const classes = useStyles();

    useEffect(() => {
        if (answerFinal !== "") {
            checkAnswer(setResult()).then((res) => {
                console.log(res.data);
                if (res.data["result"] === "correct") {
                    dispatch({ type: "correctNumberSet" });
                }
                setAnswerResult(res.data["answer"]);
                dispatch({
                    type: "ansResultIDSet",
                    id: res.data["answer_result_id"],
                });
            });
        }
    }, [answerFinal]);

    useEffect(() => {
        questionFetch();
    }, [questionID]);

    useEffect(() => {
        refWindowNonFocusTimer.current = windowNonFocusTimer;
    }, [windowNonFocusTimer]);

    useEffect(() => {
        let windowNonFocusTimerFlag: any;

        // webCameraInit();
        window.addEventListener("focus", () => {
            clearInterval(windowNonFocusTimerFlag);
        });
        window.addEventListener("blur", () => {
            windowNonFocusTimerFlag = setInterval(() => {
                setNonFocusTimer(refWindowNonFocusTimer.current + 1);
            }, 1000);
        });
    }, []);

    const questionFetch = () => {
        setStartTime(getNowTimeString());
        getQuestionGym({ now_level: nowLevel }).then((res) => {
            setAnswerText(res.data.answer_list);
            setQuestionText(res.data.question);
        });
    };

    const setResult = (): CheckAnswerPost => {
        const end = getNowTimeString();
        return {
            question_id: questionID,
            user_id: Number(localStorage.getItem("user_id")),
            memo_log: log,
            other_focus_second: windowNonFocusTimer,
            user_answer: answerFinal,
            start_time: startTime,
            end_time: end,
        };
    };

    const reset = () => {
        setAnswerResult("");
        setNext(true);
        setLog("");
        window.scrollTo(0, 0);
    };

    const changeAnsType = () => {
        console.log(answerText);
        if (answerText[0] !== "") {
            return (
                <AnsTextComponent
                    ansTextList={answerText}
                    answerFinal={setAnswerFinal}
                ></AnsTextComponent>
            );
        }
    };

    return (
        <div className="QuestionViewContainer">
            <QuestionComponent questionText={questionText}></QuestionComponent>

            {/* <div className="LogsContainer"> */}
            <div className={classes.root}>
                <Grid item>
                    <Grid container spacing={spacing}>
                        <Grid>
                            <LogComponent
                                calculatorResult={calculatorResult}
                                log={log}
                                setLog={setLog}
                            ></LogComponent>
                        </Grid>
                        <Grid>
                            <CalculatorComponent
                                calculatorResult={setCalculatorResult}
                            ></CalculatorComponent>
                        </Grid>
                    </Grid>
                </Grid>
            </div>

            {changeAnsType()}
            {answerResult !== "" && (
                <div>
                    <AnsResultComponent
                        ansResult={answerResult}
                    ></AnsResultComponent>
                    <button onClick={reset}>next</button>
                </div>
            )}
        </div>
    );
};

export default GymQuestionViewComponent;
