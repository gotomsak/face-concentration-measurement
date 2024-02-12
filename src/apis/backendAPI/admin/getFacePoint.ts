import { AdminUser } from "./interfaces";
import { backendAxiosConfig } from "../index";
import axios from "axios";

export const adminGetFacePoint = (facePointID: string) => {
  return axios
    .get("/admin_get_face_point/" + facePointID, backendAxiosConfig)
    .then((res: any) => {
      return res;
    });
};
