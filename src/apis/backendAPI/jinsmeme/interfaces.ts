export interface GetJinsMemeToken {
    code: string | null;
    user_id: Number;
}

export interface GetJinsMemeTokenRes {
    access_token: string;
    token_type: string;
    expires_in: Number;
    refresh_token: string;
    scope: string;
}

export interface SaveJinsMemeData {
    user_id: Number;
    conc_id: string;
    start_time: Date | null;
    end_time: Date | null;
}
