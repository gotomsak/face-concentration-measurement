import React, { useState, useEffect, useRef } from "react";
import WebCameraComponent from "../components/WebCameraComponent";
import { makeStyles, styled, Button, TextField } from "@material-ui/core";
import ConcentrationViewComponent from "../components/ConcentrationViewComponent";
import { getSaveImagesID } from "../apis/backendAPI/getSaveImagesID";
import Autocomplete from "@material-ui/lab/Autocomplete";
import ChartViewComponent from "../components/ChartViewComponent";
import { OpenCvProvider, useOpenCv } from "opencv-react";
import { useHistory } from "react-router";
import * as faceapi from "face-api.js";
import store from "..";
import { Conc } from "../reducers/concReducer";
import { postConcentration } from "../apis/backendAPI/postConcentration";
import { getID } from "../apis/backendAPI/getID";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import AssignmentIcon from "@material-ui/icons/Assignment";
import Tooltip from "@material-ui/core/Tooltip";
import CopyToClipBoard from "react-copy-to-clipboard";
import { RecordingPageStyle, RecordingPageButton } from "../Styles";
import { getFrequency } from "../apis/backendAPI/frequency/getFrequency";
import SetFrequencyComponent from "../components/utils/SetFrequencyComponent";
import { useDispatch } from "react-redux";
import { solvedIDsReducer } from "../reducers/learning/solvedIDsReducer";
import { concIDReducer } from "../reducers/concIDReducer";
import { postConcentSplitSave } from "../apis/backendAPI/postConcentSplitSave";
import ConcentTextViewComponent from "../components/ConcentTextViewComponent";
import Checkbox from "@material-ui/core/Checkbox";
import { GetEar } from "../apis/backendAPI/ear/interfaces";
import { getEar } from "../apis/backendAPI/ear/getEar";
import SetEarComponent from "../components/utils/SetEarComponent";
import { getEnvironment } from "../apis/backendAPI/environment/getEnvironment";
import SetEnvironment from "../components/utils/SetEnvironment";
import { GetEnvironment } from "../apis/backendAPI/environment/interfaces";
import Box from "@material-ui/core/Box";
import { ClassNameMap } from "@material-ui/core/styles/withStyles";

const RecordingPage: React.FC = (props: any) => {
    const [start, setStart] = useState(false);
    const dispatch = useDispatch();
    const [stop, setStop] = useState(false);
    const [openTip, setOpenTip] = useState<boolean>(false);
    const [downloadData, setDownloadData] = useState<boolean>(false);
    const [environments, setEnvironments] = useState<GetEnvironment[]>([]);
    const [id, setID] = useState<string>("idを発行してください");
    // const [ears, setEars] = useState<GetEar[]>([]);
    // const [frequencys, setFrequencys] = useState<any>();
    const [viewC3, setViewC3] = useState(0);
    const [viewC2, setViewC2] = useState(0);
    const [viewC1, setViewC1] = useState(0);
    const [viewW, setViewW] = useState(0);
    const [intervalID, setIntervalID] = useState<NodeJS.Timeout>();
    const history = useHistory();
    // const [work, setWork] = useState([
    //     {
    //         type: "other",
    //     },
    //     {
    //         type: "tetsuoSys",
    //     },
    // ]);

    const [work, setWork] = useState("");
    const [memo, setMemo] = useState("");

    const [typeParam, setTypeParam] = useState("gotoSys");

    useEffect(() => {
        getEnvironment().then((res) => {
            // console.log(res);
            setEnvironments(res.data.environments);
        });
    }, []);

    const handleCloseTip = (): void => {
        setOpenTip(false);
    };
    const handleClickButton = (): void => {
        setOpenTip(true);
    };
    const downloadDataHandleChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setDownloadData(event.target.checked);
    };

    const createID = () => {
        getID({
            type: typeParam,
            work: work,
            memo: memo,
            measurement: "gotoConc",
            user_id: Number(localStorage.getItem("user_id")),
            concentration: store.getState().concReducer,
        }).then((res) => {
            console.log(res);
            console.log(res.data.conc_id);
            console.log(res.data.face_point_id);
            setID(res.data.conc_id);
            dispatch({
                type: "concIDSet",
                conc_id: res.data.conc_id,
            });
            dispatch({
                type: "facePointIDSet",
                face_point_id: res.data.face_point_id,
            });
        });
        // console.log(store.getState().facePointIDReducer);
        // console.log(store.getState().concIDReducer);
        console.log(typeParam);
    };

    const classes: ClassNameMap = RecordingPageStyle();
    const recordButton = () => {
        if (stop === true) {
            return (
                <div>
                    <RecordingPageButton
                        onClick={() => {
                            sendConcentSplit();
                        }}
                    >
                        メモの追記の送信
                    </RecordingPageButton>
                    <RecordingPageButton
                        onClick={() => {
                            history.push("/");
                        }}
                    >
                        topに戻る
                    </RecordingPageButton>
                </div>
            );
        }
        if (start === false) {
            return (
                <RecordingPageButton
                    onClick={() => {
                        setStart(true);
                        setStop(false);
                        setIntervalID(setInterval(sendConcentSplit, 10000));
                    }}
                >
                    開始
                </RecordingPageButton>
            );
        }
        if (start === true) {
            return (
                <RecordingPageButton
                    onClick={() => {
                        setStart(false);
                        setStop(true);
                        clearInterval(Number(intervalID));
                        sendConcentSplit();
                    }}
                >
                    停止
                </RecordingPageButton>
            );
        }
    };

    const sendConcentSplit = () => {
        postConcentSplitSave({
            type: typeParam,
            measurement: "gotoConc",
            concentration: store.getState().concReducer,
            memo: memo,
            id: id,
        }).then((res: any) => {
            console.log(res);
            dispatch({
                type: "concReset",
            });
        });
    };

    const sendConcentration = () => {
        console.log(store.getState().concReducer);
        if (stop === true) {
            postConcentration({
                type: typeParam,
                work: work,
                memo: memo,
                measurement: "gotoConc",
                user_id: Number(localStorage.getItem("user_id")),
                id: id,
                concentration: store.getState().concReducer,
            }).then((res: any) => {
                console.log(res);
                dispatch({
                    type: "concReset",
                });
            });
            setStart(false);
            setStop(false);
        }
    };

    const sendButtonVisible = () => {
        if (stop === true) {
            return (
                <RecordingPageButton onClick={sendConcentration}>
                    集中度送信
                </RecordingPageButton>
            );
        }
        return;
    };

    return (
        <div className={classes.root}>
            <WebCameraComponent
                start={start}
                stop={stop}
                frequency={null}
                ear={false}
                downloadData={downloadData}
            ></WebCameraComponent>

            <div className={classes.fID}>
                <ConcentTextViewComponent></ConcentTextViewComponent>
            </div>

            <div className={classes.tID}>
                <div className={classes.fID}>
                    {/* <div className={classes.tID}> */}
                    <TextField
                        label="作業名"
                        variant="outlined"
                        value={work}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setWork(e.target.value);
                        }}
                    ></TextField>
                </div>

                <div className={classes.fID}>
                    <SetEnvironment
                        environments={environments}
                        reFreq={false}
                    ></SetEnvironment>
                </div>

                <div className={classes.fID}>
                    <div className={classes.rBPB}>
                        <RecordingPageButton onClick={createID}>
                            id発行
                        </RecordingPageButton>
                    </div>
                    <FormControl variant="outlined">
                        <OutlinedInput
                            type="text"
                            value={id}
                            endAdornment={
                                <InputAdornment position="end">
                                    <Tooltip
                                        arrow
                                        open={openTip}
                                        onClose={handleCloseTip}
                                        disableHoverListener
                                        placement="top"
                                        title="Copied!"
                                    >
                                        <CopyToClipBoard text={id}>
                                            <IconButton
                                                disabled={id === ""}
                                                onClick={handleClickButton}
                                            >
                                                <AssignmentIcon />
                                            </IconButton>
                                        </CopyToClipBoard>
                                    </Tooltip>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                </div>
            </div>
            <div className={classes.fID}>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={downloadData}
                            onChange={downloadDataHandleChange}
                            inputProps={{
                                "aria-label": "primary checkbox",
                            }}
                        />
                    }
                    label="動画ダウンロード"
                />
            </div>

            <div className={classes.fID}>{recordButton()}</div>
            <div className={classes.fID}>
                <div className={classes.textFieldMemo}>
                    <TextField
                        multiline
                        label="メモ"
                        variant="outlined"
                        value={memo}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setMemo(e.target.value);
                        }}
                    />
                </div>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => {
                        const date = new Date();
                        // 書き起こすと日本時間になるのでdate.setHours(date.getHours() + 9);はしない
                        if (memo === "") {
                            setMemo(date.toString());
                        } else {
                            setMemo(memo + "\n" + date.toString());
                        }
                    }}
                >
                    timestamp
                </Button>
            </div>
        </div>
    );
};

export default RecordingPage;
