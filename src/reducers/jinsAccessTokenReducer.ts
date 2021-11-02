export const jinsAccessTokenReducer = (
    state: string = "",
    action: any
): any => {
    switch (action.type) {
        case "jinsAccessTokenSet":
            state = action.jinsAccessToken;
            return state;
        case "jinsAccessTokenReset":
            return "";
        default:
            return state;
    }
};
