export interface SaveConcentrationPost {
    type: string;
    id: string;
    user_id: number;
    measurement: string;
    concentration: any[];
}

export interface GetIDPost {
    type: string;
    measurement: string;
    user_id: number;
    concentration: any[];
}

export interface GetSaveImagesIDGet {
    type: string;
}

export interface GetSaveImagesIDRes {
    id: string;
}
export interface User {
    username?: string;
    email: string;
    password: string;
}
