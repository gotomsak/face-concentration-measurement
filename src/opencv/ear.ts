import { difference } from "./difference";

export function ear(eye: any) {
    const A = difference(eye[1], eye[5]);
    const B = difference(eye[2], eye[4]);
    const C = difference(eye[0], eye[3]);

    return Math.round(((A + B) / (2.0 * C)) * 1000) / 1000;
}

export const blinkCount = (
    leftEye: number,
    rightEye: number,
    leftEyeT: number,
    rightEyeT: number
) => {
    console.log("right: " + rightEye.toString());
    console.log("left: " + leftEye.toString());
    if (rightEye < rightEyeT && leftEye < leftEyeT) {
        console.log("mabatakisita");
        return true;
    }
    return false;
};

//閾値 = 開眼度の平均 - 標準偏差 - 0.05 <- 0.05はなし?
export const eyeT = (eye: any[]) => {
    const average =
        eye.reduce((previous: any, current: any) => {
            return previous + current;
        }) / eye.length;

    const squaredDifference: any[] = eye.map((current: any) => {
        const difference = current - average;
        return difference ** 2;
    });

    const variance =
        squaredDifference.reduce((previous: any, current: any) => {
            return previous + current;
        }) / eye.length;

    const standardDeviation = Math.sqrt(variance);

    return average - standardDeviation;
};
