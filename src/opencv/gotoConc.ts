import { useDispatch } from "react-redux";
import store from "../store";
import { getConcentration, getConcentrationSynthesis } from "./concentration";
import { detect } from "./detect";
import { difference } from "./difference";
import { blinkCount } from "./ear";
import { getWeight } from "./headpose";

// const dispatch = useDispatch();
export const ExtremumCalculation = (
  sectionFaceMove: any,
  separationNum: any,
  sectionBlink: any,
  frequency: string | null,
  maxFaceMove: any,
  minFaceMove: any,
  maxBlink: any,
  minBlink: any
) => {
  const res = {
    maxBlink: maxBlink,
    maxFaceMove: maxFaceMove,
    minBlink: minBlink,
    minFaceMove: minFaceMove,
  };
  if (sectionFaceMove.length >= separationNum) {
    const PointSum = sectionFaceMove.reduce(
      (sum: any, value: any) => sum + value,
      0
    );
    console.log(sectionBlink);
    const BlinkSum = sectionBlink.reduce(
      (sum: any, value: any) => sum + (value == true ? 1 : 0),
      0
    );

    if (frequency === "max") {
      if (maxFaceMove < PointSum / separationNum || maxFaceMove === null) {
        res["maxFaceMove"] = PointSum / separationNum;
      }

      if (maxBlink < BlinkSum / separationNum || maxBlink === null) {
        res["maxBlink"] = BlinkSum / separationNum;
      }
    }
    if (frequency == "min") {
      if (minFaceMove > PointSum / separationNum || minFaceMove === null) {
        res["minFaceMove"] = PointSum / separationNum;
      }

      if (minBlink > BlinkSum / separationNum || minBlink === null) {
        res["minBlink"] = BlinkSum / separationNum;
      }
    }
  }
  return res;
};

export const ConcentrationCalculation = (
  sectionFaceMove: any,
  separationNum: any,
  sectionBlink: any,

  sectionAngle: any,
  maxFaceMove: any,
  minFaceMove: any,
  maxBlink: any,
  minBlink: any
) => {
  const date = new Date();
  date.setHours(date.getHours() + 9);
  const conc = {
    c1: 0,
    c2: 0,
    w: 0,
    c3: 0,
    date: date,
  };
  if (sectionFaceMove.length >= separationNum) {
    const PointSum = sectionFaceMove.reduce(
      (sum: any, value: any) => sum + value,
      0
    );
    console.log(sectionBlink);
    const BlinkSum = sectionBlink.reduce(
      (sum: any, value: any) => sum + (value == true ? 1 : 0),
      0
    );

    let yawSum = 0;
    let pitchSum = 0;
    let rollSum = 0;
    sectionAngle.forEach((value: any) => {
      yawSum += value.yaw;
      pitchSum += value.pitch;
      rollSum += value.roll;
    });
    // console.log(BlinkSum);
    conc["c1"] = getConcentration(BlinkSum / separationNum, maxBlink, minBlink);

    // console.log("c2 pointsum" + PointSum / separationNum);

    conc["c2"] = getConcentration(
      PointSum / separationNum,
      maxFaceMove,
      minFaceMove
    );

    conc["w"] = getWeight(
      yawSum / separationNum,
      pitchSum / separationNum,
      rollSum / separationNum
    );

    conc["c3"] = getConcentrationSynthesis(conc["c1"], conc["c2"], conc["w"]);
  }
  return conc;
};

export const PreprocessingData = (
  newData: any,
  oldData: any,
  earRightT: any,
  earLeftT: any
) => {
  const res: { blinkBool: any; noseDifference: any; angle: any } = {
    blinkBool: null,
    noseDifference: null,
    angle: null,
  };
  if (oldData.length > 0 && oldData.slice(-1)[0] !== undefined) {
    res["noseDifference"] = difference(
      oldData.slice(-1)[0]["facePoint"][0],
      newData.facePoint[0]
    );
    res["angle"] = newData.angle;
    // sectionFaceMove.push(noseDifference);
    // if (ear) {
    //     const resEar = [];
    //     resEar.push(newData.ear.left);
    //     resEar.push(newData.ear.right);
    //     // dispatch({
    //     //     type: "earLeftInitSet",
    //     //     ear_left_init_list: newData.ear.left,
    //     // });

    //     // dispatch({
    //     //     type: "earRightInitSet",
    //     //     ear_right_init_list: newData.ear.right,
    //     // });
    //     return resEar;
    // }
    // console.log(
    //     "concentrationEstimate: " + store.getState().earLeftTReducer
    // );
    // console.log("newEarleft: " + newData.ear.left.toString());
    // console.log("earLeftTRedu: " + store.getState().earLeftTReducer);
    // console.log("newEarright: " + newData.ear.right.toString());
    // console.log("earRightTRedu: " + store.getState().earRightTReducer);

    res["blinkBool"] = blinkCount(
      newData.ear.left,
      newData.ear.right,
      earLeftT,
      earRightT
    );
    // return {
    //     blinkBool: blinkBool,
    //     noseDifference: noseDifference,
    //     angle: newData.angle,
    // };
    // sectionBlink.push(blinkBool);

    // sectionAngle.push(newData.angle);
  }
  return res;
};
