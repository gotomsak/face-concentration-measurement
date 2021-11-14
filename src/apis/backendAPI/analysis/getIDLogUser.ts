import axios from "axios";
import { backendAxiosConfig } from "..";

export const getIDLogUser = () => {
    return axios.get("/get_id_log_user", backendAxiosConfig).then((res) => {
        return res;
    });
};
