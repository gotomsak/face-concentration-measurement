export const maxPitchReducer = (
    state: number | null = null,
    action: any
): any => {
    switch (action.type) {
        case "maxPitchSet":
            state = action.maxPitch;
            return state;
        case "maxPitchReset":
            return 0;
        default:
            return state;
    }
};
