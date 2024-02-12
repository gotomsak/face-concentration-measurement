import React, { useState, useEffect } from "react";
import FormControl from "@material-ui/core/FormControl";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import AssignmentIcon from "@mui/icons-material/Assignment";
import Tooltip from "@material-ui/core/Tooltip";
import CopyToClipBoard from "react-copy-to-clipboard";
import IconButton from "@material-ui/core/IconButton";

import { makeStyles, styled, Button, TextField } from "@material-ui/core";

import { useSelector, useDispatch } from "react-redux";
import {
  RecordingPageStyle,
  RecordingPageButton,
  EnvironmentPageStyle,
} from "../../Styles";
import store from "../../store";
import { GetEar, InitEar } from "../../apis/backendAPI/ear/interfaces";
import { Autocomplete } from "@mui/material";
const SetEarComponent: React.FC<{ ears: GetEar[] }> = ({ ears }) => {
  const dispatch = useDispatch();

  return (
    <div>
      <div>
        <Autocomplete
          id="combo-box-demo"
          options={ears}
          getOptionLabel={(option: GetEar) => option.date.toString()}
          style={{ width: 300 }}
          renderInput={(params: any) => (
            <TextField {...params} label="earの日時設定" variant="outlined" />
          )}
          onInputChange={(e, value) => {
            ears.forEach((element: GetEar) => {
              if (element.date.toString() === value) {
                dispatch({
                  type: "earIDSet",
                  ear_id: element.id,
                });
                dispatch({
                  type: "earRightTSet",
                  earRightT: element.right_ear_t,
                });
                dispatch({
                  type: "earLeftTSet",
                  earLeftT: element.left_ear_t,
                });
              }
            });
            console.log(store.getState().earLeftTReducer);
          }}
        />
      </div>
    </div>
  );
};

export default React.memo(SetEarComponent);
