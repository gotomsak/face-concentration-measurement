import axios from "axios";
import { backendAxiosConfig } from "..";

export const getRecUserDate = (conc_id: string) => {
  return axios
    .get("/get_rec_user_date/" + conc_id, backendAxiosConfig)
    .then((res: any) => {
      return res;
    });
};
