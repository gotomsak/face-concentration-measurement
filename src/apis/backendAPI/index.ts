import axios, { AxiosRequestConfig } from "axios";

export const backendAxiosConfig: AxiosRequestConfig = {
    baseURL: process.env.REACT_APP_BASE_URL,
    withCredentials: true,
    headers: {
        "Access-Control-Allow-Origin": process.env.REACT_APP_BASE_URL,

        "content-type": "application/json",
        "Access-Token": process.env.REACT_APP_TOKEN,
    },
};
