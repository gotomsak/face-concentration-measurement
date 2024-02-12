import { CheckAnswerPost } from "./interfaces";
import { backendAxiosConfig } from "../index";
import axios from "axios";
export const checkAnswer = (postData: CheckAnswerPost) => {
  return axios
    .post("/check_answer", postData, backendAxiosConfig)
    .then((res: any) => {
      return res;
    });
};
