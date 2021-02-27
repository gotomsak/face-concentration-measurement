import React, {
    useState,
    useEffect,
    useRef,
    createRef,
    RefObject,
} from "react";
import ConcentrationEstimateComponent from "./ConcentrationEstimateComponent";
import { OpenCvProvider, useOpenCv } from "opencv-react";
import * as faceapi from "face-api.js";
import { Button, makeStyles, styled } from "@material-ui/core";

const WebCameraComponent: React.FC<{
    start: boolean;
    stop: boolean;
    method: boolean;
}> = ({ start, stop, method }) => {
    const videoRef = createRef<HTMLVideoElement>();
    const canvas1Ref = createRef<HTMLCanvasElement>();
    const canvas2Ref = createRef<HTMLCanvasElement>();
    const [video, setVideo] = useState<HTMLVideoElement>();
    const [check, setCheck] = useState(0);
    const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
    const [recorder, setRecorder] = useState<MediaRecorder | null>(null);
    const [canvas1, setCanvas1] = useState<HTMLCanvasElement>();
    const [canvas2, setCanvas2] = useState<HTMLCanvasElement>();
    const [streamState, setStreamState] = useState<MediaStream | null>(null);
    // refをstateにセット？
    useEffect(() => {
        if (videoRef.current !== null) {
            setCheck(1);
            setVideo(videoRef.current!);
        }
        if (canvas1Ref.current !== null) {
            setCanvas1(canvas1Ref.current!);
        }
        if (canvas2Ref.current !== null) {
            setCanvas2(canvas2Ref.current!);
        }
        console.log(videoRef.current);
    }, []);

    const onLoaded = (cv: any) => {
        console.log("opencv loaded, cv");
        // setCv(cv);
    };
    const useStyles = makeStyles({
        video: {
            height: "480px",
        },
        WebCameraContainer: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
        },
        canvas1: {
            // transform: "scaleZ(-1)",
            zIndex: 1,
            position: "absolute",
        },
    });
    const classes = useStyles();

    useEffect(() => {
        faceapi.nets.tinyFaceDetector
            .loadFromUri("models/weights")
            .then((res: any) => {
                console.log(res);
            })
            .catch((err: any) => {
                console.log(err);
            });
        faceapi.nets.faceLandmark68TinyNet
            .loadFromUri("models/weights")
            .then((res: any) => {
                console.log(res);
            })
            .catch((err: any) => {
                console.log(err);
            });
    }, []);

    // レンダリング時にレコーダーをセット？
    useEffect(() => {
        console.log("check");
        console.log(videoRef);
        if (check == 1) {
            webCameraInit().then((stream) => {
                video!.srcObject = stream!;
                setStreamState(stream!);
                setRecorder(
                    new MediaRecorder(stream!, {
                        mimeType: "video/webm",
                    })
                );
            });
        }
    }, [check]);

    // start時にn秒おきに同時にwebsocketで画像を送信
    useEffect(() => {
        if (start === true) {
            recorder!.start(200);
            if (method == true) {
            }
        }
    }, [start]);

    // stop時にe-learning中の動画を取得，保存
    useEffect(() => {
        if (stop === true) {
            streamState?.getTracks()[0].stop();
            recorder!.stop();
        }
    }, [stop]);

    // webカメラの初期化
    const webCameraInit = async () => {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            return await navigator.mediaDevices.getUserMedia({
                video: { width: 640, height: 480 },
            });
        }
    };

    // blobdataを取得
    const getBlobData = () => {
        const _chunks = recordedChunks.splice(0, recordedChunks.length); // バッファを空にする
        const b = new Blob(_chunks, {
            type: "video/mp4",
        });
        return b;
    };

    // // 画像をbase64で取得
    // const getCanvasData = () => {
    //     // const canvas: HTMLCanvasElement = document.createElement("canvas");
    //     // canvas.width = video!.offsetWidth;
    //     // canvas.height = video!.offsetHeight;
    //     canvas
    //         .getContext("2d")!
    //         .drawImage(video!, 0, 0, video!.offsetWidth, video!.offsetHeight);
    //     const base64 = canvas.toDataURL("image/png");
    //     return base64;
    // };

    return (
        <div className={classes.WebCameraContainer}>
            <OpenCvProvider onLoad={onLoaded} openCvPath="./opencv.js">
                <ConcentrationEstimateComponent
                    video={video}
                    canvas1={canvas1}
                    canvas2={canvas2}
                    start={start}
                    faceapi={faceapi}
                ></ConcentrationEstimateComponent>
                <video
                    ref={videoRef}
                    id="video"
                    autoPlay
                    className={classes.video}
                ></video>
                <canvas
                    id="canvas1"
                    className={classes.canvas1}
                    ref={canvas1Ref}
                ></canvas>
                <canvas
                    id="canvas2"
                    className={classes.canvas1}
                    ref={canvas2Ref}
                ></canvas>
            </OpenCvProvider>
        </div>
    );
};
export default WebCameraComponent;
