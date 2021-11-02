import React, { useState, useEffect } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { TextField } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { RecordingPageStyle } from "../../Styles";
import { GetEnvironment } from "../../apis/backendAPI/environment/interfaces";
import { environments } from "../../apis/backendAPI/admin/interfaces";

const SetEnvironment: React.FC<{
    environments: environments[];
    reFreq: boolean;
}> = ({ environments, reFreq }) => {
    const dispatch = useDispatch();
    const classes = RecordingPageStyle();
    return (
        <div className={classes.setFreqComp}>
            <div>
                <Autocomplete
                    id="combo-box-demo"
                    options={environments}
                    getOptionLabel={(option: environments) =>
                        option.name.toString()
                    }
                    style={{ width: 300 }}
                    renderInput={(params: any) => (
                        <TextField
                            {...params}
                            label="環境の設定"
                            variant="outlined"
                        />
                    )}
                    onInputChange={(e, value) => {
                        environments.forEach((element: environments) => {
                            if (element.name.toString() === value) {
                                // console.log(store.getState().earLeftReducer);
                                console.log(element.id);
                                dispatch({
                                    type: "earIDSet",
                                    ear_id: element.id,
                                });
                                dispatch({
                                    type: "earRightTSet",
                                    earRightT: element.ear.right_ear_t,
                                });
                                dispatch({
                                    type: "earLeftTSet",
                                    earLeftT: element.ear.left_ear_t,
                                });
                                dispatch({
                                    type: "maxBlinkSet",
                                    maxBlink:
                                        element.max_freq.max_frequency_data
                                            .max_blink,
                                });
                                dispatch({
                                    type: "minBlinkSet",
                                    minBlink:
                                        element.min_freq.min_frequency_data
                                            .min_blink,
                                });
                                dispatch({
                                    type: "maxFaceMoveSet",
                                    maxFaceMove:
                                        element.max_freq.max_frequency_data
                                            .max_face_move,
                                });
                                dispatch({
                                    type: "minFaceMoveSet",
                                    minFaceMove:
                                        element.min_freq.min_frequency_data
                                            .min_face_move,
                                });
                                dispatch({
                                    type: "maxFreqIDSet",
                                    max_freq_id: element.max_freq.id,
                                });
                                dispatch({
                                    type: "minFreqIDSet",
                                    min_freq_id: element.min_freq.id,
                                });
                                dispatch({
                                    type: "environmentIDSet",
                                    environment_id: element.id,
                                });
                                if (reFreq) {
                                    console.log("freqdesu");
                                    console.log(
                                        element.max_freq.max_frequency_data
                                            .face_point_all
                                    );
                                    dispatch({
                                        type: "maxFacePointSet",
                                        face_point:
                                            element.max_freq.max_frequency_data
                                                .face_point_all,
                                    });
                                    dispatch({
                                        type: "minFacePointSet",
                                        face_point:
                                            element.min_freq.min_frequency_data
                                                .face_point_all,
                                    });
                                    if (
                                        element.max_freq.max_frequency_data
                                            .face_angle_all !== undefined
                                    ) {
                                        dispatch({
                                            type: "maxFaceAngleSet",
                                            face_angle:
                                                element.max_freq
                                                    .max_frequency_data
                                                    .face_angle_all,
                                        });
                                    }
                                    if (
                                        element.min_freq.min_frequency_data
                                            .face_angle_all !== undefined
                                    ) {
                                        dispatch({
                                            type: "minFaceAngleSet",
                                            face_angle:
                                                element.min_freq
                                                    .min_frequency_data
                                                    .face_angle_all,
                                        });
                                    }
                                }
                            }
                        });
                        // console.log(store.getState().earLeftReducer);
                    }}
                />
            </div>
        </div>
    );
};

export default SetEnvironment;
