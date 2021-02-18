export interface SaveConcentrationPost {
    type: string;
    id: number;
    measurement: string;
    concentration_data: any[]
}

export interface GetSaveImagesIDGet{
    type: string
}

export interface GetSaveImagesIDRes{
    id: number
}