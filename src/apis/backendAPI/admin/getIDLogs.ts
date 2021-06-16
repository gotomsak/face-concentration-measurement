import { AdminUser } from "./interfaces";
import { backendAxiosConfig } from "../index";
import axios from "axios";

export const adminGetIDLogs = () => {
    return axios.get("/admin_get_id_logs", backendAxiosConfig).then((res) => {
        return res;
    });
};
