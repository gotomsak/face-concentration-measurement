export const facePointReducer = (state: any = [], action: any): any => {
    switch (action.type) {
        case "facePointSet":
            state = state.concat([action.face_point]);
            return state;
        case "facePointReset":
            return 0;
        default:
            return state;
    }
};
