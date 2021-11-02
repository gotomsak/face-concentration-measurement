import { ReMinFrequency } from "./interfaces";
import { backendAxiosConfig } from "../index";
import axios from "axios";

export const reMinFrequency = (postData: ReMinFrequency) => {
    return axios.post("/re_min", postData, backendAxiosConfig).then((res) => {
        return res;
    });
};
