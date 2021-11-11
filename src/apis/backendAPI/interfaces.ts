export interface PostConcentrationSave {
    type: string;
    id: string;
    user_id: number;
    work: string;
    memo: string;
    measurement: string;
    concentration: any[];
}

export interface PostConcentSplitSave {
    type: string;
    id: string;
    measurement: string;
    memo: string;
    concentration: any[];
}

export interface PostFacePointSave {
    id: string;
    face_point_all: any[];
    face_angle_all: any[];
}

export interface GetIDPost {
    type: string;
    measurement: string;
    work: string;
    memo: string;
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
