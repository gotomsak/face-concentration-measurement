export const concReducer = (state: any = [], action: any) => {
    switch (action.type) {
        case "concSet":
            return state.concat([action.conc]);
        case "concReset":
            return [];
        default:
            return state;
    }
};
