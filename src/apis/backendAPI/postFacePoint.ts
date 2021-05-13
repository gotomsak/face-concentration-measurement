import axios from "axios";
import "./index";
import { backendAxiosConfig } from "./index";
import { PostFacePointSave } from "./interfaces";

export const postFacePoint = (postData: PostFacePointSave) => {
    return axios
        .post("/save_face_point", postData, backendAxiosConfig)
        .then((res: any) => {
            return res;
        });
};
