import { AdminUser } from "./interfaces";
import { backendAxiosConfig } from "../index";
import axios from "axios";

export const adminGetIDLogAll = () => {
    return axios
        .get("/admin_get_id_log_all", backendAxiosConfig)
        .then((res) => {
            return res;
        });
};
