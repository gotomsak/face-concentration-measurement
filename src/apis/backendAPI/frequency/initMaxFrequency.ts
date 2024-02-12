import { InitMaxFrequency } from "./interfaces";
import { backendAxiosConfig } from "../index";
import axios from "axios";

export const initMaxFrequency = (postData: InitMaxFrequency) => {
  return axios
    .post("/init_max", postData, backendAxiosConfig)
    .then((res: any) => {
      return res;
    });
};
