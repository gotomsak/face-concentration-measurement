export function correctNumberReducer(state: number = 0, action: any) {
    switch (action.type) {
        case "correctNumberSet":
            return state + 1;
        case "correctNumberReset":
            return 0;
        default:
            return state;
    }
}
