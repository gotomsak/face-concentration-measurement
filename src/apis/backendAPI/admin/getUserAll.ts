import { AdminUser } from "./interfaces";
import { backendAxiosConfig } from "../index";
import axios from "axios";

export const getUserAll = () => {
    return axios.get("/admin_get_user_all", backendAxiosConfig).then((res) => {
        return res;
    });
};
