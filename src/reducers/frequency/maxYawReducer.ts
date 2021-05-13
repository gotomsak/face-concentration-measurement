export const maxYawReducer = (
    state: number | null = null,
    action: any
): any => {
    switch (action.type) {
        case "maxYawSet":
            state = action.maxYaw;
            return state;
        case "maxYawReset":
            return 0;
        default:
            return state;
    }
};
