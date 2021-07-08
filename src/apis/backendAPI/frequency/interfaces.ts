export interface InitMaxFrequency {
    user_id: number;
    max_frequency_data: {
        max_blink: number;
        max_face_move: number;
        ear_id: string;
        face_point_all: any[];
    };
    // environment: string;
    date: Date;
}

export interface InitMinFrequency {
    user_id: number;
    min_frequency_data: {
        min_blink: number;
        min_face_move: number;
        ear_id: string;
        face_point_all: any[];
    };
    // environment: string;
    date: Date;
}

export interface MaxFrequency {
    id: string;
    user_id: number;
    max_frequency_data: {
        max_blink: number;
        max_face_move: number;
        ear_id: string;
        face_point_all: any[];
    };
    // environment: string;
    date: Date;
}

export interface MinFrequency {
    id: string;
    user_id: number;
    min_frequency_data: {
        min_blink: number;
        min_face_move: number;
        ear_id: string;
        face_point_all: any[];
    };
    // environment: string;
    date: Date;
}

export interface GetFrequency {
    max_frequency: MaxFrequency[];
    min_frequency: MinFrequency[];
}

export interface BtoF {
    blink: number;
    face_move: number;
}
