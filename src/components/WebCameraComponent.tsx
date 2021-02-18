import React, {
    useState,
    useEffect,
    useRef,
    createRef,
    RefObject,
} from "react";
import ConcentrationEstimateComponent from "./ConcentrationEstimateComponent";

const WebCameraComponent: React.FC<{
    start: boolean;
    stop: boolean;
    setBlobData: any;
    setWebSocketData: any;
    method1: boolean;
    method2: boolean;
    sendData?: any;
    webSocket: any;
    webSocketInit: any;
}> = ({
    start,
    stop,
    setBlobData,
    setWebSocketData,
    method1,
    method2,
    sendData,
    webSocket,
    webSocketInit,
}) => {
    const videoRef = createRef<HTMLVideoElement>();
    const [video, setVideo] = useState<HTMLVideoElement>();
    const [check, setCheck] = useState(0);
    const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
    const [recorder, setRecorder] = useState<MediaRecorder | null>(null);

    const [streamState, setStreamState] = useState<MediaStream | null>(null);

    // refをstateにセット？
    useEffect(() => {
        if (videoRef.current !== null) {
            setCheck(1);
            setVideo(videoRef.current!);
        }
        console.log(videoRef.current);
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

    // // MediaRecorderが更新されるたび，blob配列にdataを保存
    // useEffect(() => {
    //     if (recorder !== null) {
    //         recorder!.ondataavailable = (e) => {
    //             recordedChunks.push(e.data);
    //         };
    //     }
    // }, [recorder]);

    // start時にn秒おきに同時にwebsocketで画像を送信
    useEffect(() => {
        // { blob: getCanvasData(), data: sendData }.toString()
        if (start === true) {
            recorder!.start(200);
            if (method1 == true) {
                webSocketInit();
            }

            setInterval(() => {
                if (method1 == true) {
                    webSocket!.send(getCanvasData());
                }
            }, 500);
        }
    }, [start]);

    // stop時にe-learning中の動画を取得，保存
    useEffect(() => {
        if (stop === true) {
            webSocket!.close();
            // webSocket2!.close();
            setBlobData(getBlobData());
            streamState?.getTracks()[0].stop();
            recorder!.stop();
        }
    }, [stop]);

    // webカメラの初期化
    const webCameraInit = async () => {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            return await navigator.mediaDevices.getUserMedia({
                video: { width: 352, height: 288 },
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

    // 画像をbase64で取得
    const getCanvasData = () => {
        const canvas: HTMLCanvasElement = document.createElement("canvas");
        canvas.width = video!.offsetWidth;
        canvas.height = video!.offsetHeight;
        canvas
            .getContext("2d")!
            .drawImage(video!, 0, 0, video!.offsetWidth, video!.offsetHeight);
        const base64 = canvas.toDataURL("image/png");
        return base64;
    };

    return (
        <div className="WebCameraContainer">
            <ConcentrationEstimateComponent
                video={video}
            ></ConcentrationEstimateComponent>
            <video ref={videoRef} id="video" autoPlay></video>
        </div>
    );
};
export default WebCameraComponent;
