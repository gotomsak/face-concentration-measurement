import { AdminUser } from "./interfaces";
import { backendAxiosConfig } from "../index";
import axios from "axios";

export const adminGetRecUserDate = (conc_id: string) => {
  return axios
    .get("/admin_get_rec_user_date/" + conc_id, backendAxiosConfig)
    .then((res: any) => {
      return res;
    });
};
