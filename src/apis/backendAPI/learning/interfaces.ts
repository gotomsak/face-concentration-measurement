export interface User {
    username?: string;
    email: string;
    password: string;
}

export interface GetQuestionIdsPost {
    solved_ids: number[];
    question_ids: number[];
}

export interface CheckAnswerPost {
    question_id: number;
    user_id: number;
    other_focus_second: number;
    user_answer: string;
    memo_log: string;
    concentration_data: any[];
    start_time: string;
    end_time: string;
}

export interface CheckAnswerSectionPost {
    user_id: number;
    answer_result_ids: number[];
    correct_answer_number: number;
    start_time: string;
    end_time: string;
}

export interface SaveQuestionnairePost {
    user_id: number;
    answer_result_section_id: number;
    concentration: number;
    while_doing: number;
    cheating: number;
    nonsense: number;
}

export interface InitMaxFrequency{
    user_id: number;
    max_blink_number: number;
    max_face_move_number: number;
    max_frequency_video?:Blob;
}

export interface InitMinFrequency{
    user_id: number;
    min_blink_number: number;
    min_face_move_number: number;
    min_frequency_video?:Blob;
}

export interface BtoF {
    blink: number;
    face_move: number;
}

export interface BtoFtoC {
    face_image_path: string;
    blink: number[];
    face_move: number[];
    angle: any[];
    c1: number[];
    c2: number[];
    c3: number[];
    w: number[];
}
export interface SonConc {
    face_image_path: string;
    concentration: any[];
}

export interface GetQuestionGymPost{
    now_level: number;
}