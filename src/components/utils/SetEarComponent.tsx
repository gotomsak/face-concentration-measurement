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
import { RecordingPageStyle, RecordingPageButton } from "../../Styles";
import store from "../..";
import { GetEar, InitEar } from "../../apis/backendAPI/ear/interfaces";
const SetEarComponent: React.FC<{ ears: GetEar[] }> = ({ ears }) => {
    const dispatch = useDispatch();
    const classes = RecordingPageStyle();
    return (
        <div className={classes.setFreqComp}>
            <div>
                <Autocomplete
                    id="combo-box-demo"
                    options={ears}
                    getOptionLabel={(option: GetEar) => option.date.toString()}
                    style={{ width: 300 }}
                    renderInput={(params: any) => (
                        <TextField
                            {...params}
                            label="earの日時設定"
                            variant="outlined"
                        />
                    )}
                    onInputChange={(e, value) => {
                        ears.forEach((element: GetEar) => {
                            if (element.date.toString() === value) {
                                console.log(store.getState().earLeftReducer);
                                console.log(element.id);
                                dispatch({
                                    type: "earIDSet",
                                    ear_id: element.id,
                                });
                                dispatch({
                                    type: "earRightSet",
                                    earRight: element.right_ear,
                                });
                                dispatch({
                                    type: "earLeftSet",
                                    earLeft: element.left_ear,
                                });
                            }
                        });
                        console.log(store.getState().earLeftReducer);
                    }}
                />
            </div>
        </div>
    );
};

export default React.memo(SetEarComponent);
