import {
    createStore as reduxCreateStore,
    combineReducers,
    applyMiddleware,
} from "redux";
import { routerMiddleware, connectRouter } from "connected-react-router";
import { concReducer } from "./reducers/concReducer";
import { ansResultIDsReducer } from "./reducers/learning/ansResultIDsReducer";
import { correctNumberReducer } from "./reducers/learning/correctNumberReducer";
import { questionIDsReducer } from "./reducers/learning/questionIDsReducer";
import { solvedIDsReducer } from "./reducers/learning/solvedIDsReducer";
import { ansResultSectionIDReducer } from "./reducers/learning/ansResultSectionIDReducer";

export default function createStore(histroy: any) {
    return reduxCreateStore(
        combineReducers({
            concReducer,
            ansResultIDsReducer,
            correctNumberReducer,
            questionIDsReducer,
            solvedIDsReducer,
            ansResultSectionIDReducer,
            router: connectRouter(histroy),
        }),
        applyMiddleware(routerMiddleware(histroy))
    );
}
