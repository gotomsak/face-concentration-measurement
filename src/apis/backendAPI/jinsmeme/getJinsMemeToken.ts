import { backendAxiosConfig } from "../index";
import axios from "axios";
import { GetJinsMemeToken, GetJinsMemeTokenRes } from "./interfaces";

export const getJinsMemeToken = (postData: GetJinsMemeToken) => {
    return axios
        .post("/get_jins_meme_token", postData, backendAxiosConfig)
        .then((res) => {
            return res;
        });
};
