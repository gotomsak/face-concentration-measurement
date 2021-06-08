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
import { getIDLogs } from "../../apis/backendAPI/admin/getIDLogs";
import { getUserAll } from "../../apis/backendAPI/admin/getUserAll";
import { AdminGetUserAllRes } from "../../apis/backendAPI/admin/interfaces";
import UsersViewComponent from "../../components/admin/UsersViewComponent";
// import { UserInfoCol } from "./interfaces";

const AdminAnalysisPage: React.FC = () => {
    const [concViewData, setConcViewData] = useState<any>([]);
    const [getRecAllData, setGetRecAllData] = useState<any>([]);
    const [recDataCheck, setRecDataCheck] = useState<boolean>(false);
    const [freqViewData, setFreqViewData] = useState<any>([]);

    const listRefConcent = useRef<any>([]);

    useEffect(() => {
        console.log(concViewData);
    }, [concViewData]);

    const renderWork = (work: string) => {
        return <h1>{work}</h1>;
    };

    return (
        <div>
            <UsersViewComponent></UsersViewComponent>
        </div>
    );
};

export default AdminAnalysisPage;
