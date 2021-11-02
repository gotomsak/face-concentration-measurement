export const maxFacePointReducer = (state: any = [], action: any): any => {
    switch (action.type) {
        case "maxFacePointSet":
            state = action.face_point;
            return state;
        case "maxFacePointReset":
            return [];
        default:
            return state;
    }
};
