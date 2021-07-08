import { SaveEnvironment } from "./interfaces";
import { backendAxiosConfig } from "../index";
import axios from "axios";

export const saveEnvironment = (postData: SaveEnvironment) => {
    return axios
        .post("/save_environment", postData, backendAxiosConfig)
        .then((res) => {
            return res;
        });
};
