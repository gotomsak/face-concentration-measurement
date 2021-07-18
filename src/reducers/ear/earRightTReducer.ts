export const earRightTReducer = (
    state: number | null = 0.25,
    action: any
): any => {
    switch (action.type) {
        case "earRightTSet":
            state = action.earRightT;
            return state;
        case "earRightTReset":
            return 0.25;
        default:
            return state;
    }
};
