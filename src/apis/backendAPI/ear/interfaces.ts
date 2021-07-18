export interface InitEar {
    user_id: number;
    right_ear_list: any[];
    right_ear_t: number;

    left_ear_list: any[];
    left_ear_t: number;
    date: Date;
}

export interface GetEar {
    id: number;
    user_id: number;
    right_ear_list: any[];
    right_ear_t: number;

    left_ear_list: any[];
    left_ear_t: number;
    date: Date;
    // environment: string;
}
