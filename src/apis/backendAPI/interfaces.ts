export interface SaveConcentrationPost {
    type: string;
    id: string;
    measurement: string;
    concentration: any[];
}

export interface GetIDGet {
    type: string;
    measurement: string;
    concentration: any[];
}

export interface GetSaveImagesIDGet {
    type: string;
}

export interface GetSaveImagesIDRes {
    id: string;
}
