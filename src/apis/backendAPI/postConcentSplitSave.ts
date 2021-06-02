import axios from "axios";
import "./index";
import { backendAxiosConfig } from "./index";
import { PostConcentSplitSave } from "./interfaces";

export const postConcentSplitSave = (postData: PostConcentSplitSave) => {
    return axios
        .post("/save_concent_split", postData, backendAxiosConfig)
        .then((res: any) => {
            return res;
        });
};
