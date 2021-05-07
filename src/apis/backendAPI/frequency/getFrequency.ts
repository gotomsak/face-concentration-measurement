import axios from "axios";
import { backendAxiosConfig } from "..";

export const getFrequency = () => {
    return axios.get("get_frequency", backendAxiosConfig).then((res) => {
        return res;
    });
};
