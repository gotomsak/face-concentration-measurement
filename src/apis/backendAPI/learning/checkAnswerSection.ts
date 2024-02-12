import React, { useState, useEffect } from "react";
import { BtoFtoC, CheckAnswerSectionPost, SonConc } from "./interfaces";
import { backendAxiosConfig } from "../index";
import axios from "axios";

export const checkAnswerSection = (postData: CheckAnswerSectionPost) => {
  return axios
    .post("/check_answer_section", postData, backendAxiosConfig)
    .then((res: any) => {
      return res;
    });
};
