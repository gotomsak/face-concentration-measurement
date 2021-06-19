import React, { useState, useEffect, useRef } from "react";
import { OpenCvProvider, useOpenCv } from "opencv-react";
// import * as faceapi from "face-api.js";
import { getWeight, headpose } from "../opencv/headpose";
import { solve } from "../opencv/solve";
import { detect } from "../opencv/detect";
import { difference } from "../opencv/difference";
import { setServers } from "dns";
import { blinkCount } from "../opencv/ear";
import {
    getConcentration,
    getConcentrationSynthesis,
} from "../opencv/concentration";
import { useSelector, useDispatch } from "react-redux";
// import opencv from "./opencv/opencv.js";
import store from "..";

const ConcentrationEstimateComponent: React.FC<{
    video: any;
    canvas1: any;
    canvas2: any;
    start: any;
    faceapi: any;
    frequency: string | null;
    // maxSectionFacePointRef: any;
    // minSectionFacePointRef: any;
    // maxSectionBlinkRef: any;
    // minSectionBlinkRef: any;
    // maxSectionYawRef: any;
    // maxSectionPitchRef: any;
    // maxSectionRollRef: any;
}> = ({
    video,
    canvas1,
    canvas2,
    start,
    faceapi,
    frequency,
    // maxSectionFacePointRef,
    // minSectionFacePointRef,
    // maxSectionBlinkRef,
    // minSectionBlinkRef,
    // maxSectionYawRef,
    // maxSectionPitchRef,
    // maxSectionRollRef,
}) => {
    const dispatch = useDispatch();

    const { loaded, cv } = useOpenCv();
    const [cvnew, setCvnew] = useState();
    const [oldData, setOldData] = useState<any>([]);

    const [sectionBlink, setSectionBlink] = useState<any>([]);
    const [sectionFaceMove, setSectionFaceMove] = useState<any>([]);
    const [sectionAngle, setSectionAngle] = useState<any>([]);

    const [msSeparation, setMsSeparation] = useState(1000);
    const [separationNum, setSeparationNum] = useState(5);
    // const maxSectionFacePointRef = useRef(0);
    // const minSectionFacePointRef = useRef(0);
    // const maxSectionBlinkRef = useRef(0);
    // const minSectionBlinkRef = useRef(0);
    // const maxSectionYawRef = useRef(0);
    // const maxSectionPitchRef = useRef(0);
    // const maxSectionRollRef = useRef(0);

    useEffect(() => {
        if (cv) {
            cv.then((res: any) => {
                setCvnew(res);
            });
        }
    }, [cv]);

    useEffect(() => {
        if (start == true) {
            setInterval(() => {
                detect(faceapi, video, canvas1, canvas2, cvnew).then((res) => {
                    if (res === undefined) {
                        sectionFaceMove.push(
                            store.getState().maxFaceMoveReducer
                        );
                        sectionBlink.push(store.getState().maxBlinkReducer);
                        sectionAngle.push({
                            yaw: store.getState().maxYawReducer,
                            pitch: store.getState().maxPitchReducer,
                            roll: store.getState().maxRollReducer,
                        });
                    } else {
                        PreprocessingData(res, oldData);
                    }
                    dispatch({
                        type: "facePointSet",
                        face_point: res?.facePointAll,
                    });

                    oldData.push(res);
                    ConcentrationCalculation();
                });
            }, msSeparation);
        }
    }, [start]);

    const ConcentrationCalculation = () => {
        if (sectionFaceMove.length >= separationNum) {
            const PointSum = sectionFaceMove.reduce(
                (sum: any, value: any) => sum + value,
                0
            );
            console.log("pointSum: " + PointSum.toString());
            const BlinkSum = sectionBlink.reduce(
                (sum: any, value: any) => sum + (value == true ? 1 : 0),
                0
            );

            if (frequency === "max") {
                if (
                    store.getState().maxFaceMoveReducer < PointSum ||
                    store.getState().maxFaceMoveReducer === null
                ) {
                    dispatch({
                        type: "maxFaceMoveSet",
                        maxFaceMove: PointSum,
                    });
                }

                if (
                    store.getState().maxBlinkReducer < BlinkSum ||
                    store.getState().maxBlinkReducer === null
                )
                    dispatch({
                        type: "maxBlinkSet",
                        maxBlink: BlinkSum,
                    });
            }
            if (frequency == "min") {
                if (
                    store.getState().minFaceMoveReducer > PointSum ||
                    store.getState().minFaceMoveReducer === null
                ) {
                    dispatch({
                        type: "minFaceMoveSet",
                        minFaceMove: PointSum,
                    });
                }

                if (
                    store.getState().minBlinkReducer > BlinkSum ||
                    store.getState().minBlinkReducer === null
                )
                    dispatch({
                        type: "minBlinkSet",
                        minBlink: BlinkSum,
                    });
            }

            if (frequency == null) {
                let yawSum = 0;
                let pitchSum = 0;
                let rollSum = 0;
                sectionAngle.forEach((value: any) => {
                    yawSum += value.yaw;
                    pitchSum += value.pitch;
                    rollSum += value.roll;
                });

                const c1 = getConcentration(
                    BlinkSum,
                    store.getState().maxBlinkReducer,
                    store.getState().minBlinkReducer
                );

                const c2 = getConcentration(
                    PointSum,
                    store.getState().maxFaceMoveReducer - 100,
                    store.getState().minFaceMoveReducer
                );

                const w = getWeight(yawSum, pitchSum, rollSum, separationNum);
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
                        face_point: store.getState().facePointReducer,
                    },
                });
                console.log(store.getState().concReducer);
            }
            sectionFaceMove.shift();
            sectionAngle.shift();
            sectionBlink.shift();
        }
    };

    const PreprocessingData = (newData: any, oldData: any) => {
        if (oldData.length > 0 && oldData.slice(-1)[0] !== undefined) {
            let AllPointSum = 0;
            for (var i = 0; i < oldData.slice(-1)[0]["facePoint"].length; i++) {
                AllPointSum += difference(
                    oldData.slice(-1)[0]["facePoint"][i],
                    newData.facePoint[i]
                );
            }
            // console.log(AllPointSum);
            sectionFaceMove.push(AllPointSum);
            const blinkBool = blinkCount(
                newData.ear.left,
                newData.ear.right,
                0.25,
                0.25
            );
            sectionBlink.push(blinkBool);
            sectionAngle.push(newData.angle);
        }
    };

    return <div></div>;
};

export default ConcentrationEstimateComponent;
