import { GetEar } from "../ear/interfaces";
import { MaxFrequency, MinFrequency } from "../frequency/interfaces";

export interface SaveEnvironment {
    name: string;
    user_id: number;
    ear_id: string;
    max_freq_id: string;
    min_freq_id: string;
    date: Date;
}

export interface GetEnvironment {
    id: string;
    name: string;
    user_id: number;
    ear: GetEar;
    max_freq: MaxFrequency;
    min_freq: MinFrequency;
    date: Date;
}
