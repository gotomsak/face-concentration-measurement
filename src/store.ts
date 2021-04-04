import {
    createStore as reduxCreateStore,
    combineReducers,
    applyMiddleware,
} from "redux";
import { routerMiddleware, connectRouter } from "connected-react-router";
import { concReducer } from "./reducers/concReducer";
export default function createStore(histroy: any) {
    return reduxCreateStore(
        combineReducers({
            concReducer,
            router: connectRouter(histroy),
        }),
        applyMiddleware(routerMiddleware(histroy))
    );
}
