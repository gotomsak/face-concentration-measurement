import { getAction } from "connected-react-router";

export interface Conc {
    c1: any[];
    c2: any[];
    c3: any[];
    w: any[];
    date: any[];
    face_point: string;
    freq_id: string;
}

export const concReducer = (
    state: Conc = {
        c1: [],
        c2: [],
        c3: [],
        w: [],
        date: [],
        face_point: "",
        freq_id: "",
    },
    action: any
): any => {
    switch (action.type) {
        case "concSet":
            state.c1 = state.c1.concat([action.conc.c1]);
            state.c2 = state.c2.concat([action.conc.c2]);
            state.c3 = state.c3.concat([action.conc.c3]);
            state.w = state.w.concat([action.conc.w]);
            state.date = state.date.concat([action.conc.date]);

            return state;

        case "freqIDSet":
            state.freq_id = action.freq_id;

            return state;

        case "facePointIDSet":
            state.face_point = action.face_point;
            return state;

        case "concReset":
            return [];

        default:
            return state;
    }
};
