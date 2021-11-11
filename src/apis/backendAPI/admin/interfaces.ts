import { Conc } from "../../../reducers/concReducer";
import { GetEnvironment } from "../environment/interfaces";
import { MaxFrequency, MinFrequency } from "../frequency/interfaces";
// import { PostConcentrationSave } from "../interfaces";

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
