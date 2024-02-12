import { InitMinFrequency } from "./interfaces";
import { backendAxiosConfig } from "../index";
import axios from "axios";

export const initMinFrequency = (postData: InitMinFrequency) => {
  let data = new FormData();
  data.append("user_id", postData.user_id.toString());
  data.append("min_face_move_number", postData.min_face_move_number.toString());
  data.append("min_blink_number", postData.min_blink_number.toString());
  if (postData.min_frequency_video !== undefined) {
    console.log("into video");
    data.append("min_frequency_video", postData.min_frequency_video);
  }

  return axios
    .post("/init_min_frequency", data, backendAxiosConfig)
    .then((res: any) => {
      return res;
    });
};
