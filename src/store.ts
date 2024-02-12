import { configureStore } from "@reduxjs/toolkit";
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
import { facePointIDReducer } from "./reducers/facePointIDReducer";
import { concIDReducer } from "./reducers/concIDReducer";
import { earLeftTReducer } from "./reducers/ear/earLeftTReducer";
import { earRightTReducer } from "./reducers/ear/earRightTReducer";
import { earLeftInitReducer } from "./reducers/ear/earLeftInitReducer";
import { earRightInitReducer } from "./reducers/ear/earRightInitReducer";
import { maxFacePointReducer } from "./reducers/frequency/maxFacePointReducer";
import { minFacePointReducer } from "./reducers/frequency/minFacePointReducer";
import { faceAngleReducer } from "./reducers/faceAngleReducer";
import { minFaceAngleReducer } from "./reducers/frequency/minFaceAngleReducer";
import { maxFaceAngleReducer } from "./reducers/frequency/maxFaceAngleReducer";

// import { earIDReducer } from "./reducers/ear/earIDReducer";
export default configureStore({
  reducer: {
    concReducer: concReducer,
    ansResultIDsReducer: ansResultIDsReducer,
    correctNumberReducer: correctNumberReducer,
    questionIDsReducer: questionIDsReducer,
    solvedIDsReducer: solvedIDsReducer,
    ansResultSectionIDReducer: ansResultSectionIDReducer,
    earLeftTReducer: earLeftTReducer,
    earRightTReducer: earRightTReducer,
    earLeftInitReducer: earLeftInitReducer,
    earRightInitReducer: earRightInitReducer,
    maxBlinkReducer: maxBlinkReducer,
    minBlinkReducer: minBlinkReducer,
    maxFaceMoveReducer: maxFaceMoveReducer,
    minFaceMoveReducer: minFaceMoveReducer,
    maxYawReducer: maxYawReducer,
    maxRollReducer: maxRollReducer,
    maxPitchReducer: maxPitchReducer,
    facePointReducer: facePointReducer,
    faceAngleReducer: faceAngleReducer,
    facePointIDReducer: facePointIDReducer,
    concIDReducer: concIDReducer,
    maxFacePointReducer: maxFacePointReducer,
    minFacePointReducer: minFacePointReducer,
    maxFaceAngleReducer: maxFaceAngleReducer,
    minFaceAngleReducer: minFaceAngleReducer,
  },
});

// concReducer,
// ansResultIDsReducer,
// correctNumberReducer,
// questionIDsReducer,
// solvedIDsReducer,
// ansResultSectionIDReducer,
// earLeftTReducer,
// earRightTReducer,
// earLeftInitReducer,
// earRightInitReducer,
// maxBlinkReducer,
// minBlinkReducer,
// maxFaceMoveReducer,
// minFaceMoveReducer,
// maxYawReducer,
// maxRollReducer,
// maxPitchReducer,
// facePointReducer,
// faceAngleReducer,
// facePointIDReducer,
// concIDReducer,
// maxFacePointReducer,
// minFacePointReducer,
// maxFaceAngleReducer,
// minFaceAngleReducer,
// router: connectRouter(histroy),
// }),
// // applyMiddleware(routerMiddleware(histroy))
// );
