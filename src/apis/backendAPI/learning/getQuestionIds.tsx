import axios from "axios";
import { backendAxiosConfig } from "../index";
import { GetQuestionIdsPost } from "./interfaces";

export const getQuestionIds = (postData: GetQuestionIdsPost) => {
    return axios
        .post("/question_ids", postData, backendAxiosConfig)
        .then((res) => {
            return res;
        });
};
