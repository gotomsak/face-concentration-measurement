export const earRightTReducer = (
    state: number | null = 0.25,
    action: any
): any => {
    switch (action.type) {
        case "earRightSet":
            state = action.earRightT;
            return state;
        case "earRightReset":
            return 0.25;
        default:
            return state;
    }
};
