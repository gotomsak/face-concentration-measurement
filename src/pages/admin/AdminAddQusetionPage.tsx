import {
    TextField,
    Box,
    InputProps,
    PropTypes,
    BoxProps,
    InputBaseProps,
    InputBaseComponentProps,
    createMuiTheme,
} from "@material-ui/core";

import React, { useState, useEffect, useLayoutEffect } from "react";
import { SaveAddQuestionReq } from "../../apis/backendAPI/admin/interfaces";
import { InputAdornment } from "@material-ui/core";
import { PropsFunc, StylesContext } from "@material-ui/styles";
import { AdminAddQuestionPageStyle } from "../../Styles";

const AdminAddQuestionPage: React.FC = () => {
    const classes = AdminAddQuestionPageStyle();
    const [saveAddQuestionData, setSaveAddQuestionData] =
        useState<SaveAddQuestionReq>({
            question: null,
            qimg_path: null,
            mistake1: null,
            mistake2: null,
            mistake3: null,
            ans: null,
            mimage_path1: null,
            mimage_path2: null,
            mimage_path3: null,
            aimg_path: null,
            season: null,
            question_num: null,
            genre: null,
        });

    return (
        <div className={classes.root}>
            <h1>問題の追加</h1>

            <div className={classes.overTextFiled}>
                <TextField
                    className={classes.textFiled}
                    id="standard-multiline-flexible"
                    label="Multiline"
                    // multiline
                    fullWidth
                    value={saveAddQuestionData.question}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        saveAddQuestionData.question = e.target.value;
                    }}
                    rows={3}
                    // inputProps={inputProps}
                    variant="standard"
                />
            </div>
        </div>
    );
};

export default AdminAddQuestionPage;
