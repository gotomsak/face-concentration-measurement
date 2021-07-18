import { backendAxiosConfig } from "../index";
import axios from "axios";
import { InitEar } from "./interfaces";

export const initEar = (postData: InitEar) => {
    return axios.post("/init_ear", postData, backendAxiosConfig).then((res) => {
        return res;
    });
};
