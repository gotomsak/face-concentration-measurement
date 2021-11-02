export const maxFaceAngleReducer = (
    state: number | null = null,
    action: any
): any => {
    switch (action.type) {
        case "maxFaceAngleSet":
            state = action.face_angle;
            return state;
        case "maxFaceAngleReset":
            return 0;
        default:
            return state;
    }
};
