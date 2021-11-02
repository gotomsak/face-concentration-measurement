import { ear } from "./ear";
import { headpose } from "./headpose";
import { solve } from "./solve";
import * as faceapi from "face-api.js";

export const onlyFacePointDetect = (landmarks: any, angle: any) => {
    if (landmarks[2] === null) {
        return null;
    }

    const ReLandmarks = landmarks.filter((v: any) => {
        if (v["Key"] === "_positions") {
            return v["Value"];
        }
    });

    const positions = ReLandmarks[0]["Value"].map((v: any) => {
        return v.reduce(
            (obj: any, item: any) => ({ ...obj, [item.Key]: item.Value }),
            {}
        );
    });
    const angleData = angle.reduce(
        (obj: any, item: any) => ({ ...obj, [item.Key]: item.Value }),
        {}
    );
    // console.log(positions);
    // console.log(angleData);
    const nose = positions[30];
    const leftEye = positions[36];
    const rightEye = positions[45];
    const jaw = positions[8];
    const leftMouth = positions[48];
    const rightMouth = positions[54];
    const leftOutline = positions[0];
    const rightOutline = positions[16];
    const leftEyeAll = positions.slice(36, 42);
    const rightEyeAll = positions.slice(42, 48);

    const resel = ear(leftEyeAll);
    const reser = ear(rightEyeAll);

    // console.log(reser)

    return {
        facePoint: [
            nose,
            jaw,
            leftEye,
            rightEye,
            leftMouth,
            rightMouth,
            leftOutline,
            rightOutline,
        ],
        ear: { left: resel, right: reser },
        angle: angleData,
        facePointAll: landmarks,
    };
};
