import axios from "axios";
import { backendAxiosConfig } from "..";

export const getEnvironment = () => {
  return axios.get("/get_environment", backendAxiosConfig).then((res: any) => {
    return res;
  });
};
