import axios from "axios";

import { GetIDGet } from "./interfaces";
import { backendAxiosConfig } from ".";
export const getID = (getID: GetIDGet) => {
    const newBackAxiosConf = backendAxiosConfig;
    newBackAxiosConf["params"] = getID;
    return axios.get("/get_id", newBackAxiosConf).then((res) => {
        return res;
    });
};
