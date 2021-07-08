export const earRightReducer = (
    state: number | null = 0.25,
    action: any
): any => {
    switch (action.type) {
        case "earRightSet":
            state = action.earRight;
            return state;
        case "earRightReset":
            return 0.25;
        default:
            return state;
    }
};
