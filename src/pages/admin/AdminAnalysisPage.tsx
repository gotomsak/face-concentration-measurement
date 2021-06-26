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
import { AdminGetUserAllRes } from "../../apis/backendAPI/admin/interfaces";
import UsersViewComponent from "../../components/analysis/UsersViewComponent";
// import { UserInfoCol } from "./interfaces";
import { useHistory } from "react-router";
import UserConcViewComponent from "../../components/analysis/UserConcViewComponent";
import { AdminAnalysisPageStyle } from "../../Styles";

const AdminAnalysisPage: React.FC = (props: any) => {
    const [concViewData, setConcViewData] = useState<any>([]);
    const [maxFreqData, setMaxFreqData] = useState<any>([]);
    const [minFreqData, setMinFreqData] = useState<any>([]);
    const [getRecAllData, setGetRecAllData] = useState<any>([]);
    const [recDataCheck, setRecDataCheck] = useState<boolean>(false);
    const [freqViewData, setFreqViewData] = useState<any>([]);
    const [renderUserID, setRenderUserID] = useState<boolean>(false);
    const [concNotFound, setConcNotFound] = useState<boolean>(false);

    const listRefConcent = useRef<any>([]);
    const history = useHistory();
    const classes = AdminAnalysisPageStyle();
    // useEffect(() => {
    //     console.log(concViewData);
    //     console.log(props);
    // }, [concViewData]);
    // useEffect(() => {
    //     console.log(props);
    // }, [props]);
    useEffect(() => {
        if (props.match.params.user_id !== undefined) {
            setRenderUserID(true);
            adminGetRecAll(props.match.params.user_id).then((res: any) => {
                console.log(res.data);
                if (res.data["concentration"] === null) {
                    setConcNotFound(true);
                    console.log("null");
                    return;
                }
                res.data["concentration"].map((conc: any) => {
                    let cnt = 0;
                    let dataC3: any = [];
                    let dataC2: any = [];
                    let dataC1: any = [];

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

                    listRefConcent.current = [
                        ...listRefConcent.current,
                        [
                            {
                                work: conc["work"],
                                max_freq_id:
                                    conc["concentration"]["max_freq_id"],
                                min_freq_id:
                                    conc["concentration"]["min_freq_id"],
                                datas: [
                                    { name: "c3", data: dataC3 },
                                    { name: "c2", data: dataC2 },
                                    { name: "c1", data: dataC1 },
                                ],
                            },
                        ],
                    ];
                });

                setMaxFreqData(res.data["maxFrequency"]);
                setMinFreqData(res.data["minFrequency"]);
                setConcViewData(listRefConcent.current);
            });
        }
    }, [props]);
    useLayoutEffect(() => {}, []);

    return (
        <div className={classes.root}>
            {renderUserID ? (
                concNotFound ? (
                    <div>
                        <h1>notData</h1>
                    </div>
                ) : (
                    <UserConcViewComponent
                        concViewData={concViewData}
                        maxFreqData={maxFreqData}
                        minFreqData={minFreqData}
                    ></UserConcViewComponent>
                )
            ) : (
                <UsersViewComponent></UsersViewComponent>
            )}
        </div>
    );
};

export default React.memo(AdminAnalysisPage);
