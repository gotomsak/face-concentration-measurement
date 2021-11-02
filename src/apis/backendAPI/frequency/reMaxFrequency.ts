import { ReMaxFrequency } from "./interfaces";
import { backendAxiosConfig } from "../index";
import axios from "axios";

export const reMaxFrequency = (postData: ReMaxFrequency) => {
    return axios.post("/re_max", postData, backendAxiosConfig).then((res) => {
        return res;
    });
};
