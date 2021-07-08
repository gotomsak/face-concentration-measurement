export const earLeftInitReducer = (
    state: number | null = 0,
    action: any
): any => {
    switch (action.type) {
        case "earLeftInitSet":
            state = action.earLeftInit;
            return state;
        case "earLeftInitReset":
            return 0;
        default:
            return state;
    }
};
