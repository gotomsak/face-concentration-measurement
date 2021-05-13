export const ansResultIDsReducer = (state: number[] = [], action: any) => {
    switch (action.type) {
        case "ansResultIDSet":
            console.log(action.id);
            return state.concat([action.id]);
        case "ansResultIDsReset":
            return [];
        default:
            return state;
    }
};
