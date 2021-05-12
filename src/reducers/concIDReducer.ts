export const concIDReducer = (state: string = "", action: any) => {
    switch (action.type) {
        case "concIDSet":
            state = action.conc_id;
            return state;

        case "concIDReset":
            return "";

        default:
            return state;
    }
};
