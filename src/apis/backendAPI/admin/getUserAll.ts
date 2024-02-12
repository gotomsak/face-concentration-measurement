import { AdminUser } from "./interfaces";
import { backendAxiosConfig } from "../index";
import axios from "axios";

export const adminGetUserAll = () => {
  return axios
    .get("/admin_get_user_all", backendAxiosConfig)
    .then((res: any) => {
      return res;
    });
};
