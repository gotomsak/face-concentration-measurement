import React, { useState, useEffect, useRef } from "react";
import WebCameraComponent from "../components/WebCameraComponent";
import { makeStyles, styled, Button, TextField } from "@material-ui/core";
import ConcentrationViewComponent from "../components/ConcentrationViewComponent";
import { getSaveImagesID } from "../apis/backendAPI/getSaveImagesID";
import Autocomplete from "@material-ui/lab/Autocomplete";
import ChartViewComponent from "../components/ChartViewComponent";
import { OpenCvProvider, useOpenCv } from "opencv-react";

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

const RecordingPage: React.FC = () => {
    const [start, setStart] = useState(false);
    const dispatch = useDispatch();
    const [stop, setStop] = useState(false);
    const [openTip, setOpenTip] = useState<boolean>(false);

    const [id, setID] = useState<string>("idを発行してください");
    const [frequencys, setFrequencys] = useState<any>();

    // const [work, setWork] = useState([
    //     {
    //         type: "other",
    //     },
    //     {
    //         type: "tetsuoSys",
    //     },
    // ]);

    const [imagePath, setImagePath] = useState("");
    const [work, setWork] = useState("");
    const [memo, setMemo] = useState("");

    const [typeParam, setTypeParam] = useState("gotoSys");

    useEffect(() => {
        getFrequency().then((res: any) => {
            setFrequencys(res);

            console.log(res);
        });
    }, []);

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
        if (start === false) {
            return (
                <RecordingPageButton
                    onClick={() => {
                        setStart(true);
                        setStop(false);
                    }}
                >
                    開始
                </RecordingPageButton>
            );
        } else {
            return (
                <RecordingPageButton
                    onClick={() => {
                        setStart(false);
                        setStop(true);
                    }}
                >
                    停止
                </RecordingPageButton>
            );
        }
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
                    {sendButtonVisible()}
                    {/* </div>  */}
                </div>
            </p>

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
