export const minFacePointReducer = (state: any = [], action: any): any => {
    switch (action.type) {
        case "minFacePointSet":
            state = action.face_point;
            return state;
        case "minFacePointReset":
            return [];
        default:
            return state;
    }
};
