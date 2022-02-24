import {
    AdminSaveSelectQuestion,
    AdminUser,
    SaveAddQuestionReq,
} from "./interfaces";
import { backendAxiosConfig } from "../index";
import axios from "axios";

export const adminSaveAddQuestion = (postData: SaveAddQuestionReq) => {
    return axios
        .post("/admin_save_add_question", postData, backendAxiosConfig)
        .then((res) => {
            return res;
        });
};
