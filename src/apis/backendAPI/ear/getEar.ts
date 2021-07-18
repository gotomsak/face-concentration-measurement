import axios from "axios";
import { backendAxiosConfig } from "..";

export const getEar = () => {
    return axios.get("/get_ear", backendAxiosConfig).then((res) => {
        return res;
    });
};
