import { AdminUser } from "./interfaces";
import { backendAxiosConfig } from "../index";
import axios from "axios";

export const adminSignup = (user: AdminUser) => {
    return axios.post("/admin_signup", user, backendAxiosConfig).then((res) => {
        return res;
    });
};

export const adminSignin = (AdminUser: AdminUser) => {
    return axios
        .post("/admin_signin", AdminUser, backendAxiosConfig)
        .then((res) => {
            return res;
        });
};

export const adminCheckSession = () => {
    return axios.get("/admin_check_session", backendAxiosConfig).then((res) => {
        return res;
    });
};

export const adminSignout = () => {
    return axios.get("/admin_signout", backendAxiosConfig).then((res) => {
        return res;
    });
};
