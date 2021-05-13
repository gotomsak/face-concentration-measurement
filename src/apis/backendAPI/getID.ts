import axios from "axios";

import { GetIDPost } from "./interfaces";
import { backendAxiosConfig } from ".";
export const getID = (getID: GetIDPost) => {
    // const newBackAxiosConf = backendAxiosConfig;
    // newBackAxiosConf["params"] = getID;
    return axios.post("/get_id", getID, backendAxiosConfig).then((res) => {
        return res;
    });
};
