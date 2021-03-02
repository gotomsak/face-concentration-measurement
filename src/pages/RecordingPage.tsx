import React, { useState, useEffect } from "react";
import WebCameraComponent from "../components/WebCameraComponent";
import { makeStyles, styled, Button, TextField } from "@material-ui/core";
import ConcentrationViewComponent from "../components/ConcentrationViewComponent";
import { getSaveImagesID } from "../apis/backendAPI/getSaveImagesID";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { OpenCvProvider, useOpenCv } from "opencv-react";
import { type } from "os";
import * as faceapi from "face-api.js";
import store from "..";

const RecordingPage: React.FC = () => {
    const [start, setStart] = useState(false);
    const [stop, setStop] = useState(false);
    // const [blobData, setBlobData] = useState();
    const [id, setID] = useState<number | string>("idを発行してください");
    // const [webSocketData, setWebSocketData] = useState();
    const [method, setMethod] = useState(true);
    const [imagePath, setImagePath] = useState("");
    const [concData, setConcData] = useState([]);

    const [typeParams, setTypeParams] = useState([
        {
            type: "tetuolab",
        },
    ]);

    const [typeParam, setTypeParam] = useState("");

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
            justifyContent: "center",
            textAlign: "center",
            width: "100%",
        },
        tID: {
            width: 200,
            height: 50,
            display: "flex",
            WebkitJustifyContent: "center",
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
    store.subscribe(() => {
        setConcData(store.getState().concReducer);
    });

    const createID = () => {
        getSaveImagesID({ type: typeParam }).then((res) => {
            setID(res.data.id);
        });
        console.log(typeParam);
    };
    const setWebSocketData = (e: any) => {
        const jsonData = JSON.parse(e.data);
        console.log(jsonData);
        setConcData((concData) => concData.concat(jsonData));
        setImagePath(jsonData["face_image_path"]);
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
    return (
        <div className={classes.root}>
            <WebCameraComponent
                start={start}
                stop={stop}
                method={method}
            ></WebCameraComponent>

            <p>
                <div className={classes.fID}>
                    <MyButton onClick={createID}>id発行</MyButton>
                    {/* <TextField value={id} variant="outlined" /> */}
                    <div className={classes.tID}>{id}</div>
                    <Autocomplete
                        id="combo-box-demo"
                        options={typeParams}
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
                            setTypeParam(value);
                        }}
                    />
                </div>
            </p>
            <p>
                <div className={classes.fID}>
                    {recordButton()}
                    <div className={classes.tID}></div>
                </div>
            </p>
            <div>
                <ConcentrationViewComponent
                    concData1={concData}
                ></ConcentrationViewComponent>
            </div>
        </div>
    );
};

export default RecordingPage;
