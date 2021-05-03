export interface InitMaxFrequency {
    user_id: number;
    max_blink_number: number;
    max_face_move_number: number;
    max_frequency_video?: Blob;
}

export interface InitMinFrequency {
    user_id: number;
    min_blink_number: number;
    min_face_move_number: number;
    min_frequency_video?: Blob;
}

export interface BtoF {
    blink: number;
    face_move: number;
}
