import { User } from "./interfaces";
import { backendAxiosConfig } from "./index";
import axios from 'axios'
export const signup = (user: User) => {
    
    return axios.post("/signup", user, backendAxiosConfig).then((res) => {
        return res;
    });
};

export const signin = (user: User) => {
    
    return axios.post("/signin", user, backendAxiosConfig).then((res) => {
        return res;
    });
};

export const checkSession = () => {
    return axios.get("/check_session", backendAxiosConfig).then((res) => {
        return res;
    });
};

export const signout = () => {
    return axios.get("/signout", backendAxiosConfig).then((res) => {
        return res;
    });
};
