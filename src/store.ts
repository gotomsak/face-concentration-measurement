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
import { maxBlinkReducer } from "./reducers/frequency/maxBlinkReducer";
import { minBlinkReducer } from "./reducers/frequency/minBlinkReducer";
import { maxFaceMoveReducer } from "./reducers/frequency/maxFaceMoveReducer";
import { minFaceMoveReducer } from "./reducers/frequency/minFaceMoveReducer";
import { maxYawReducer } from "./reducers/frequency/maxYawReducer";
import { maxRollReducer } from "./reducers/frequency/maxRollReducer";
import { maxPitchReducer } from "./reducers/frequency/maxPitchReducer";
import { facePointReducer } from "./reducers/frequency/facePointReducer";

export default function createStore(histroy: any) {
    return reduxCreateStore(
        combineReducers({
            concReducer,
            ansResultIDsReducer,
            correctNumberReducer,
            questionIDsReducer,
            solvedIDsReducer,
            ansResultSectionIDReducer,
            maxBlinkReducer,
            minBlinkReducer,
            maxFaceMoveReducer,
            minFaceMoveReducer,
            maxYawReducer,
            maxRollReducer,
            maxPitchReducer,
            facePointReducer,
            router: connectRouter(histroy),
        }),
        applyMiddleware(routerMiddleware(histroy))
    );
}
