import { getAction } from "connected-react-router";

export interface Conc {
  c1: any[];
  c2: any[];
  c3: any[];
  w: any[];
  date: any[];
  face_point_id: string;
  ear_id: string;
  max_freq_id: string;
  min_freq_id: string;
  environment_id: string;
}

export const concReducer = (
  state: Conc = {
    c1: [],
    c2: [],
    c3: [],
    w: [],
    date: [],
    face_point_id: "",
    ear_id: "",
    max_freq_id: "",
    min_freq_id: "",
    environment_id: "",
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

    case "earIDSet":
      state.ear_id = action.ear_id;
      return state;

    case "maxFreqIDSet":
      state.max_freq_id = action.max_freq_id;
      return state;

    case "minFreqIDSet":
      state.min_freq_id = action.min_freq_id;
      return state;

    case "freqIDReset":
      state.max_freq_id = "";
      state.min_freq_id = "";
      return state;

    case "facePointIDSet":
      state.face_point_id = action.face_point_id;
      return state;

    case "environmentIDSet":
      state.environment_id = action.environment_id;
      return state;

    case "concReset":
      state.c1 = [];
      state.c2 = [];
      state.c3 = [];
      state.w = [];
      state.date = [];

      return state;

    default:
      return state;
  }
};
