import axios, { AxiosRequestConfig } from "axios";

export const backendAxiosConfig: AxiosRequestConfig = {
  baseURL: import.meta.env.REACT_APP_BASE_URL,
  withCredentials: true,
  headers: {
    "Access-Control-Allow-Origin": import.meta.env.REACT_APP_BASE_URL,
    "content-type": "application/json",
    "Access-Token": import.meta.env.REACT_APP_TOKEN,
  },
};
