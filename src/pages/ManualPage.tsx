import React, { useState, useEffect } from "react";
import MarkDownViewComponent from "../components/learning/MarkDownViewComponent";

import raw from "raw.macro";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { findByLabelText } from "@testing-library/react";

const markdown = raw("../manual/README.md");
const ManualPage: React.FC = () => {
    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            root: {
                display: "flex",
                textAlign: "left",
            },
        })
    );
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <MarkDownViewComponent text={markdown}></MarkDownViewComponent>
        </div>
    );
};

export default ManualPage;
