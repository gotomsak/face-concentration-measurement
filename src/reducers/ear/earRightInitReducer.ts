interface ERI {
    ear_right_init_list: any[];
    ear_right_init_t: null | number;
}
export const earRightInitReducer = (
    state: ERI = { ear_right_init_list: [], ear_right_init_t: null },
    action: any
): any => {
    switch (action.type) {
        case "earRightInitSet":
            state.ear_right_init_list = state.ear_right_init_list.concat([
                action.ear_right_init_list,
            ]);
            return state;

        case "earRightInitTSet":
            state.ear_right_init_t = action.ear_right_init_t;
            return state;

        case "earRightInitAllReset":
            state.ear_right_init_list = [];
            state.ear_right_init_t = null;
            return state;

        default:
            return state;
    }
};
