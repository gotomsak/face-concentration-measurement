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
}> = ({ video, canvas1, canvas2, start, faceapi }) => {
    const dispatch = useDispatch();

    const { loaded, cv } = useOpenCv();
    const [cvnew, setCvnew] = useState();
    const [oldData, setOldData] = useState<any>([]);

    const [sectionBlink, setSectionBlink] = useState<any>([]);
    const [sectionFacePoint, setSectionFacePoint] = useState<any>([]);
    const [sectionAngle, setSectionAngle] = useState<any>([]);

    const [msSeparation, setMsSeparation] = useState(1000);
    const [separationNum, setSeparationNum] = useState(5);
    const maxSectionFacePointRef = useRef(0);
    const minSectionFacePointRef = useRef(0);
    const maxSectionBlinkRef = useRef(0);
    const minSectionBlinkRef = useRef(0);
    const maxSectionYawRef = useRef(0);
    const maxSectionPitchRef = useRef(0);
    const maxSectionRollRef = useRef(0);

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
                        sectionFacePoint.push(maxSectionFacePointRef.current);
                        sectionBlink.push(maxSectionBlinkRef.current);
                        sectionAngle.push({
                            yaw: maxSectionYawRef.current,
                            pitch: maxSectionPitchRef.current,
                            roll: maxSectionRollRef.current,
                        });
                    } else {
                        PreprocessingData(res, oldData);
                    }
                    oldData.push(res);
                    ConcentrationCalculation();
                });
            }, msSeparation);
        }
    }, [start]);

    const ConcentrationCalculation = () => {
        if (sectionFacePoint.length >= separationNum) {
            const PointSum = sectionFacePoint.reduce(
                (sum: any, value: any) => sum + value,
                0
            );

            if (
                minSectionFacePointRef.current > PointSum ||
                minSectionFacePointRef.current === 0
            )
                minSectionFacePointRef.current = PointSum;
            if (maxSectionFacePointRef.current < PointSum)
                maxSectionFacePointRef.current = PointSum;

            const BlinkSum = sectionBlink.reduce(
                (sum: any, value: any) => sum + (value == true ? 1 : 0),
                0
            );
            // if (minSectionBlinkRef.current > BlinkSum) setMinSectionBlink(BlinkSum);
            if (maxSectionBlinkRef.current < BlinkSum)
                maxSectionBlinkRef.current = BlinkSum;

            let yawSum = 0;
            let pitchSum = 0;
            let rollSum = 0;
            sectionAngle.forEach((value: any) => {
                yawSum += value.yaw;
                pitchSum += value.pitch;
                rollSum += value.roll;
            });
            if (maxSectionYawRef.current < yawSum)
                maxSectionYawRef.current = yawSum;
            if (maxSectionPitchRef.current < pitchSum)
                maxSectionPitchRef.current = pitchSum;
            if (maxSectionRollRef.current < rollSum)
                maxSectionRollRef.current = rollSum;

            const c1 = getConcentration(
                BlinkSum,
                maxSectionBlinkRef.current,
                minSectionBlinkRef.current
            );

            const c2 = getConcentration(
                PointSum,
                maxSectionFacePointRef.current,
                minSectionFacePointRef.current
            );

            const w = getWeight(yawSum, pitchSum, rollSum, separationNum);
            const c3 = getConcentrationSynthesis(c1, c2, w);
            const date = new Date();

            dispatch({
                type: "concSet",
                conc: { c1: c1, c2: c2, w: w, c3: c3, date: date },
            });
            console.log(store.getState().concReducer);
            sectionFacePoint.shift();
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
            sectionFacePoint.push(AllPointSum);
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
