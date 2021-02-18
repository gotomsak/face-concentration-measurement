import React, { useState, useEffect } from "react";
import { OpenCvProvider, useOpenCv } from "opencv-react";
import * as faceapi from "face-api.js";
// const faceapi: any = require("face-api.js");

const ConcentrationEstimateComponent: React.FC<{ video: any }> = ({
    video,
}) => {
    const data = useOpenCv();
    useEffect(() => {
        faceapi.nets.tinyFaceDetector.loadFromUri(
            "../../classification_tool/tiny_face_detector_model-shard1"
        );
        faceapi.nets.faceLandmark68TinyNet.loadFromUri(
            "../../classification_tool/shape_predictor_68_face_landmarks.dat"
        );
        console.log(data);
        detect();
    });
    async function detect() {
        requestAnimationFrame(detect);

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
            width: video.width,
            height: video.height,
        });

        // ランドマークをキャンバスに描画
        const canvas = document.getElementById("canvas1") as HTMLCanvasElement;
        canvas.getContext("2d")!.clearRect(0, 0, canvas.width, canvas.height);
        faceapi.draw.drawFaceLandmarks(canvas, resizedDetection);

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
    }

    return (
        <OpenCvProvider openCvPath="../../build_js/bin/opencv.js"></OpenCvProvider>
    );
};

export default ConcentrationEstimateComponent;
