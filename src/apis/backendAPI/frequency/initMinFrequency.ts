import { InitMinFrequency } from "./interfaces";
import { backendAxiosConfig } from "../index";
import axios from "axios";

export const initMinFrequency = (postData: InitMinFrequency) => {
    return axios.post("/init_min", postData, backendAxiosConfig).then((res) => {
        return res;
    });
};
