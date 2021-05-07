export const maxRollReducer = (
    state: number | null = null,
    action: any
): any => {
    switch (action.type) {
        case "maxRollSet":
            state = action.maxRoll;
            return state;
        case "maxRollReset":
            return 0;
        default:
            return state;
    }
};
