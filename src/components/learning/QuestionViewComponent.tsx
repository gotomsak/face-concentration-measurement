import React, { useState, useEffect, useRef, useCallback } from "react";
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
    memoState: any;
    calcuratorState: any;
    questionID: number;
    setNext: any;
}> = (props) => {
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
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                width: "auto",
                height: "100%",
            },
            rootGrid: {
                // flexGrow: 1,
                // flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                maxWidth: "80%",
                display: "flex",
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
                refWindowNonFocusTimer.current = 0;
            });
        }
    }, [answerFinal]);

    useEffect(() => {
        // calculatorRef.current = calculatorResult;
        if (log === "") {
            // setLog(calculatorRef.current);
            setLog(calculatorResult);
        }
        if (calculatorResult !== "") {
            setLog(log + "\n" + calculatorResult);
        }
    }, [calculatorResult]);

    useEffect(() => {
        questionFetch(props.questionID);
    }, [props.questionID]);

    useEffect(() => {
        refWindowNonFocusTimer.current = windowNonFocusTimer;
    }, [windowNonFocusTimer]);

    useEffect(() => {
        let windowNonFocusTimerFlag: any;

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
            question_id: props.questionID,
            user_id: Number(localStorage.getItem("user_id")),
            memo_log: log,
            other_focus_second: refWindowNonFocusTimer.current,
            user_answer: answerFinal,
            start_time: startTime,
            end_time: end,
        };
    };

    const reset = () => {
        setAnswerResult("");
        props.setNext(true);
        setLog("");
        window.scrollTo(0, 0);
    };

    const changeText = useCallback((e: any) => {
        // console.log(e.target.value);
        setLog(e.target.value);
    }, []);

    const changeAnsType = (): JSX.Element | undefined => {
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
        <div className={classes.root}>
            <TitleComponent title={questionTitle}></TitleComponent>
            <QuestionComponent
                questionText={questionText}
                questionImg={questionImg}
            ></QuestionComponent>

            <div className={classes.rootGrid}>
                {props.memoState ? (
                    <LogComponent
                        log={log}
                        changeText={changeText}
                    ></LogComponent>
                ) : (
                    <></>
                )}
                {props.calcuratorState ? (
                    <CalculatorComponent
                        calculatorResult={setCalculatorResult}
                    ></CalculatorComponent>
                ) : (
                    <></>
                )}

                {changeAnsType()}
            </div>

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

export default React.memo(QuestionViewComponent);
