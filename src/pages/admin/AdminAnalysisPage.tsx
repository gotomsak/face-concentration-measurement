import React, {
    useState,
    useEffect,
    useCallback,
    useMemo,
    useLayoutEffect,
    useRef,
} from "react";
import ChartViewComponent from "../../components/ChartViewComponent";
import ReactApexCharts from "react-apexcharts";
import ApexCharts from "apexcharts";
import { getRecAll } from "../../apis/backendAPI/analysis/getRecAll";
// import { getIDLogs } from "../../apis/backendAPI/admin/Admin";
import { adminGetUserAll } from "../../apis/backendAPI/admin/getUserAll";
import { adminGetRecAll } from "../../apis/backendAPI/admin/getRecAll";
import {
    AdminGetUserAllRes,
    environments,
    GetRecUserDateRes,
} from "../../apis/backendAPI/admin/interfaces";
import UsersViewComponent from "../../components/analysis/UsersViewComponent";
// import { UserInfoCol } from "./interfaces";
import { useHistory } from "react-router";
import UserConcAllViewComponent from "../../components/analysis/UserConcAllViewComponent";
import { AdminAnalysisPageStyle } from "../../Styles";
import UserLogViewComponent from "../../components/analysis/UserLogViewComponent";
import UserConcViewComponent from "../../components/analysis/UserConcViewComponent";
import { adminGetRecUserDate } from "../../apis/backendAPI/admin/getRecUserDate";
import ReConcEstimateComponent from "../../components/analysis/ReConcEstimateComponent";
import { adminGetFacePoint } from "../../apis/backendAPI/admin/getFacePoint";
import { useDispatch } from "react-redux";
import SetEnvironment from "../../components/utils/SetEnvironment";
import { OpenCvProvider, useOpenCv } from "opencv-react";
import {
    MaxFrequency,
    MinFrequency,
} from "../../apis/backendAPI/frequency/interfaces";
import { GetEnvironment } from "../../apis/backendAPI/environment/interfaces";

const AdminAnalysisPage: React.FC = (props: any) => {
    const [concViewData, setConcViewData] = useState<any>([]);
    // const [maxFreqData, setMaxFreqData] = useState<MaxFrequency>();
    // const [minFreqData, setMinFreqData] = useState<MinFrequency>();
    const [getRecAllData, setGetRecAllData] = useState<any>([]);
    const [recDataCheck, setRecDataCheck] = useState<boolean>(false);
    const [freqViewData, setFreqViewData] = useState<any>([]);
    const [renderUserID, setRenderUserID] = useState<boolean>(false);
    const [concNotFound, setConcNotFound] = useState<boolean>(false);
    const [userID, setUserID] = useState<number>();
    const [concID, setConcID] = useState<string>();
    const [work, setWork] = useState<string>("");
    const [memo, setMemo] = useState<string>("");
    const [facePointAll, setFacePointAll] = useState();
    const [maxFreqID, setMaxFreqID] = useState<string>("");
    const [minFreqID, setMinFreqID] = useState<string>("");
    const [ear, setEar] = useState([]);
    const [environments, setEnvironments] = useState<environments[]>([]);
    const [adminGetRecUserDateRes, setAdminGetRecUserDateRes] =
        useState<GetRecUserDateRes>();
    // const [facePointID, setFacePointID] = useState<string>("");
    const dispatch = useDispatch();

    const listRefConcent = useRef<any>([]);
    const history = useHistory();
    const classes = AdminAnalysisPageStyle();

    useEffect(() => {
        console.log(props.match.params);

        // changeUserID(props);
        if (props.match.params.user_id !== undefined) {
            // setRenderUserID(true);
            setUserID(props.match.params.user_id);
        }
        if (props.match.params.conc_id !== undefined) {
            // setRenderUserID(true);
            setConcID(props.match.params.conc_id);
        }
    }, [props]);

    useEffect(() => {
        if (concID !== undefined) {
            adminGetRecUserDate(concID).then((res: any) => {
                // setAdminGetRecUserDateRes(res.data);

                // const resConc = res.data.concentration;
                // const resEnvironment = res.data.environment;
                // const resMaxFreq = resEnvironment.maxFrequency;
                // const resMinFreq = resEnvironment.minFrequency;
                const resAll: GetRecUserDateRes = res.data;
                console.log(resAll);
                console.log(resAll.environments);
                setFacePointAll(resAll.facePointAll);

                setWork(resAll.concentration.work);
                // setMaxFreqData(adminGetRecUserDateRes?.environments);
                // setMinFreqData(resMinFreq);
                setMaxFreqID(resAll.concentration.concentration.max_freq_id);
                setMinFreqID(resAll.concentration.concentration.min_freq_id);
                setMemo(resAll.concentration.memo);
                setEnvironments(resAll.environments);

                let cnt = 0;
                let dataC3: any = [];
                let dataC2: any = [];
                let dataC1: any = [];
                let conc = res.data.concentration;
                conc["concentration"]["c3"].map((element: any) => {
                    dataC3 = dataC3.concat([
                        {
                            x: new Date(
                                conc["concentration"]["date"][cnt]
                            ).getTime(),
                            y: element,
                        },
                    ]);
                    cnt += 1;
                });
                cnt = 0;
                conc["concentration"]["c2"].map((element: any) => {
                    dataC2 = dataC2.concat([
                        {
                            x: new Date(
                                conc["concentration"]["date"][cnt]
                            ).getTime(),
                            y: element,
                        },
                    ]);
                    cnt += 1;
                });
                cnt = 0;
                conc["concentration"]["c1"].map((element: any) => {
                    dataC1 = dataC1.concat([
                        {
                            x: new Date(
                                conc["concentration"]["date"][cnt]
                            ).getTime(),
                            y: element,
                        },
                    ]);
                    cnt += 1;
                });
                setConcViewData([
                    { name: "c3", data: dataC3 },
                    { name: "c2", data: dataC2 },
                    { name: "c1", data: dataC1 },
                ]);
            });
        }
    }, [concID]);
    const ReConcEstimateIvent = () => {
        // adminGetFacePoint(facePointID);
    };

    return (
        <div className={classes.root}>
            {concID !== undefined ? (
                <div>
                    <UserConcViewComponent
                        concID={concID}
                        concViewData={concViewData}
                        // maxFreqData={maxFreqData}
                        // minFreqData={minFreqData}
                        environments={environments}
                        work={work}
                        memo={memo}
                        maxFreqID={maxFreqID}
                        minFreqID={minFreqID}
                        facePointAll={facePointAll}
                    ></UserConcViewComponent>

                    <ReConcEstimateComponent
                        environments={environments}
                        facePointAll={facePointAll}
                    ></ReConcEstimateComponent>
                </div>
            ) : userID !== undefined ? (
                // <UserConcAllViewComponent
                //     userID={userID}
                // ></UserConcAllViewComponent>

                <UserLogViewComponent userID={userID}></UserLogViewComponent>
            ) : (
                <UsersViewComponent></UsersViewComponent>
            )}
        </div>
    );
};

export default React.memo(AdminAnalysisPage);
