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

export interface maxFreqViewDataType {
    max_blink: number;
    max_face_move: number;
}

export interface minFreqViewDataType {
    min_blink: number;
    min_face_move: number;
}
