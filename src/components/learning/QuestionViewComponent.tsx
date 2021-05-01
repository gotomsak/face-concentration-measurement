import React, { useState, useEffect, useRef } from "react";
import TitleComponent from "./TitleComponent";
import QuestionComponent from "./QuestionComponent";
import LogComponent from "./LogComponent";
import CalculatorComponent from "./CalculatorComponent";
import AnsResultComponent from "./AnsResultComponent";
import { getQuestion } from "../../apis/backendAPI/learning/getQuestion";
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

const QuestionViewComponent: React.FC<{
    questionID: number;
    setNext: any;
    concentrationData: any[];
}> = ({ questionID, setNext, concentrationData }) => {
    const dispatch = useDispatch();
    const [questionText, setQuestionText] = useState("");
    const [questionImg, setQuestionImg] = useState([]);
    const [questionTitle, setQuestionTitle] = useState("");
    const [answerText, setAnswerText] = useState([]);
    const [answerImg, setAnswerImg] = useState([]);
    const [calculatorResult, setCalculatorResult] = useState("");
    const [log, setLog] = useState("");
    const [answerResult, setAnswerResult] = useState("");
    const [answerFinal, setAnswerFinal] = useState("");
    const [startTime, setStartTime] = useState("");
    const [windowNonFocusTimer, setNonFocusTimer] = useState(0);
    const refWindowNonFocusTimer = useRef(windowNonFocusTimer);
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
        questionFetch(questionID);
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

    const questionFetch = (qid: number) => {
        setStartTime(getNowTimeString());
        getQuestion(qid).then((res) => {
            setQuestionText(res.data.question);
            setQuestionTitle(
                res.data.season +
                    " " +
                    res.data.question_num +
                    " " +
                    res.data.genre
            );
            setQuestionImg(res.data.qimg_path);
            setAnswerText(res.data.ans_list);
            setAnswerImg(res.data.aimg_list);
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
            concentration_data: concentrationData,
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
        console.log(answerText.length);
        console.log(answerText);
        console.log(answerImg);
        if (answerImg[0] !== "") {
            return (
                <AnsImgComponent
                    ansImgList={answerImg}
                    answerFinal={setAnswerFinal}
                ></AnsImgComponent>
            );
        }
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
            <TitleComponent title={questionTitle}></TitleComponent>
            <QuestionComponent
                questionText={questionText}
                questionImg={questionImg}
            ></QuestionComponent>

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

export default QuestionViewComponent;
