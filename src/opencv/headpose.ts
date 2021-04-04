export function headpose(
    { rvec, tvec, cameraMatrix, distCoeffs, imagePoints }: any,
    cv: any,
    canvas: HTMLCanvasElement
) {
    const noseEndPoint2DZ = new cv.Mat();
    const noseEndPoint2DY = new cv.Mat();
    const noseEndPoint2DX = new cv.Mat();

    const pointZ = cv.matFromArray(1, 3, cv.CV_64FC1, [0.0, 0.0, 500.0]);
    const pointY = cv.matFromArray(1, 3, cv.CV_64FC1, [0.0, 500.0, 0.0]);
    const pointX = cv.matFromArray(1, 3, cv.CV_64FC1, [500.0, 0.0, 0.0]);
    const jaco = new cv.Mat();

    cv.projectPoints(
        pointZ,
        rvec,
        tvec,
        cameraMatrix,
        distCoeffs,
        noseEndPoint2DZ,
        jaco
    );
    cv.projectPoints(
        pointY,
        rvec,
        tvec,
        cameraMatrix,
        distCoeffs,
        noseEndPoint2DY,
        jaco
    );
    cv.projectPoints(
        pointX,
        rvec,
        tvec,
        cameraMatrix,
        distCoeffs,
        noseEndPoint2DX,
        jaco
    );

    // const canvas2 = document.getElementById('canvas2') as HTMLCanvasElement;
    const context: CanvasRenderingContext2D = canvas.getContext("2d")!;

    const position = {
        nose: {
            x: imagePoints.data64F[0],
            y: imagePoints.data64F[1],
        },
        x: {
            x: noseEndPoint2DX.data64F[0],
            y: noseEndPoint2DX.data64F[1],
        },
        y: {
            x: noseEndPoint2DY.data64F[0],
            y: noseEndPoint2DY.data64F[1],
        },
        z: {
            x: noseEndPoint2DZ.data64F[0],
            y: noseEndPoint2DZ.data64F[1],
        },
    };

    context.clearRect(0, 0, canvas.width, canvas.height);

    context.beginPath();
    context.lineWidth = 2;
    context.strokeStyle = "rgb(255, 0, 0)";
    context.moveTo(position.nose.x, position.nose.y);
    context.lineTo(position.z.x, position.z.y);
    context.stroke();
    context.closePath();

    context.beginPath();
    context.lineWidth = 2;
    context.strokeStyle = "rgb(0, 0, 255)";
    context.moveTo(position.nose.x, position.nose.y);
    context.lineTo(position.x.x, position.x.y);
    context.stroke();
    context.closePath();

    context.beginPath();
    context.lineWidth = 2;
    context.strokeStyle = "rgb(0, 255, 0)";
    context.moveTo(position.nose.x, position.nose.y);
    context.lineTo(position.y.x, position.y.y);
    context.stroke();
    context.closePath();

    const rmat = new cv.Mat();
    cv.Rodrigues(rvec, rmat);
    const projectMat = cv.Mat.zeros(3, 4, cv.CV_64FC1);
    projectMat.data64F[0] = rmat.data64F[0];
    projectMat.data64F[1] = rmat.data64F[1];
    projectMat.data64F[2] = rmat.data64F[2];
    projectMat.data64F[4] = rmat.data64F[3];
    projectMat.data64F[5] = rmat.data64F[4];
    projectMat.data64F[6] = rmat.data64F[5];
    projectMat.data64F[8] = rmat.data64F[6];
    projectMat.data64F[9] = rmat.data64F[7];
    projectMat.data64F[10] = rmat.data64F[8];

    const cmat = new cv.Mat();
    const rotmat = new cv.Mat();
    const travec = new cv.Mat();
    const rotmatX = new cv.Mat();
    const rotmatY = new cv.Mat();
    const rotmatZ = new cv.Mat();
    const eulerAngles = new cv.Mat();

    cv.decomposeProjectionMatrix(
        projectMat,
        cmat,
        rotmat,
        travec,
        rotmatX,
        rotmatY,
        rotmatZ,
        eulerAngles
    );
    // 顔の角度情報
    return {
        yaw: eulerAngles.data64F[1],
        pitch: eulerAngles.data64F[0],
        roll: eulerAngles.data64F[2],
    };
}

export const getWeight = (
    yaw: any,
    pitch: any,
    roll: any,
    separationNum: any
) => {
    const pitchThreshold = 12.5;
    const yawThreshold = 20;
    const rollThreshold = 15;
    return Math.abs(
        1 -
            (Math.abs(yaw / (yawThreshold * separationNum)) +
                Math.abs(Math.abs(pitch) - 170 * separationNum) /
                    (pitchThreshold * separationNum) +
                Math.abs(roll / (rollThreshold * separationNum))) /
                3
    );
};
