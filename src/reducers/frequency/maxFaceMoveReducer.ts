export const maxFaceMoveReducer = (
    state: number | null = null,
    action: any
): any => {
    switch (action.type) {
        case "maxFaceMoveSet":
            state = action.maxFaceMove;
            return state;
        case "maxFaceMoveReset":
            return 0;
        default:
            return state;
    }
};
