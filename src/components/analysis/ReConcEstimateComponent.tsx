import React, { useState, useEffect } from "react";
import { Button, MenuItem, Select } from "@material-ui/core";
import { adminGetFacePoint } from "../../apis/backendAPI/admin/getFacePoint";
import store from "../../store";
import {
  ConcentrationCalculation,
  ExtremumCalculation,
  PreprocessingData,
} from "../../opencv/gotoConc";
import { useDispatch } from "react-redux";
import { OpenCvProvider, useOpenCv } from "opencv-react";
import { onlyFacePointDetect } from "../../opencv/onlyFacePointDetect";
import SetEnvironment from "../utils/SetEnvironment";
import { getEnvironment } from "../../apis/backendAPI/environment/getEnvironment";
import { GetEnvironment } from "../../apis/backendAPI/environment/interfaces";
import { maxFacePointReducer } from "../../reducers/frequency/maxFacePointReducer";
import { earRightTReducer } from "../../reducers/ear/earRightTReducer";
import { maxFaceAngleReducer } from "../../reducers/frequency/maxFaceAngleReducer";
import { reMaxFrequency } from "../../apis/backendAPI/frequency/reMaxFrequency";
import { environments } from "../../apis/backendAPI/admin/interfaces";
import { getDate } from "../../utils/utils";
import { reMinFrequency } from "../../apis/backendAPI/frequency/reMinFrequency";

const ReConcEstimateComponent: React.FC<{
  environments: environments[];
  facePointAll: any;
}> = ({ environments, facePointAll }) => {
  const dispatch = useDispatch();

  const [separationNum, setseparationNum] = useState(5);

  const [oldData, setOldData] = useState<any>([]);

  const [sectionBlink, setSectionBlink] = useState<any>([]);
  const [sectionFaceMove, setSectionFaceMove] = useState<any>([]);
  const [sectionAngle, setSectionAngle] = useState<any>([]);
  const [maxBlink, setMaxBlink] = useState(null);
  const [minBlink, setMinBlink] = useState(null);
  const [maxFaceMove, setMaxFaceMove] = useState(null);
  const [minFaceMove, setMinFaceMove] = useState(null);

  const onLoaded = (cv: any) => {
    console.log("opencv loaded, cv");
    // setCv(cv);
  };
  const ReConcEstimate = () => {
    console.log(facePointAll);
    console.log(environments);

    // facePointAll["face_point_all"].forEach((e: any) => {
    //     console.log(e);
    //     const newData = onlyFacePointDetect(e, cvnew);

    //     if (e === null) {
    //         sectionFaceMove.push(store.getState().maxFaceMoveReducer);
    //         sectionBlink.push(true);
    //         sectionAngle.push({
    //             yaw: store.getState().maxYawReducer,
    //             pitch: store.getState().maxPitchReducer,
    //             roll: store.getState().maxRollReducer,
    //         });
    //     } else {
    //         const resultPrepro: any = PreprocessingData(
    //             newData,
    //             oldData,
    //             false
    //         );
    //         sectionFaceMove.push(resultPrepro["noseDifference"]);
    //         sectionBlink.push(resultPrepro["blinkBool"]);
    //         sectionAngle.push(resultPrepro["angle"]);
    //     }

    //     // dispatch({
    //     //     type: "facePointSet",
    //     //     face_point: e?.facePointAll,
    //     // });

    //     oldData.push(newData);
    //     const concResult = ConcentrationCalculation(
    //         sectionFaceMove,
    //         separationNum,
    //         sectionBlink,
    //         null,
    //         null,
    //         sectionAngle
    //     );
    // });
  };

  const ReFreqEstimate = () => {
    console.log("osita");

    const resFreq = {
      maxBlink: null,
      maxFaceMove: null,
      minBlink: null,
      minFaceMove: null,
    };

    store.getState().maxFacePointReducer.forEach((e: any, i: any) => {
      const newData = onlyFacePointDetect(
        e,
        store.getState().maxFaceAngleReducer[i]
      );
      // console.log(newData);
      // console.log(store.getState().maxFaceMoveReducer);
      if (newData === null) {
        sectionFaceMove.push(resFreq.maxFaceMove);
        sectionBlink.push(true);
        sectionAngle.push({
          yaw: store.getState().maxYawReducer,
          pitch: store.getState().maxPitchReducer,
          roll: store.getState().maxRollReducer,
        });
      } else {
        const resultPrepro: any = PreprocessingData(
          newData,
          oldData,
          store.getState().earRightTReducer,
          store.getState().earLeftTReducer
        );
        // console.log(resultPrepro);
        sectionFaceMove.push(resultPrepro["noseDifference"]);
        sectionBlink.push(resultPrepro["blinkBool"]);
        // sectionAngle.push(resultPrepro["angle"]);
      }
      // dispatch({
      //     type: "facePointSet",
      //     face_point: newData?.facePointAll,
      // });
      oldData.push(newData);
      const extResult = ExtremumCalculation(
        sectionFaceMove,
        separationNum,
        sectionBlink,
        "max",
        resFreq["maxFaceMove"],
        resFreq["minFaceMove"],
        resFreq["maxBlink"],
        resFreq["minBlink"]
      );
      console.log(extResult);
      console.log(sectionFaceMove);
      if (sectionFaceMove.length >= separationNum) {
        sectionFaceMove.shift();
        sectionAngle.shift();
        sectionBlink.shift();
      }

      resFreq["maxBlink"] = extResult.maxBlink;
      resFreq["maxFaceMove"] = extResult.maxFaceMove;
    });
    setMaxFaceMove(resFreq["maxFaceMove"]);
    setMaxBlink(resFreq["maxBlink"]);

    store.getState().minFacePointReducer.forEach((e: any, i: any) => {
      const newData = onlyFacePointDetect(
        e,
        store.getState().minFaceAngleReducer[i]
      );
      // console.log(newData);
      // console.log(store.getState().maxFaceMoveReducer);
      if (newData === null) {
        sectionFaceMove.push(resFreq.maxFaceMove);
        sectionBlink.push(true);
        sectionAngle.push({
          yaw: store.getState().maxYawReducer,
          pitch: store.getState().maxPitchReducer,
          roll: store.getState().maxRollReducer,
        });
      } else {
        const resultPrepro: any = PreprocessingData(
          newData,
          oldData,
          store.getState().earRightTReducer,
          store.getState().earLeftTReducer
        );
        // console.log(resultPrepro);
        sectionFaceMove.push(resultPrepro["noseDifference"]);
        sectionBlink.push(resultPrepro["blinkBool"]);
        // sectionAngle.push(resultPrepro["angle"]);
      }
      // dispatch({
      //     type: "facePointSet",
      //     face_point: newData?.facePointAll,
      // });
      oldData.push(newData);
      const extResult = ExtremumCalculation(
        sectionFaceMove,
        separationNum,
        sectionBlink,
        "min",
        resFreq["maxFaceMove"],
        resFreq["minFaceMove"],
        resFreq["maxBlink"],
        resFreq["minBlink"]
      );
      console.log(extResult);
      console.log(sectionFaceMove);
      if (sectionFaceMove.length >= separationNum) {
        sectionFaceMove.shift();
        sectionAngle.shift();
        sectionBlink.shift();
      }

      resFreq["minBlink"] = extResult.minBlink;
      resFreq["minFaceMove"] = extResult.minFaceMove;
    });
    reMaxFrequency({
      user_id: Number(localStorage.getItem("user_id")),
      separation_num: separationNum,
      max_frequency_data: {
        max_blink: store.getState().maxBlinkReducer,
        max_face_move: store.getState().maxFaceMoveReducer,
        ear_id: store.getState().concIDReducer,
        face_angle_all: store.getState().maxFaceAngleReducer,
        face_point_all: store.getState().facePointReducer,
      },
      environment_id: store.getState().concReducer.environment_id,
      root_max_freq_id: store.getState().concReducer.max_freq_id,
      date: getDate(),
    }).then((res: any) => {});

    reMinFrequency({
      user_id: Number(localStorage.getItem("user_id")),
      separation_num: separationNum,
      min_frequency_data: {
        min_blink: store.getState().minBlinkReducer,
        min_face_move: store.getState().minFaceMoveReducer,
        ear_id: store.getState().concIDReducer,
        face_angle_all: store.getState().minFaceAngleReducer,
        face_point_all: store.getState().facePointReducer,
      },
      environment_id: store.getState().concReducer.environment_id,
      root_min_freq_id: store.getState().concReducer.min_freq_id,
      date: getDate(),
    });
    setMinFaceMove(resFreq["minFaceMove"]);
    setMinBlink(resFreq["minBlink"]);

    // console.log(resFreq["maxBlink"]);
    // console.log(resFreq["maxFaceMove"]);
  };

  return (
    <div>
      <h1>再計算しますか？</h1>

      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={separationNum}
        label="集中度の測定頻度"
        onChange={(e: any) => {
          console.log(e);
          setseparationNum(e.target.value);
        }}
      >
        <MenuItem value={3}>3</MenuItem>
        <MenuItem value={4}>4</MenuItem>
        <MenuItem value={5}>5</MenuItem>
        <MenuItem value={6}>6</MenuItem>
        <MenuItem value={7}>7</MenuItem>
        <MenuItem value={8}>8</MenuItem>
        <MenuItem value={9}>9</MenuItem>
      </Select>
      <SetEnvironment
        environments={environments}
        reFreq={true}
      ></SetEnvironment>
      <Button color="secondary" onClick={ReFreqEstimate}>
        頻度再計算
      </Button>

      <Button color="secondary" onClick={ReConcEstimate}>
        集中度再計算
      </Button>
    </div>
  );
};

export default ReConcEstimateComponent;
