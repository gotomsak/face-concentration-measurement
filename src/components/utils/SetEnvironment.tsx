import React, { useState, useEffect } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { TextField } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { RecordingPageStyle } from "../../Styles";
import { GetEnvironment } from "../../apis/backendAPI/environment/interfaces";

const SetEnvironment: React.FC<{ environments: GetEnvironment[] }> = ({
    environments,
}) => {
    const dispatch = useDispatch();
    const classes = RecordingPageStyle();
    return (
        <div className={classes.setFreqComp}>
            <div>
                <Autocomplete
                    id="combo-box-demo"
                    options={environments}
                    getOptionLabel={(option: GetEnvironment) =>
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
                        environments.forEach((element: GetEnvironment) => {
                            if (element.name.toString() === value) {
                                // console.log(store.getState().earLeftReducer);
                                console.log(element.id);
                                dispatch({
                                    type: "earIDSet",
                                    ear_id: element.id,
                                });
                                dispatch({
                                    type: "earRightSet",
                                    earRight: element.ear.right_ear,
                                });
                                dispatch({
                                    type: "earLeftSet",
                                    earLeft: element.ear.left_ear,
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
