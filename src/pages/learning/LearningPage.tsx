import React, {
  useState,
  useEffect,
  useRef,
  useReducer,
  useCallback,
  memo,
} from "react";

import { useSelector, useDispatch } from "react-redux";
import "./LearningPage.css";
import {
  GetQuestionIdsPost,
  CheckAnswerSectionPost,
  SonConc,
  GetQuestionIdQuery,
} from "../../apis/backendAPI/learning/interfaces";
import { getID } from "../../apis/backendAPI/getID";

// import ReadyViewComponent from "../../components/learning/ReadyViewComponent";
import { NavigateFunction, useNavigate } from "react-router";
import QuestionViewComponent from "../../components/learning/QuestionViewComponent";
import { getQuestionIds } from "../../apis/backendAPI/learning/getQuestionIds";
import FinishViewComponent from "../../components/utils/FinishViewComponent";
import { checkAnswerSection } from "../../apis/backendAPI/learning/checkAnswerSection";

import store from "../../store";

import { getNowTimeString } from "../../utils/utils";
import WebCameraComponent from "../../components/WebCameraComponent";
// import { BtoFtoC } from "../apis/backendAPI/interfaces";
import { Button, Checkbox, FormControlLabel } from "@material-ui/core";
import ConcentrationViewComponent from "../../components/learning/ConcentrationViewComponent";
import ReadyViewComponent from "../../components/utils/ReadyViewComponent";
import { postConcentSplitSave } from "../../apis/backendAPI/postConcentSplitSave";
import { getFrequency } from "../../apis/backendAPI/frequency/getFrequency";
import SetFrequencyComponent from "../../components/utils/SetFrequencyComponent";
import SetEnvironment from "../../components/utils/SetEnvironment";
import ConcentTextViewComponent from "../../components/ConcentTextViewComponent";
import { getEnvironment } from "../../apis/backendAPI/environment/getEnvironment";
import { environments } from "../../apis/backendAPI/admin/interfaces";
import { ClassNameMap } from "@material-ui/styles";
import { LearningPageStyle } from "../../Styles";
import SelectQuestionViewComponent from "../../components/learning/SelectQuestionViewComponent";
import { getSelectQuestion } from "../../apis/backendAPI/learning/getSelectQuestion";

const LearningPage: React.FC = () => {
  const navigate: NavigateFunction = useNavigate();
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const [startCheck, setStartCheck] = useState(false);
  const [startTime, setStartTime] = useState("");
  const [questionID, setQuestionID] = useState(0);
  const [next, setNext] = useState(false);

  const [cameraState, setCameraState] = useState(false);
  const [cameraStart, setCameraStart] = useState(false);
  const [cameraStop, setCameraStop] = useState(false);
  const [environments, setEnvironments] = useState<environments[]>([]);
  // 問題が10問とき終わったときのstate
  const [finish, setFinish] = useState(false);
  const [intervalID, setIntervalID] = useState<NodeJS.Timeout>();

  const [selectedQuestion, setSelectedQuestion] = useState<GetQuestionIdQuery>({
    select_question_id: "none",
  });
  const [selectQuestion, setSelectQuestion] = useState({
    select_question: null,
  });
  // FinishViewのボタンクリック時の判定
  // const [finishFlag, setFinishFlag] = useState(false);
  const [qCount, setQCount] = useState<number>(0);

  const classes: ClassNameMap = LearningPageStyle();

  useEffect(() => {
    setStartTime(getNowTimeString());
    // getFrequency().then((res: any) => {
    //     setFrequencys(res);

    //     console.log(res);
    // });
    getEnvironment().then((res: any) => {
      // console.log(res);
      setEnvironments(res.data.environments);
    });
    getSelectQuestion().then((res: any) => {
      if (res.data !== null) {
        setSelectQuestion(res.data);
      }
    });
  }, []);

  useEffect(() => {
    console.log(qCount);
    console.log(store.getState().questionIDsReducer.length);
    if (qCount !== 0 && qCount === store.getState().questionIDsReducer.length) {
      setFinish(true);
      if (cameraStart === true) {
        setCameraStop(true);
      }

      setStartCheck(false);
    }
    if (next === true && qCount <= store.getState().questionIDsReducer.length) {
      const cnt = qCount + 1;
      setQuestionID(store.getState().questionIDsReducer[cnt]);
      setQCount(qCount + 1);
      setNext(false);
    }
  }, [next]);

  useEffect(() => {
    if (finish === true) {
      console.log("owaru");
      clearInterval(Number(intervalID));
      sendConcentSplit();
      checkAnswerSection(setSectionResult())
        .then((res: any) => {
          console.log(res);
          dispatch({
            type: "ansResultSectionIDSet",
            id: res.data["answer_result_section_id"],
          });
          dispatch({
            type: "ansResultIDsReset",
          });
          dispatch({ type: "correctNumberReset" });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [finish]);

  useEffect(() => {}, [cameraState]);

  useEffect(() => {
    if (startCheck === true) {
      console.log("startした");
      if (cameraState == true) {
        setIntervalID(setInterval(sendConcentSplit, 10000));
      }
      const getQuestionIdsPost: GetQuestionIdsPost = {
        solved_ids: store.getState().solvedIDsReducer,
        question_ids: store.getState().questionIDsReducer,
      };
      getID({
        type: "gotoSys",
        work: "learning",
        memo: "基本情報のE-learning",
        measurement: "gotoConc",
        user_id: Number(localStorage.getItem("user_id")),
        concentration: store.getState().concReducer,
      }).then((res: any) => {
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
      getQuestionIds(getQuestionIdsPost, selectedQuestion).then((res: any) => {
        console.log(res);
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
      select_question_id: selectedQuestion.select_question_id,
      correct_answer_number: store.getState().correctNumberReducer,
      conc_id: store.getState().concIDReducer,
      start_time: startTime,
      end_time: getNowTimeString(),
    };
  };

  const changeMethod = (e: any) => {
    if (e.target.name == "camera") {
      setCameraState(e.target.checked);
    }
  };

  const sendConcentSplit = () => {
    postConcentSplitSave({
      type: "gotoSys",
      id: store.getState().concIDReducer,
      measurement: "gotoConc",
      memo: "",
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
    navigate("/questionnaire");
  };
  return (
    <div className={classes.root}>
      {startCheck ? (
        questionID > 0 && (
          <div>
            <QuestionViewComponent
              questionID={questionID}
              setNext={setNext}
            ></QuestionViewComponent>
            {/* <ConcentrationViewComponent
                            concData1={c3}
                            concData2={sonConc}
                        ></ConcentrationViewComponent> */}
          </div>
        )
      ) : finish ? (
        <FinishViewComponent nextButton={nextButton}></FinishViewComponent>
      ) : (
        <div style={{ margin: "10px" }}>
          <ReadyViewComponent
            cameraState={cameraState}
            changeMethod={changeMethod}
            startCheckButton={startCheckButton}
            readyViewText={readyViewText()}
          ></ReadyViewComponent>
          <div className={classes.select_question}>
            <SelectQuestionViewComponent
              selectQuestionData={selectQuestion}
              setSelectedQuestion={setSelectedQuestion}
            ></SelectQuestionViewComponent>
          </div>
          <SetEnvironment
            environments={environments}
            reFreq={false}
          ></SetEnvironment>
        </div>
      )}

      <WebCameraComponent
        start={cameraStart}
        stop={cameraStop}
        frequency={null}
        ear={false}
        downloadData={false}
      ></WebCameraComponent>
      <ConcentTextViewComponent></ConcentTextViewComponent>
    </div>
  );
};
export default React.memo(LearningPage);
