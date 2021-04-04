import React, { useState, useEffect } from "react";
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
import { saveConcentration } from "../apis/backendAPI/saveConcentration";
import { getID } from "../apis/backendAPI/getID";
import FormControl from "@material-ui/core/FormControl";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import AssignmentIcon from "@material-ui/icons/Assignment";
import Tooltip from "@material-ui/core/Tooltip";
import CopyToClipBoard from "react-copy-to-clipboard";

const RecordingPage: React.FC = () => {
    const [start, setStart] = useState(false);
    const [stop, setStop] = useState(false);
    const [openTip, setOpenTip] = useState<boolean>(false);
    // const [blobData, setBlobData] = useState();
    const [id, setID] = useState<string>("idを発行してください");
    // const [webSocketData, setWebSocketData] = useState();
    const [method, setMethod] = useState(true);
    const [measurements, setMeasurements] = useState([
        {
            type: "other",
        },
        {
            type: "tetsuoSys",
        },
    ]);
    const [measurement, setMeasurement] = useState("");
    const [imagePath, setImagePath] = useState("");

    const [typeParam, setTypeParam] = useState("gotoSys");

    const useStyles = makeStyles({
        root: {
            display: "flex",
            flexDirection: "column",
            textAlign: "center",
            width: "100%",
            height: "100%",
        },
        fID: {
            display: "flex",
            // flexDirection: "row",
            justifyContent: "center",
            textAlign: "center",
            width: "100%",
        },
        tID: {
            display: "flex",
            width: "50%",
            height: 50,
            justifyContent: "space-evenly",
            // WebkitJustifyContent: "center",
            alignItems: "center",
        },
    });
    const MyButton = styled(Button)({
        height: 50,
        width: 100,
        background: "rgb(38.6%, 88.8%, 100%)",
        color: "primary",
        fontWeight: 800,
    });

    useEffect(() => {
        if (stop === true) {
            // saveConcentration({
            //     type: typeParam,
            //     measurement: measurement,
            //     id: id,
            //     concentration: [store.getState().concReducer],
            // }).then((res: any) => {
            //     console.log(res);
            // });
            setStart(false);
        }
    }, [stop]);

    const handleCloseTip = (): void => {
        setOpenTip(false);
    };
    const handleClickButton = (): void => {
        setOpenTip(true);
    };

    const createID = () => {
        getID({
            type: typeParam,
            measurement: measurement,
            concentration: [],
        }).then((res) => {
            setID(res.data.id);
        });
        console.log(typeParam);
    };

    const classes = useStyles();
    const recordButton = () => {
        if (start === false) {
            return (
                <MyButton
                    onClick={() => {
                        setStart(true);
                        setStop(false);
                    }}
                >
                    開始
                </MyButton>
            );
        } else {
            return (
                <MyButton
                    onClick={() => {
                        setStart(false);
                        setStop(true);
                    }}
                >
                    停止
                </MyButton>
            );
        }
    };

    const sendConcentration = () => {
        if (stop === true) {
            saveConcentration({
                type: typeParam,
                measurement: measurement,
                id: id,
                concentration: [store.getState().concReducer],
            }).then((res: any) => {
                console.log(res);
            });
            setStart(false);
            setStop(false);
        }
    };

    const sendButtonVisible = () => {
        if (stop === true) {
            return <MyButton onClick={sendConcentration}>集中度送信</MyButton>;
        }
        return;
    };

    return (
        <div className={classes.root}>
            <WebCameraComponent
                start={start}
                stop={stop}
                method={method}
            ></WebCameraComponent>

            <p>
                <div className={classes.fID}>
                    <div className={classes.tID}>
                        <MyButton onClick={createID}>id発行</MyButton>
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
                        {/* <TextField value={id} variant="outlined" /> */}
                        {/* <div className={classes.tID}>{id}</div> */}
                        <Autocomplete
                            id="combo-box-demo"
                            options={measurements}
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
                                setMeasurement(value);
                            }}
                        />
                    </div>
                </div>
            </p>
            <p>
                <div className={classes.fID}>
                    <div className={classes.tID}>
                        {" "}
                        {recordButton()}
                        {sendButtonVisible()}
                    </div>
                    
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
