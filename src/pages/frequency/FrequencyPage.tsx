import { Button } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { start } from "repl";
import FinishViewComponent from "../../components/utils/FinishViewComponent";
import MaxFrequencyComponent from "../../components/frequency/MaxFrequencyComponent";
import MinFrequencyComponent from "../../components/frequency/MinFrequencyComponent";
import ReadyViewComponent from "../../components/utils/ReadyViewComponent";
import WebCameraComponent from "../../components/WebCameraComponent";
import { NavigateFunction, useNavigate } from "react-router";
import userEvent from "@testing-library/user-event";
import { BtoF } from "../../apis/backendAPI/frequency/interfaces";
import { initMaxFrequency } from "../../apis/backendAPI/frequency/initMaxFrequency";
import { initMinFrequency } from "../../apis/backendAPI/frequency/initMinFrequency";
import {
  InitMaxFrequency,
  InitMinFrequency,
} from "../../apis/backendAPI/frequency/interfaces";
import store from "../../store";
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
import SetEarComponent from "../../components/utils/SetEarComponent";
import { GetEar } from "../../apis/backendAPI/ear/interfaces";
import { getEar } from "../../apis/backendAPI/ear/getEar";

function FrequencyPage() {
  const [startCheck, setStartCheck] = useState(false);
  const [cameraState, setCameraState] = useState(false);
  // データが取り終わった時のステート
  const [finishCheck, setFinishCheck] = useState(false);
  const [ears, setEars] = useState<GetEar[]>([]);

  // 終了メッセージが表示されたあとのステート
  // const [finishFlag, setFinishFlag] = useState(false);

  const [ready, setReady] = useState(false);
  const [cameraStart, setCameraStart] = useState(false);
  const [cameraStop, setCameraStop] = useState(false);
  const navigate: NavigateFunction = useNavigate();
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
          .then((res: any) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      }
      if (frequency === "min") {
        initMinFrequency(initMinFrequencyValue())
          .then((res: any) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  }, [finishCheck]);

  useEffect(() => {
    getEar().then((res: any) => {
      console.log(res);
      setEars(res.data["earData"]);
    });
  }, []);
  const initMaxFrequencyValue = (): InitMaxFrequency => {
    const date = new Date();
    date.setHours(date.getHours() + 9);

    return {
      user_id: Number(localStorage.getItem("user_id")),
      max_frequency_data: {
        max_blink: Number(store.getState().maxBlinkReducer),
        max_face_move: Number(store.getState().maxFaceMoveReducer),
        ear_id: store.getState().concReducer.ear_id,
        face_point_all: store.getState().facePointReducer,
        face_angle_all: store.getState().faceAngleReducer,
      },
      date: date,
    };
  };

  const initMinFrequencyValue = (): InitMinFrequency => {
    const date = new Date();
    date.setHours(date.getHours() + 9);
    return {
      user_id: Number(localStorage.getItem("user_id")),
      min_frequency_data: {
        min_blink: Number(store.getState().minBlinkReducer),
        min_face_move: Number(store.getState().minFaceMoveReducer),
        ear_id: store.getState().concReducer.ear_id,
        face_point_all: store.getState().facePointReducer,
        face_angle_all: store.getState().faceAngleReducer,
      },
      date: date,
    };
  };

  const recordSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFrequency((e.target as HTMLInputElement).value);
  };

  const readyViewText = () => {
    return (
      <div>
        <RadioGroup
          aria-label="frequency"
          name="frequency"
          value={frequency}
          onChange={recordSelect}
        >
          <FormControlLabel value="max" control={<Radio />} label="Max" />
          <FormControlLabel value="min" control={<Radio />} label="Min" />
        </RadioGroup>

        <SetEarComponent ears={ears}></SetEarComponent>
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
    navigate("/");
  };
  return (
    <div className={classes.root}>
      {/* <div className={classes.head}></div> */}
      {startCheck ? (
        renderRecord()
      ) : finishCheck ? (
        <FinishViewComponent nextButton={nextButton}></FinishViewComponent>
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
        ear={false}
        downloadData={false}
      ></WebCameraComponent>
    </div>
  );
}
export default FrequencyPage;
