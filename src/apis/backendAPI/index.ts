import axios, { AxiosRequestConfig } from "axios";


export const backendAxiosConfig: AxiosRequestConfig = {
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: {
        'Access-Control-Allow-Origin': process.env.REACT_APP_BASE_URL,
        withCredentials: true,
        'content-type': 'application/json',
        'Access-Token': 'VUqg3lHlG3EHSI2r5iMjkUbAktsiVpa'
    },
}
