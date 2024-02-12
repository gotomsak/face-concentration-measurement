import { SaveQuestionnairePost } from "./interfaces";
import { backendAxiosConfig } from "../index";
import axios from "axios";

const saveQuestionnaire = (postData: SaveQuestionnairePost) => {
  return axios
    .post("/save_questionnaire", postData, backendAxiosConfig)
    .then((res: any) => {
      return res;
    });
};

export default saveQuestionnaire;
