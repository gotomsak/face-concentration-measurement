// export interface concViewFormat{
//     x: Date
//     y:
// }

export interface concViewDataType {
    name: string;
    data: any;
    // work: string;
    // max_freq_id: string;
    // min_freq_id: string;
    // datas: any[];
}

export interface concToCorrectDataType{
    name: string;
    type: string;
    data: any;
}

export interface maxFreqViewDataType {
    max_blink: number | null;
    max_face_move: number | null;
}

export interface minFreqViewDataType {
    min_blink: number | null;
    min_face_move: number | null;
}
