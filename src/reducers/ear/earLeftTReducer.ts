export const earLeftTReducer = (
    state: number | null = 0.25,
    action: any
): any => {
    switch (action.type) {
        case "earLeftTSet":
            state = action.earLeftT;
            return state;
        case "earLeftTReset":
            return 0.25;
        default:
            return state;
    }
};
