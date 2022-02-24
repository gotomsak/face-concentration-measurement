import { DataGrid, GridColDef } from "@material-ui/data-grid";
import * as React from "react";
import { useState, useEffect, useRef, useLayoutEffect } from "react";
import { getFpsData } from "../../apis/lineOfSightAPI/getFpsData";
import { getLOSCsvResult } from "../../apis/lineOfSightAPI/getLOSCsvResult";
import { LineOfSightPageStyle } from "../../Styles";
import { TextField } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import ScatterViewComponent from "../../components/analysis/ScatterViewComponent";

const LineOfSightPage: React.FC = () => {
    const [lineOfSightGrapheImg, setLineOfSightGrapheImg] =
        useState<string>("");
    const [mapCntMessage, setMapCntMessage] = useState<string>();
    const [centerWeightMessage, setCenterWeightMessage] = useState<string>();
    const [movementSightMessage, setMovementSightMessage] = useState<string>();
    const [centerAndMapWeightMessage, setCenterAndMapWeightMessage] =
        useState<string>();

    const [secondToCenter, setSecondToCenter] = useState<Number[][]>([]);
    const classes = LineOfSightPageStyle();
    const [createdCheck, setCreatedCheck] = useState<boolean>(false);
    const [tableHeader, setTableHeader] = useState<GridColDef[]>([
        // {
        //     field: "id",
        //     headerName: "ID",
        //     width: 50,
        // },

        { field: "nickname", headerName: "名前", width: 80 },
        {
            field: "center-and-map-weight",
            headerName: "中央とマップ",
            width: 130,
        },
        {
            field: "center-weight",
            headerName: "中央",
            width: 130,
        },
        {
            field: "map-cnt",
            headerName: "マップ",
            width: 130,
        },
        {
            field: "movement-sight",
            headerName: "動き",
            width: 130,
        },
        {
            field: "second",
            headerName: "秒数",
            width: 130,
        },
        {
            field: "kill-cnt",
            headerName: "キル数",
            width: 130,
        },
    ]);

    const [tableData, setTableData] = useState([]);
    const [csvFile, setCsvFile] = useState<FileReader>(new FileReader());
    const [nickname, setNickname] = useState<string>("");
    const [killCnt, setKillCnt] = useState<Number>(0);

    const [csvFileName, setCsvFileName] = useState<string>("");
    const [inputError, setInputError] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {}, []);
    useLayoutEffect(() => {
        loadData();
    }, []);
    const loadData = async () => {
        const fdres = await getFpsData();
        const data = await fdres.json();

        setTableData(data);
        data.forEach((element: any) => {
            const read = secondToCenterFormat(element);
            if (null != read) {
                secondToCenter.push(read);
            }
        });
    };

    const secondToCenterFormat = (data: any) => {
        if (data["kill-cnt"] < 30) return null;
        return [Number(data["second"]), Number(data["center-weight"])];
    };

    const viewGraph = (base64_data: any) => {
        const data = "data:image/jpeg;base64," + base64_data;
        setLineOfSightGrapheImg(data);
    };
    const inputCSVFile = (e: any) => {
        console.log(e.target.files);
        setCsvFileName(e.target.files[0].name);
        csvFile?.readAsText(e.target.files[0]);
    };
    const sendCSV = async () => {
        const losres = await getLOSCsvResult(
            csvFile,
            csvFileName,
            nickname,
            killCnt
        );
        const data = await losres.json();
        setMapCntMessage(
            "あなたのマップを見た回数は" + data["map-cnt"] + "回です"
        );
        setCenterWeightMessage(
            "あなたの中心注を見た割合は" + data["center-weight"] + "%です"
        );
        setMovementSightMessage(
            "あなたの視線移動量は" + data["movement-sight"] + "です"
        );
        setCenterAndMapWeightMessage(
            "あなたの中心とマップを見た割合は" +
                data["center-and-map-weight"] +
                "%です"
        );
        viewGraph(data["result"]);
        setCreatedCheck(true);
    };

    return (
        <div className={classes.root}>
            <div className={classes.left}>
                <h1>fpsゲーム視線測定ツール</h1>
                <p>
                    <TextField
                        id="standard-basic"
                        label="ニックネーム"
                        variant="standard"
                        value={nickname}
                        onChange={(e: any) => {
                            setNickname(e.target.value);
                        }}
                    />
                </p>
                <p>
                    <TextField
                        id="standard-basic"
                        label="kill数"
                        inputRef={inputRef}
                        error={inputError}
                        variant="standard"
                        inputProps={{ maxLength: 3, pattern: "^[0-9]+$" }}
                        value={killCnt}
                        helperText={
                            inputRef?.current?.validationMessage
                                ? "半角数字で入力してください"
                                : ""
                        }
                        onChange={(e: any) => {
                            if (inputRef.current) {
                                console.log(inputRef.current);
                                const ref = inputRef.current;
                                if (!ref.validity.valid) {
                                    setInputError(true);
                                } else {
                                    setInputError(false);
                                }
                            }
                            setKillCnt(e.target.value);
                        }}
                    />
                    {/* <input type="text" id="nickname" name="nickname" /> */}
                </p>

                <p>
                    <label>アップロードするcsvファイルを選択してください</label>
                    <input
                        type="file"
                        id="file"
                        name="file"
                        onChange={inputCSVFile}
                    />
                    <button onClick={sendCSV}>送信</button>
                </p>

                {/* <p>
                    <label>アップロードするmp4ファイルを選択してください</label>
                    <input type="file" id="file-mp4" name="file-mp4" />
                    {/* <button onClick={}>送信</button> 
                </p> */}
                {createdCheck ? (
                    <Alert
                        severity="success"
                        onClick={() => {
                            setCreatedCheck(false);
                        }}
                    >
                        登録しました
                    </Alert>
                ) : (
                    <></>
                )}

                <div>
                    <img src={lineOfSightGrapheImg}></img>
                </div>
                <div>{mapCntMessage}</div>
                <div>{centerWeightMessage}</div>
                <div>{movementSightMessage}</div>
                <div>{centerAndMapWeightMessage}</div>
                <div style={{ width: "1000px" }}>
                    <ScatterViewComponent
                        data={secondToCenter}
                    ></ScatterViewComponent>
                </div>
            </div>

            <div>
                <h1>履歴</h1>
                <div style={{ height: "500px", width: "500px" }}>
                    <DataGrid rows={tableData} columns={tableHeader} />
                </div>
            </div>
        </div>
    );
};

export default LineOfSightPage;
