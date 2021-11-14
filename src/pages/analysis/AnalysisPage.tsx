import React, {
    useState,
    useEffect,
    useCallback,
    useMemo,
    useLayoutEffect,
    useRef
} from "react";
import { useHistory } from "react-router";
import ChartViewComponent from "../../components/ChartViewComponent";
import ReactApexCharts from "react-apexcharts";
import ApexCharts from "apexcharts";
import { getRecUserDate } from "../../apis/backendAPI/analysis/getRecUserDate";
import UserConcAllViewComponent from "../../components/analysis/UserConcAllViewComponent";
import UserLogViewComponent from "../../components/analysis/UserLogViewComponent";
import { GetEnvironment } from "../../apis/backendAPI/environment/interfaces";
import { GetRecUserDateRes, environments } from "../../apis/backendAPI/admin/interfaces";
import UserConcViewComponent from "../../components/analysis/UserConcViewComponent";
import { getIDLogUser } from "../../apis/backendAPI/analysis/getIDLogUser";
import { AnalysisPageStyle } from "../../Styles";

const AnalysisPage: React.FC = (props: any) => {
    const classes = AnalysisPageStyle()
    const history = useHistory();
    const [concViewData, setConcViewData] = useState<any>([]);
    const [getRecAllData, setGetRecAllData] = useState<any>([]);
    const [recDataCheck, setRecDataCheck] = useState<boolean>(false);
    const [freqViewData, setFreqViewData] = useState<any>([]);
    const [maxFreqData, setMaxFreqData] = useState<any>([]);
    const [minFreqData, setMinFreqData] = useState<any>([]);
    const listRefConcent = useRef<any>([]);
    const [userID, setUserID] = useState<number | undefined>();
    const [facePointAll, setFacePointAll] = useState();
    const [maxFreqID, setMaxFreqID] = useState<string>("");
    const [minFreqID, setMinFreqID] = useState<string>("");
    const [work, setWork] = useState<string>("");
    const [memo, setMemo] = useState<string>("");
    const [concID, setConcID] = useState<string>();
    const [ear, setEar] = useState([]);
    const [environments, setEnvironments] = useState<environments[]>([]);
    const [logData, setLogData] = useState()
    useEffect(() => {
        
        if (props.match.params.conc_id !== undefined) {
            // setRenderUserID(true);
            console.log("yonda")
            setConcID(props.match.params.conc_id);
        }
    }, [props.match.params]);
    useEffect(()=>{
        // changeUserID(props);
        if (Number(localStorage.getItem("user_id"))) {
            // setRenderUserID(true);
            setUserID(Number(localStorage.getItem("user_id")));
        }
    },[])

    useEffect(()=>{
        if (userID !== undefined) {
            getIDLogUser().then((res: any) => {
                console.log(res);
                setLogData(res.data["get_id_log_user"])
                
            });
        }
    },[userID])

    
    useEffect(() => {
        if(concID !== undefined){

        
            getRecUserDate(concID).then((res: any) => {

                const resAll: GetRecUserDateRes = res.data;
                console.log(resAll);
                console.log(resAll.environments);
                setFacePointAll(resAll.facePointAll);

                setWork(resAll.concentration.work);
                
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
    const ReturnTop:React.FC =()=>{
        // useEffect(()=>{
            
        //     history.push("/")
        // },[])
        return <div>ログインして下さい</div>
    }
    return (
        <div className={classes.root} >
            {concID!==undefined?(
                 <UserConcViewComponent
                 concID={concID}
                 concViewData={concViewData}
                 environments={environments}
                 work={work}
                 memo={memo}
                 maxFreqID={maxFreqID}
                 minFreqID={minFreqID}
                 facePointAll={facePointAll}
                ></UserConcViewComponent>
            ):userID!==undefined?(
                <UserLogViewComponent logData={logData}></UserLogViewComponent>
            ):(
                <ReturnTop></ReturnTop>
            )}
            
        </div>
    );
};

export default AnalysisPage;
