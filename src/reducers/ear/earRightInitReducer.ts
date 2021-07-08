export const earRightInitReducer = (
    state: number | null = 0,
    action: any
): any => {
    switch (action.type) {
        case "earRightInitSet":
            state = action.earRightInit;
            return state;
        case "earRightInitReset":
            return 0;
        default:
            return state;
    }
};
