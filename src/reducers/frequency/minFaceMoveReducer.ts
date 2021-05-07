export const minFaceMoveReducer = (
    state: number | null = null,
    action: any
): any => {
    switch (action.type) {
        case "minFaceMoveSet":
            state = action.minFaceMove;
            return state;
        case "minFaceMoveReset":
            return 0;
        default:
            return state;
    }
};
