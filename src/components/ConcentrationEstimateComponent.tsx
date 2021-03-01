import React, { useState, useEffect } from "react";
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

    const [maxSectionBlink, setMaxSectionBlink] = useState(0);
    const [minSectionBlink, setMinSectionBlink] = useState(0);
    const [maxSectionFacePoint, setMaxSectionFacePoint] = useState(0);
    const [minSectionFacePoint, setMinSectionFacePoint] = useState(0);
    const [maxSectionYaw, setMaxSectionYaw] = useState(0);
    const [maxSectionPitch, setMaxSectionPitch] = useState(0);
    const [maxSectionRoll, setMaxSectionRoll] = useState(0);
    const [msSeparation, setMsSeparation] = useState(5000);
    const [separationNum, setSeparationNum] = useState(5);

    useEffect(() => {
        if (cv) {
            cv.then((res: any) => {
                console.log(res);
                setCvnew(res);
            });
        }
    }, [cv]);

    useEffect(() => {
        if (start == true) {
            setInterval(() => {
                detect(faceapi, video, canvas1, canvas2, cvnew).then((res) => {
                    if (res === undefined) {
                        console.log(res);
                        sectionFacePoint.push(maxSectionFacePoint);
                        sectionBlink.push(maxSectionBlink);
                        sectionAngle.push({
                            yaw: maxSectionYaw,
                            pitch: maxSectionPitch,
                            roll: maxSectionRoll,
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
            console.log(sectionFacePoint);
            const PointSum = sectionFacePoint.reduce(
                (sum: any, value: any) => sum + value,
                0
            );

            if (minSectionFacePoint > PointSum || minSectionFacePoint === 0)
                setMinSectionFacePoint(PointSum);
            if (maxSectionFacePoint < PointSum)
                setMaxSectionFacePoint(PointSum);

            const BlinkSum = sectionBlink.reduce(
                (sum: any, value: any) => sum + (value == true ? 1 : 0),
                0
            );
            if (minSectionBlink > BlinkSum) setMinSectionBlink(BlinkSum);
            if (maxSectionBlink < BlinkSum) setMaxSectionBlink(BlinkSum);

            let yawSum = 0;
            let pitchSum = 0;
            let rollSum = 0;
            sectionAngle.forEach((value: any) => {
                yawSum += value.yaw;
                pitchSum += value.pitch;
                rollSum += value.roll;
            });
            if (maxSectionYaw < yawSum) setMaxSectionYaw(yawSum);
            if (maxSectionPitch < pitchSum) setMaxSectionPitch(pitchSum);
            if (maxSectionRoll < rollSum) setMaxSectionRoll(rollSum);

            const c1 = getConcentration(
                BlinkSum,
                maxSectionBlink,
                minSectionBlink
            );
            const c2 = getConcentration(
                PointSum,
                maxSectionFacePoint,
                minSectionFacePoint
            );

            const w = getWeight(yawSum, pitchSum, rollSum, separationNum);
            const c3 = getConcentrationSynthesis(c1, c2, w);

            dispatch({
                type: "concSet",
                conc: { c1: c1, c2: c2, w: w, c3: c3 },
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
            sectionFacePoint.push(AllPointSum);
            console.log(newData.ear.left);
            console.log(newData.ear.right);
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
