export interface InitMaxFrequency {
    user_id: number;
    max_frequency_data: {
        max_blink: number;
        max_face_move: number;
        face_point_all: any[];
    };
    environment: string;
}

export interface InitMinFrequency {
    user_id: number;
    min_frequency_data: {
        min_blink: number;
        min_face_move: number;
        face_point_all: any[];
    };
    environment: string;
}

export interface BtoF {
    blink: number;
    face_move: number;
}
