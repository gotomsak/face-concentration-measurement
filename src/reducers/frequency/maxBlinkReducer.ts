export const maxBlinkReducer = (
    state: number | null = null,
    action: any
): any => {
    switch (action.type) {
        case "maxBlinkSet":
            state = action.maxBlink;
            return state;
        case "maxBlinkReset":
            return null;
        default:
            return state;
    }
};
