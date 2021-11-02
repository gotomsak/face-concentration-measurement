import { backendAxiosConfig } from "../index";
import axios from "axios";
import { SaveJinsMemeData } from "./interfaces";

export const saveJinsMemeData = (postData: SaveJinsMemeData) => {
    return axios
        .post("/save_jins_meme_data", postData, backendAxiosConfig)
        .then((res) => {
            return res;
        });
};
