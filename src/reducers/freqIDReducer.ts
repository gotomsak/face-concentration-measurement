export interface freqID {
    max_freq_id: string;
    min_freq_id: string;
}

export const freqIDReducer = (
    state: freqID = {
        max_freq_id: "",
        min_freq_id: "",
    },
    action: any
) => {
    switch (action.type) {
        case "maxFreqIDSet":
            state.max_freq_id = action.max_freq_id;
            return state;
        case "minFreqIDSet":
            state.min_freq_id = action.min_freq_id;
            return state;
        case "freqIDReset":
            return [];
        default:
            return state;
    }
};
