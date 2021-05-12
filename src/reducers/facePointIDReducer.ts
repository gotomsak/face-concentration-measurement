export const facePointIDReducer = (state: string = "", action: any) => {
    switch (action.type) {
        case "facePointIDSet":
            state = action.face_point_id;
            return state;
        case "facePointIDReset":
            return "";
        default:
            return state;
    }
};
