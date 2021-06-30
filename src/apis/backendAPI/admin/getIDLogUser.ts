import { AdminUser } from "./interfaces";
import { backendAxiosConfig } from "../index";
import axios from "axios";

export const adminGetIDLogUser = (id: number) => {
    return axios
        .get("/admin_get_id_log_user/" + id.toString(), backendAxiosConfig)
        .then((res) => {
            return res;
        });
};
