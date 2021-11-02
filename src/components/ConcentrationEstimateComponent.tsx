import React, { useState, useEffect, useRef } from "react";
import { OpenCvProvider, useOpenCv } from "opencv-react";
// import * as faceapi from "face-api.js";
import { getWeight, headpose } from "../opencv/headpose";
import { solve } from "../opencv/solve";
import { detect } from "../opencv/detect";
import { difference } from "../opencv/difference";
import { setServers } from "dns";
import { blinkCount, eyeT } from "../opencv/ear";
import {
    getConcentration,
    getConcentrationSynthesis,
} from "../opencv/concentration";
import { useSelector, useDispatch } from "react-redux";
// import opencv from "./opencv/opencv.js";
import store from "..";
import { gridColumnsTotalWidthSelector } from "@material-ui/data-grid";

const ConcentrationEstimateComponent: React.FC<{
    video: any;
    canvas1: any;
    canvas2: any;
    start: boolean;
    stop: boolean;
    faceapi: any;
    ear: boolean;
    frequency: string | null;
}> = ({ video, canvas1, canvas2, start, stop, faceapi, ear, frequency }) => {
    const dispatch = useDispatch();

    const { loaded, cv } = useOpenCv();
    const [cvnew, setCvnew] = useState();
    const [oldData, setOldData] = useState<any>([]);

    const [sectionBlink, setSectionBlink] = useState<any>([]);
    const [sectionFaceMove, setSectionFaceMove] = useState<any>([]);
    const [sectionAngle, setSectionAngle] = useState<any>([]);

    const [msSeparation, setMsSeparation] = useState(1000);
    const [separationNum, setSeparationNum] = useState(5);
    const [earRightList, setEarRightList] = useState<any>([]);
    const [earLeftList, setEarLeftList] = useState<any>([]);
    const [intervalID, setIntervalID] = useState<NodeJS.Timeout>();

    useEffect(() => {
        if (cv) {
            cv.then((res: any) => {
                setCvnew(res);
            });
        }
    }, [cv]);

    useEffect(() => {
        if (start) {
            setIntervalID(
                setInterval(() => {
                    detect(faceapi, video, canvas1, canvas2, cvnew).then(
                        (res) => {
                            if (res === undefined) {
                                sectionFaceMove.push(
                                    store.getState().maxFaceMoveReducer
                                );
                                sectionBlink.push(true);
                                sectionAngle.push({
                                    yaw: store.getState().maxYawReducer,
                                    pitch: store.getState().maxPitchReducer,
                                    roll: store.getState().maxRollReducer,
                                });
                            } else {
                                const startProcessing = performance.now();
                                PreprocessingData(res, oldData);
                                const endProcessing = performance.now();
                                console.log(
                                    "processiong: " +
                                        (
                                            endProcessing - startProcessing
                                        ).toString()
                                );
                            }
                            dispatch({
                                type: "facePointSet",
                                face_point: res?.facePointAll,
                            });
                            dispatch({
                                type: "faceAngleSet",
                                face_angle: res?.angle,
                            });

                            oldData.push(res);
                            const startConcent = performance.now();
                            ConcentrationCalculation();
                            const endConcent = performance.now();
                            console.log(
                                "concent: " +
                                    (endConcent - startConcent).toString()
                            );
                        }
                    );
                }, msSeparation)
            );
        }
    }, [start]);
    useEffect(() => {
        if (stop && ear) {
            const earRT = eyeT(
                store.getState().earRightInitReducer.ear_right_init_list
            );
            // console.log(earRT);
            const earLT = eyeT(
                store.getState().earLeftInitReducer.ear_left_init_list
            );
            dispatch({
                type: "earLeftInitTSet",
                ear_left_init_t: earLT,
            });
            dispatch({
                type: "earRightInitTSet",
                ear_right_init_t: earRT,
            });
        }
        if (stop) {
            clearInterval(Number(intervalID));
        }
    }, [stop]);

    const ConcentrationCalculation = () => {
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
                if (
                    store.getState().maxFaceMoveReducer <
                        PointSum / separationNum ||
                    store.getState().maxFaceMoveReducer === null
                ) {
                    dispatch({
                        type: "maxFaceMoveSet",
                        maxFaceMove: PointSum / separationNum,
                    });
                }

                if (
                    store.getState().maxBlinkReducer <
                        BlinkSum / separationNum ||
                    store.getState().maxBlinkReducer === null
                )
                    dispatch({
                        type: "maxBlinkSet",
                        maxBlink: BlinkSum / separationNum,
                    });
            }
            if (frequency == "min") {
                if (
                    store.getState().minFaceMoveReducer >
                        PointSum / separationNum ||
                    store.getState().minFaceMoveReducer === null
                ) {
                    dispatch({
                        type: "minFaceMoveSet",
                        minFaceMove: PointSum / separationNum,
                    });
                }

                if (
                    store.getState().minBlinkReducer >
                        BlinkSum / separationNum ||
                    store.getState().minBlinkReducer === null
                )
                    dispatch({
                        type: "minBlinkSet",
                        minBlink: BlinkSum / separationNum,
                    });
            }

            if (frequency === null && ear === false) {
                let yawSum = 0;
                let pitchSum = 0;
                let rollSum = 0;
                sectionAngle.forEach((value: any) => {
                    yawSum += value.yaw;
                    pitchSum += value.pitch;
                    rollSum += value.roll;
                });
                // console.log(BlinkSum);
                const c1 = getConcentration(
                    BlinkSum / separationNum,
                    store.getState().maxBlinkReducer,
                    store.getState().minBlinkReducer
                );
                // console.log("c2 pointsum" + PointSum / separationNum);

                const c2 = getConcentration(
                    PointSum / separationNum,
                    store.getState().maxFaceMoveReducer,
                    store.getState().minFaceMoveReducer
                );

                const w = getWeight(
                    yawSum / separationNum,
                    pitchSum / separationNum,
                    rollSum / separationNum
                );
                const c3 = getConcentrationSynthesis(c1, c2, w);
                const date = new Date();
                date.setHours(date.getHours() + 9);

                dispatch({
                    type: "concSet",
                    conc: {
                        c1: c1,
                        c2: c2,
                        w: w,
                        c3: c3,
                        date: date,
                    },
                });
                // console.log(store.getState().concReducer);
            }
            sectionFaceMove.shift();
            sectionAngle.shift();
            sectionBlink.shift();
        }
    };

    const PreprocessingData = (newData: any, oldData: any) => {
        // console.log(newData.facePoint);
        if (oldData.length > 0 && oldData.slice(-1)[0] !== undefined) {
            // let AllPointSum = 0;
            // for (var i = 0; i < oldData.slice(-1)[0]["facePoint"].length; i++) {
            //     AllPointSum += difference(
            //         oldData.slice(-1)[0]["facePoint"][i],
            //         newData.facePoint[i]
            //     );
            // }
            // console.log(AllPointSum);
            const noseDifference = difference(
                oldData.slice(-1)[0]["facePoint"][0],
                newData.facePoint[0]
            );
            sectionFaceMove.push(noseDifference);
            if (ear) {
                // earLeftList.push(newData.ear.left);
                // earRightList.push(newData.ear.right);

                // if (store.getState().earLeftInitReducer < newData.ear.left) {
                dispatch({
                    type: "earLeftInitSet",
                    ear_left_init_list: newData.ear.left,
                });
                // }
                // if (store.getState().earRightInitReducer < newData.ear.right) {
                dispatch({
                    type: "earRightInitSet",
                    ear_right_init_list: newData.ear.right,
                });
                // }
            }
            console.log(
                "concentrationEstimate: " + store.getState().earLeftTReducer
            );
            console.log("newEarleft: " + newData.ear.left.toString());
            console.log("earLeftTRedu: " + store.getState().earLeftTReducer);
            console.log("newEarright: " + newData.ear.right.toString());
            console.log("earRightTRedu: " + store.getState().earRightTReducer);

            const blinkBool = blinkCount(
                newData.ear.left,
                newData.ear.right,
                store.getState().earLeftTReducer,
                store.getState().earRightTReducer
            );
            sectionBlink.push(blinkBool);

            sectionAngle.push(newData.angle);
        }
    };

    return <div></div>;
};

export default ConcentrationEstimateComponent;
