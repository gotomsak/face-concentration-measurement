export const ansResultSectionIDReducer = (state: number = -1, action: any) => {
    switch (action.type) {
        case "ansResultSectionIDSet":
            console.log(action.id);
            return action.id;
        case "ansResultSectionIDReset":
            return -1;
        default:
            return state;
    }
};
