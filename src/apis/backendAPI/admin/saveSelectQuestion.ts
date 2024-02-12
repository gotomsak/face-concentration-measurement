import { AdminSaveSelectQuestion, AdminUser } from "./interfaces";
import { backendAxiosConfig } from "../index";
import axios from "axios";

export const adminSaveSelectQuestion = (postData: AdminSaveSelectQuestion) => {
  return axios
    .post("/admin_save_select_question", postData, backendAxiosConfig)
    .then((res: any) => {
      return res;
    });
};
