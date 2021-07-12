interface ELI {
    ear_left_init_list: any[];
    ear_left_init_t: null | number;
}
export const earLeftInitReducer = (
    state: ELI = { ear_left_init_list: [], ear_left_init_t: null },
    action: any
): any => {
    switch (action.type) {
        case "earLeftInitSet":
            state.ear_left_init_list = state.ear_left_init_list.concat([
                action.ear_left_init_list,
            ]);
            return state;

        case "earLeftInitTSet":
            state.ear_left_init_t = action.ear_left_init_t;
            return state;

        case "earLeftInitAllReset":
            state.ear_left_init_list = [];
            state.ear_left_init_t = null;
            return state;

        default:
            return state;
    }
};
