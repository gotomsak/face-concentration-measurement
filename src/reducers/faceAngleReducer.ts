export const faceAngleReducer = (state: any = [], action: any): any => {
    switch (action.type) {
        case "faceAngleSet":
            state = state.concat([action.face_angle]);
            return state;
        case "faceAngleReset":
            return [];
        default:
            return state;
    }
};
