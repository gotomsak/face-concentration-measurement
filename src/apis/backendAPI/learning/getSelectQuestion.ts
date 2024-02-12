import { backendAxiosConfig } from "../index";
import axios from "axios";

export const getSelectQuestion = () => {
  return axios
    .get("/get_select_question", backendAxiosConfig)
    .then((res: any) => {
      return res;
    });
};
