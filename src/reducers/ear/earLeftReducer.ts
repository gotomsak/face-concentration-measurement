export const earLeftReducer = (
    state: number | null = 0.25,
    action: any
): any => {
    switch (action.type) {
        case "earLeftSet":
            state = action.earLeft;
            return state;
        case "earLeftReset":
            return 0.25;
        default:
            return state;
    }
};
