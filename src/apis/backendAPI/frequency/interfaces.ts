export interface InitMaxFrequency {
    user_id: number;
    max_frequency_data: {
        max_blink: number;
        max_face_move: number;
        ear_id: string;
        face_point_all: any[];
        face_angle_all: any[];
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
        face_angle_all: any[];
    };
    // environment: string;
    date: Date;
}

export interface ReMaxFrequency {
    user_id: number;
    separation_num: number;
    max_frequency_data: {
        max_blink: number;
        max_face_move: number;
        ear_id: string;
        face_point_all: any[];
        face_angle_all: any[];
    };
    environment_id: string;
    root_max_freq_id: string;
    date: Date;
}

export interface ReMinFrequency {
    user_id: number;
    separation_num: number;
    min_frequency_data: {
        min_blink: number;
        min_face_move: number;
        ear_id: string;
        face_point_all: any[];
        face_angle_all: any[];
    };
    environment_id: string;
    root_min_freq_id: string;
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
        face_angle_all: any[];
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
        face_angle_all: any[];
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
