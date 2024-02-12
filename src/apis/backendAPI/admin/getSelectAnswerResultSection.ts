import { AdminUser } from "./interfaces";
import { backendAxiosConfig } from "../index";
import axios from "axios";

export const adminGetSelectAnswerResultSection = (
  select_question_id: string
) => {
  return axios
    .get(
      "/admin_get_select_answer_result_section/" + select_question_id,
      backendAxiosConfig
    )
    .then((res: any) => {
      return res;
    });
};
