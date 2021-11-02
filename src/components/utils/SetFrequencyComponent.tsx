import React, { useState, useEffect } from "react";
import FormControl from "@material-ui/core/FormControl";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import AssignmentIcon from "@material-ui/icons/Assignment";
import Tooltip from "@material-ui/core/Tooltip";
import CopyToClipBoard from "react-copy-to-clipboard";
import IconButton from "@material-ui/core/IconButton";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles, styled, Button, TextField } from "@material-ui/core";

import { useSelector, useDispatch } from "react-redux";
import {
    RecordingPageStyle,
    RecordingPageButton,
    EnvironmentPageStyle,
} from "../../Styles";
import store from "../..";
import { GetFrequency } from "../../apis/backendAPI/frequency/interfaces";

const SetFrequencyComponent: React.FC<{ frequencys?: GetFrequency }> = ({
    frequencys,
}) => {
    const dispatch = useDispatch();

    return (
        <div>
            {frequencys ? (
                <div>
                    <p>
                        <Autocomplete
                            id="combo-box-demo"
                            options={frequencys.max_frequency}
                            getOptionLabel={(option: any) => option.date}
                            style={{ width: 300 }}
                            renderInput={(params: any) => (
                                <TextField
                                    {...params}
                                    label="最高頻度の計測日時"
                                    variant="outlined"
                                />
                            )}
                            onInputChange={(e, value) => {
                                frequencys.max_frequency.forEach(
                                    (element: any) => {
                                        if (element.date === value) {
                                            console.log(
                                                store.getState().maxBlinkReducer
                                            );
                                            console.log(element.id);
                                            dispatch({
                                                type: "maxFreqIDSet",
                                                max_freq_id: element.id,
                                            });
                                            // dispatch({
                                            //     type: "earLeftSet",
                                            //     earLeft: res.data.earData.left_ear,
                                            // });
                                            dispatch({
                                                type: "earIDSet",
                                                ear_id: element.ear_id,
                                            });
                                            // dispatch({
                                            //     type: "earRightSet",
                                            //     earRight: res.data.earData.right_ear,
                                            // });
                                            dispatch({
                                                type: "maxBlinkSet",
                                                maxBlink:
                                                    element[
                                                        "max_frequency_data"
                                                    ].max_blink,
                                            });
                                            dispatch({
                                                type: "maxFaceMoveSet",
                                                maxFaceMove:
                                                    element[
                                                        "max_frequency_data"
                                                    ].max_face_move,
                                            });
                                        }
                                    }
                                );
                                console.log(
                                    store.getState().maxFaceMoveReducer
                                );
                            }}
                        />
                    </p>
                    <p>
                        <Autocomplete
                            id="combo-box-demo"
                            options={frequencys.min_frequency}
                            getOptionLabel={(option: any) => option.date}
                            style={{ width: 300 }}
                            renderInput={(params: any) => (
                                <TextField
                                    {...params}
                                    label="最低頻度の計測日時"
                                    variant="outlined"
                                />
                            )}
                            onInputChange={(e, value) => {
                                frequencys.min_frequency.forEach(
                                    (element: any) => {
                                        if (element.date === value) {
                                            console.log(
                                                store.getState().minBlinkReducer
                                            );
                                            console.log(
                                                element["min_frequency_data"]
                                                    .min_blink
                                            );
                                            dispatch({
                                                type: "minFreqIDSet",
                                                min_freq_id: element.id,
                                            });
                                            dispatch({
                                                type: "minBlinkSet",
                                                minBlink:
                                                    element[
                                                        "min_frequency_data"
                                                    ].min_blink,
                                            });
                                            dispatch({
                                                type: "minFaceMoveSet",
                                                minFaceMove:
                                                    element[
                                                        "min_frequency_data"
                                                    ].min_face_move,
                                            });
                                        }
                                    }
                                );
                                console.log(
                                    store.getState().minFaceMoveReducer
                                );
                            }}
                        />
                    </p>
                </div>
            ) : (
                <div>nofrecuency</div>
            )}
        </div>
    );
};

export default React.memo(SetFrequencyComponent);
