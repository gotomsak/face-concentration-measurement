import axios from "axios";
import { backendAxiosConfig } from "../index";
import { GetQuestionGymPost } from "./interfaces";

export const getQuestionGym = (postData: GetQuestionGymPost) => {
    return axios
        .post("/question_gym", postData, backendAxiosConfig)
        .then((res) => {
            return res;
        });
};
