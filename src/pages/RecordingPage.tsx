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

const RecordingPage: React.FC = () => {
    const [start, setStart] = useState(false);
    const dispatch = useDispatch();
    const [stop, setStop] = useState(false);
    const [openTip, setOpenTip] = useState<boolean>(false);

    const [id, setID] = useState<string>("idを発行してください");
    const [frequencys, setFrequencys] = useState<any>();
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
        getFrequency().then((res: any) => {
            setFrequencys(res);

            console.log(res);
        });
        store.subscribe(() => {
            console.log(store.getState().concReducer.c3.slice(-1)[0]);
            setViewC3(store.getState().concReducer.c3.slice(-1)[0]);
            setViewC2(store.getState().concReducer.c2.slice(-1)[0]);
            setViewC1(store.getState().concReducer.c1.slice(-1)[0]);
            setViewW(store.getState().concReducer.w.slice(-1)[0]);
        });
    }, []);

    console.log("nandeyanen");

    const handleCloseTip = (): void => {
        setOpenTip(false);
    };
    const handleClickButton = (): void => {
        setOpenTip(true);
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
        console.log(store.getState().facePointIDReducer);
        console.log(store.getState().concIDReducer);
        console.log(typeParam);
    };

    const classes = RecordingPageStyle();
    const recordButton = () => {
        if (stop === true) {
            return (
                <RecordingPageButton
                    onClick={() => {
                        history.push("/");
                    }}
                >
                    topに戻る
                </RecordingPageButton>
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
            ></WebCameraComponent>

            <p>
                <div className={classes.fID}>
                    <div className={classes.tID}>
                        <RecordingPageButton onClick={createID}>
                            id発行
                        </RecordingPageButton>
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
                        <TextField
                            label="作業名"
                            variant="outlined"
                            value={work}
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => {
                                setWork(e.target.value);
                            }}
                        ></TextField>

                        <TextField
                            label="メモ"
                            variant="outlined"
                            value={memo}
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => {
                                setMemo(e.target.value);
                            }}
                        ></TextField>

                        {/* <TextField value={id} variant="outlined" /> */}
                        {/* <div className={classes.tID}>{id}</div> */}
                        {/* <Autocomplete
                            id="combo-box-demo"
                            options={works}
                            getOptionLabel={(option) => option.type}
                            style={{ width: 300 }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="システムの選択"
                                    variant="outlined"
                                />
                            )}
                            onInputChange={(e, value) => {
                                console.log(value);
                                setWork(value);
                            }}
                        /> */}
                    </div>
                </div>
            </p>

            <p>
                <div className={classes.fID}>
                    {frequencys ? (
                        <SetFrequencyComponent
                            frequencys={frequencys}
                        ></SetFrequencyComponent>
                    ) : (
                        <div></div>
                    )}
                </div>
            </p>

            <p>
                <div className={classes.fID}>
                    {/* <div className={classes.tID}> */}
                    {recordButton()}
                    {/* {sendButtonVisible()} */}
                    {/* </div>  */}
                </div>
            </p>
            <h5>c3: {viewC3}</h5>
            <h5>c2: {viewC2}</h5>
            <h5>c1: {viewC1}</h5>
            <h5>w: {viewW}</h5>

            {/* <ChartViewComponent></ChartViewComponent> */}

            {/* <div>
                <ConcentrationViewComponent
                    concData1={concData}
                ></ConcentrationViewComponent>
            </div> */}
        </div>
    );
};

export default RecordingPage;
