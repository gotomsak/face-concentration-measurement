import { backendAxiosConfig } from "../index";
import axios from "axios";

export const getQuestion = (id: number) => {
  return axios
    .get("/question?id=" + id.toString(), backendAxiosConfig)
    .then((res: any) => {
      return res;
    });
};
