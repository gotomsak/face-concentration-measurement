export const minBlinkReducer = (
    state: number | null = null,
    action: any
): any => {
    switch (action.type) {
        case "minBlinkSet":
            state = action.minBlink;
            return state;
        case "minBlinkReset":
            return 0;
        default:
            return state;
    }
};
