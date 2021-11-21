import { AdminUser } from "./interfaces";
import { backendAxiosConfig } from "../index";
import axios from "axios";

export const adminGetQuestionAll = () => {
    return axios
        .get("/admin_get_question_all", backendAxiosConfig)
        .then((res) => {
            return res;
        });
};

