import { headpose } from "./headpose";
import { solve } from "./solve";

import { ear } from "./ear";

export async function detect(
    faceapi: any,
    video: any,
    canvas1: HTMLCanvasElement,
    canvas2: HTMLCanvasElement,
    cv: any
) {
    //  webカメラの映像から顔認識を行う
    const useTinyModel = true;
    const detection = await faceapi
        .detectSingleFace(
            video,
            new faceapi.TinyFaceDetectorOptions({
                inputSize: 160,
            })
        )
        .withFaceLandmarks(useTinyModel);

    if (!detection) {
        return;
    }
    // 認識データをリサイズ
    const resizedDetection = faceapi.resizeResults(detection, {
        width: video!.offsetWidth,
        height: video!.offsetHeight,
    });

    // ランドマークをキャンバスに描画
    // const canvas = document.getElementById("canvas1") as HTMLCanvasElement;
    canvas1.width = video!.offsetWidth;
    canvas1.height = video!.offsetHeight;
    canvas2.width = video!.offsetWidth;
    canvas2.height = video!.offsetHeight;
    canvas1
        .getContext("2d")!
        .clearRect(
            video!.left,
            video!.top,
            video!.offsetWidth,
            video!.offsetHeight
        );

    faceapi.draw.drawFaceLandmarks(canvas1, resizedDetection);

    // 以後使用するランドマーク座標
    const landmarks = resizedDetection.landmarks;
    const nose = landmarks.getNose()[3];
    const leftEye = landmarks.getLeftEye()[0];
    const rightEye = landmarks.getRightEye()[3];
    const jaw = landmarks.getJawOutline()[8];
    const leftMouth = landmarks.getMouth()[0];
    const rightMouth = landmarks.getMouth()[6];
    const leftOutline = landmarks.getJawOutline()[0];
    const rightOutline = landmarks.getJawOutline()[16];
    const leftEyeAll = landmarks.getLeftEye();
    const rightEyeAll = landmarks.getRightEye();

    const resel = ear(leftEyeAll);
    const reser = ear(rightEyeAll);
    // console.log(resel)
    // console.log(reser)
    const ress = solve(
        {
            nose,
            leftEye,
            rightEye,
            jaw,
            leftMouth,
            rightMouth,
            leftOutline,
            rightOutline,
        },
        cv
    );
    // console.log(ress.rvec)
    const rvec = ress.rvec;
    const tvec = ress.tvec;
    const cameraMatrix = ress.cameraMatrix;
    const distCoeffs = ress.distCoeffs;
    const imagePoints = ress.imagePoints;

    const resh = headpose(
        { rvec, tvec, cameraMatrix, distCoeffs, imagePoints },
        cv,
        canvas2
    );

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
        angle: resh,
    };
}
