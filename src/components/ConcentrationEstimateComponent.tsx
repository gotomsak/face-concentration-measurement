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
// import opencv from "./opencv/opencv.js";

const ConcentrationEstimateComponent: React.FC<{
    video: any;
    canvas1: any;
    canvas2: any;
    start: any;
    faceapi: any;
}> = ({ video, canvas1, canvas2, start, faceapi }) => {
    // const [cv, setCv] = useState(document.createElement("script"));
    // const {loaded, cv}= useOpenCv();
    // const data = useOpenCv();

    const { loaded, cv } = useOpenCv();
    const [cvnew, setCvnew] = useState();
    const [oldData, setOldData] = useState<any>([]);
    const [newData, setNewData] = useState<any>({});
    // const [AllData, setAllData] = useState<any>([])
    const [sectionBlink, setSectionBlink] = useState<any>([]);
    const [sectionFacePoint, setSectionFacePoint] = useState<any>([]);
    const [sectionAngle, setSectionAngle] = useState<any>([]);
    // const [oldFacePoint, setOldFacePoint] = useState();
    // const [oldBlink, setOldBlink] = useState()
    const [maxSectionBlink, setMaxSectionBlink] = useState(0);
    const [minSectionBlink, setMinSectionBlink] = useState(0);
    const [maxSectionFacePoint, setMaxSectionFacePoint] = useState(0);
    const [minSectionFacePoint, setMinSectionFacePoint] = useState(0);
    const [maxSectionAngle, setMaxSectionAngle] = useState(0);
    const [msSeparation, setMsSeparation] = useState(5000);
    const [separationNum, setSeparationNum] = useState(5);
    const [finalConcentration, setFinalConcentration] = useState<any>();

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
                detect(faceapi, video, canvas1, canvas2, cvnew)
                    .then((res) => {
                        console.log(res);
                        setNewData(res);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }, msSeparation);
        }
    }, [start]);

    useEffect(() => {
        console.log(newData);
        console.log(oldData);

        if (oldData.length > 0) {
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
        if (start == true) {
            oldData.push(newData);
            console.log("updateOld");
        }
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
            sectionFacePoint.shift();
            const BlinkSum = sectionBlink.reduce(
                (sum: any, value: any) => sum + (value == true ? 1 : 0),
                0
            );
            if (minSectionBlink > BlinkSum) setMinSectionBlink(BlinkSum);
            if (maxSectionBlink < BlinkSum) setMaxSectionBlink(BlinkSum);
            sectionBlink.shift();
            let yawSum = 0;
            let pitchSum = 0;
            let rollSum = 0;
            sectionAngle.forEach((value: any) => {
                yawSum += value.yaw;
                pitchSum += value.pitch;
                rollSum += value.roll;
            });
            sectionAngle.shift();
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
            setFinalConcentration(c3);
            console.log(PointSum);
            console.log(BlinkSum);
            console.log(w);
            console.log(c1);
            console.log(c2);
            console.log(c3);
        }
    }, [newData]);

    useEffect(() => {
        console.log(finalConcentration);
    }, [finalConcentration]);
    const updateOldData = (data: any) => {
        // setOldData((old: any) => old.concat(data));
        oldData.push(data);
    };
    const ConcentrationCalculation = (data: any) => {};
    const PreprocessingData = () => {};
    // const onLoaded = (cv: any) => {
    //     console.log("opencv loaded, cv");
    //     setCv(cv);
    // };
    return <div></div>;
    // return (
    //     <OpenCvProvider
    //         onLoad={onLoaded}
    //         openCvPath="./opencv.js"
    //     ></OpenCvProvider>
    // );
    // return start;
};

export default ConcentrationEstimateComponent;
