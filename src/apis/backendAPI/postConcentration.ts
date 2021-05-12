import axios from "axios";
import "./index";
import { backendAxiosConfig } from "./index";
import { PostConcentrationSave } from "./interfaces";

export const postConcentration = (postData: PostConcentrationSave) => {
    return axios
        .post("/save_concent", postData, backendAxiosConfig)
        .then((res: any) => {
            return res;
        });
};
