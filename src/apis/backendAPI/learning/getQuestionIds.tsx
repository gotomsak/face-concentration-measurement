import axios from "axios";
import { backendAxiosConfig } from "../index";
import { GetQuestionIdQuery, GetQuestionIdsPost } from "./interfaces";

export const getQuestionIds = (
  postData: GetQuestionIdsPost,
  query: GetQuestionIdQuery
) => {
  return axios
    .post(
      "/question_ids/" + query.select_question_id,
      postData,
      backendAxiosConfig
    )
    .then((res: any) => {
      return res;
    });
};
