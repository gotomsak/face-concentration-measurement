import internal from "stream";
import { Conc } from "../../../reducers/concReducer";
import { GetEnvironment } from "../environment/interfaces";
import { MaxFrequency, MinFrequency } from "../frequency/interfaces";
// import { PostConcentrationSave } from "../interfaces";
// import { GridSelectionModel } from "@material-ui/data-grid";
export interface AdminUser {
    username?: string;
    email: string;
    password: string;
    token: string;
}

export interface AdminGetUserAllRes {
    user_id: Number;
    username?: string;
    email?: string;
}

export interface AdminGetIDLogUserRes {
    ID: number;
    CreatedAt: Date;
    conc_data_id: string;
    user_id: number;
    DeletedAt: Date;
    UpdateAt: Date;
}

export interface ear {
    date: Date;
    id: string;
    left_ear_list: any;
    left_ear_t: any;
    right_ear_list: any;
    right_ear_t: any;
    user_id: number;
}

export interface environments {
    date: Date;
    ear: ear;
    id: string;
    max_freq: MaxFrequency;
    min_freq: MinFrequency;
    name: string;
    user_id: number;
}
export interface concentration {
    type: string;
    id: string;
    user_id: number;
    work: string;
    memo: string;
    measurement: string;
    concentration: Conc;
}

export interface GetRecUserDateRes {
    environments: environments[];
    concentration: concentration;
    facePointAll: any;
}

export interface GetQuestionAllRes {
    ID: number;
    CreatedAt: Date;
    DeletedAt: Date;
    UpdatedAt: Date;
    question: string;
    qimg_path: string;
    mistake1: string;
    mistake2: string;
    mistake3: string;
    ans: string;
    mimage_path1: string;
    mimage_path2: string;
    mimage_path3: string;
    aimg_path: string;
    season: string;
    question_num: string;
    genre: string;
}

export interface AdminSaveSelectQuestion {
    select_question_name: string;
    select_question_ids: (number | string)[];
}

export interface AnswerResultSection{
    ID: number;
    CreatedAt: Date;
    DeletedAt: Date;
    UpdatedAt: Date;
    conc_id: string;
    select_question_id: string;
    correct_answer_number: number;
    user_id:number;
    answer_result_ids: string;
    start_time: Date;
    end_time: Date;


}

export interface GetSelectAnswerResultSection{
    concentration:concentration

    answer_result_section: AnswerResultSection
}

export interface AdminGetSelectAnswerResultSectionRes{
    select_answer_result_section: GetSelectAnswerResultSection[]
}