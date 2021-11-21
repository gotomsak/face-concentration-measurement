import { AdminUser } from "./interfaces";
import { backendAxiosConfig } from "../index";
import axios from "axios";

export const adminGetSelectQuestion = () => {
    return axios
        .get("/admin_get_select_question", backendAxiosConfig)
        .then((res) => {
            return res;
        });
};

