export const detectPoints = [
    // nose
    ...[0.0, 0.0, 0.0],
    // jaw
    ...[0, -330, -65],
    // left eye
    ...[-240, 170, -135],
    // right eye
    ...[240, 170, -135],
    // left mouth
    ...[-150, -150, -125],
    // right mouth
    ...[150, -150, -125],
    // left outline
    ...[-480, 170, -340],
    // right outline
    ...[480, 170, -340],
];

export function solve(
    {
        nose,
        leftEye,
        rightEye,
        jaw,
        leftMouth,
        rightMouth,
        leftOutline,
        rightOutline,
    }: any,
    cv: any
) {
    const rows = detectPoints.length / 3;
    console.log(cv)
    const modelPoints = cv.matFromArray(rows, 3, cv.CV_64FC1, detectPoints);
    console.log(modelPoints)
    // camera matrix
    const size = {
        width: 640,
        height: 480,
    };
    const center = [size.width / 2, size.height / 2];
    const cameraMatrix = cv.matFromArray(3, 3, cv.CV_64FC1, [
        ...[size.width, 0, center[0]],
        ...[0, size.width, center[1]],
        ...[0, 0, 1],
    ]);
    console.log(cameraMatrix.data64F)
    // image matrix
    const imagePoints = cv.Mat.zeros(rows, 2, cv.CV_64FC1);
    const distCoeffs = cv.Mat.zeros(4, 1, cv.CV_64FC1);
    const rvec = new cv.Mat({ width: 1, height: 3 }, cv.CV_64FC1);
    const tvec = new cv.Mat({ width: 1, height: 3 }, cv.CV_64FC1);

    let cnt = 0;
    [
        nose,
        jaw,
        leftEye,
        rightEye,
        leftMouth,
        rightMouth,
        leftOutline,
        rightOutline,
    ].map((v, i) => {

        imagePoints.data64F[cnt] = v["x"];
        imagePoints.data64F[cnt+1] = v["y"];
        cnt += 2
    });
    console.log(imagePoints)

    // 移動ベクトルと回転ベクトルの初期値を与えることで推測速度の向上をはかる
    tvec.data64F[0] = -100;
    tvec.data64F[1] = 100;
    tvec.data64F[2] = 1000;
    const distToLeftEyeX = Math.abs(leftEye[0] - nose[0]);
    const distToRightEyeX = Math.abs(rightEye[0] - nose[0]);
    if (distToLeftEyeX < distToRightEyeX) {
        // 左向き
        rvec.data64F[0] = -1.0;
        rvec.data64F[1] = -0.75;
        rvec.data64F[2] = -3.0;
    } else {
        // 右向き
        rvec.data64F[0] = 1.0;
        rvec.data64F[1] = -0.75;
        rvec.data64F[2] = -3.0;
    }

    const success = cv.solvePnP(
        modelPoints,
        imagePoints,
        cameraMatrix,
        distCoeffs,
        rvec,
        tvec,
        true
    );
    console.log(modelPoints.data64F)
    console.log(imagePoints.data64F)
    console.log(cameraMatrix.data64F)
    console.log(distCoeffs.data64F)
    console.log(rvec.data64F)
    console.log(tvec.data64F)

    return {
        success,
        imagePoints,
        cameraMatrix,
        distCoeffs,
        rvec, // 回転ベクトル
        tvec, // 移動ベクトル
    };
}