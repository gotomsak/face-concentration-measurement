import { AdminUser } from "./interfaces";
import { backendAxiosConfig } from "../index";
import axios from "axios";
// const params = backendAxiosConfig;
export const adminGetRecAll = (id: number) => {
    // params.params = { user_id: id };
    return axios
        .get("/admin_get_rec_all/" + id.toString(), backendAxiosConfig)
        .then((res) => {
            return res;
        });
};
