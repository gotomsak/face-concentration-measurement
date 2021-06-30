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
import UserConcAllViewComponent from "../../components/analysis/UserConcAllViewComponent";
import { AdminAnalysisPageStyle } from "../../Styles";
import UserLogViewComponent from "../../components/analysis/UserLogViewComponent";
import UserConcViewComponent from "../../components/analysis/UserConcViewComponent";

const AdminAnalysisPage: React.FC = (props: any) => {
    const [concViewData, setConcViewData] = useState<any>([]);
    const [maxFreqData, setMaxFreqData] = useState<any>([]);
    const [minFreqData, setMinFreqData] = useState<any>([]);
    const [getRecAllData, setGetRecAllData] = useState<any>([]);
    const [recDataCheck, setRecDataCheck] = useState<boolean>(false);
    const [freqViewData, setFreqViewData] = useState<any>([]);
    const [renderUserID, setRenderUserID] = useState<boolean>(false);
    const [concNotFound, setConcNotFound] = useState<boolean>(false);
    const [userID, setUserID] = useState<number | undefined>(undefined);
    const [concID, setConcID] = useState<string | undefined>(undefined);

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

    return (
        <div className={classes.root}>
            {concID !== undefined ? (
                <UserConcViewComponent concID={concID}></UserConcViewComponent>
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
