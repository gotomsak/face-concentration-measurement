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
import store from "../..";
const SetFrequencyComponent: React.FC<{ frequencys: any }> = ({
    frequencys,
}) => {
    const dispatch = useDispatch();
    return (
        <div>
            <Autocomplete
                id="combo-box-demo"
                options={frequencys.data["max_frequency"]}
                getOptionLabel={(option: any) => option.environment}
                style={{ width: 300 }}
                renderInput={(params: any) => (
                    <TextField
                        {...params}
                        label="システムの選択"
                        variant="outlined"
                    />
                )}
                onInputChange={(e, value) => {
                    frequencys.data["max_frequency"].forEach((element: any) => {
                        if (element.environment === value) {
                            console.log(store.getState().maxBlinkReducer);
                            console.log(
                                element["max_frequency_data"].max_blink
                            );
                            dispatch({
                                type: "maxFreqIDSet",
                                action: element["max_frequency_data"].id,
                            });
                            dispatch({
                                type: "maxBlinkSet",
                                maxBlink:
                                    element["max_frequency_data"].max_blink,
                            });
                            dispatch({
                                type: "maxFaceMoveSet",
                                maxFaceMove:
                                    element["max_frequency_data"].max_face_move,
                            });
                        }
                    });
                    console.log(store.getState().maxFaceMoveReducer);
                }}
            />

            <Autocomplete
                id="combo-box-demo"
                options={frequencys.data["min_frequency"]}
                getOptionLabel={(option: any) => option.environment}
                style={{ width: 300 }}
                renderInput={(params: any) => (
                    <TextField
                        {...params}
                        label="システムの選択"
                        variant="outlined"
                    />
                )}
                onInputChange={(e, value) => {
                    frequencys.data["min_frequency"].forEach((element: any) => {
                        if (element.environment === value) {
                            console.log(store.getState().minBlinkReducer);
                            console.log(
                                element["min_frequency_data"].min_blink
                            );
                            dispatch({
                                type: "minFreqIDSet",
                                action: element["min_frequency_data"].id,
                            });
                            dispatch({
                                type: "minBlinkSet",
                                minBlink:
                                    element["min_frequency_data"].min_blink,
                            });
                            dispatch({
                                type: "minFaceMoveSet",
                                minFaceMove:
                                    element["min_frequency_data"].min_face_move,
                            });
                        }
                    });
                    console.log(store.getState().minFaceMoveReducer);
                }}
            />
        </div>
    );
};

export default SetFrequencyComponent;