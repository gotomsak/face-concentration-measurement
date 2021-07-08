export interface InitEar {
    user_id: number;
    right_ear: number;
    left_ear: number;
    date: Date;
}

export interface GetEar {
    id: number;
    user_id: number;
    right_ear: number;
    left_ear: number;
    date: Date;
    // environment: string;
}
