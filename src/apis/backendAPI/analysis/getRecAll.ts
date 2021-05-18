import axios from "axios";
import { backendAxiosConfig } from "..";

export const getRecAll = () => {
    return axios.get("get_rec_all", backendAxiosConfig).then((res) => {
        return res;
    });
};
