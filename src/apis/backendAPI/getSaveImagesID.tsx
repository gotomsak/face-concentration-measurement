import "./index";
import axios from "axios";
import { backendAxiosConfig } from ".";
import { GetSaveImagesIDGet } from "./interfaces";

export const getSaveImagesID = (getData: GetSaveImagesIDGet) => {
  return axios
    .get("/get_id?type=" + getData.type, backendAxiosConfig)
    .then((res: any) => {
      return res;
    });
};
