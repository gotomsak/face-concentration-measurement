export const minFaceAngleReducer = (
    state: number | null = null,
    action: any
): any => {
    switch (action.type) {
        case "minFaceAngleSet":
            state = action.face_angle;
            return state;
        case "minFaceAngleReset":
            return 0;
        default:
            return state;
    }
};
