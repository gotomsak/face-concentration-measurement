import axios from "axios";
import { backendAxiosConfig } from "../index";
import { GetQuestionIdQuery, GetQuestionIdsPost } from "./interfaces";

export const getQuestionIds = (postData: GetQuestionIdsPost, query: GetQuestionIdQuery) => {
    return axios
        .post("/question_ids/?select_question_id=" + query.select_question_id, postData, backendAxiosConfig)
        .then((res) => {
            return res;
        });
};
