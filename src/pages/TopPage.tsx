import React, { useState, useEffect } from "react";
import { Button, makeStyles, styled } from "@material-ui/core";
import { useHistory } from "react-router";

const TopPage: React.FC = () => {
    const history = useHistory();
    const useStyles = makeStyles({
        root: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            // textAlign: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
        },
    });
    const MyButton = styled(Button)({
        height: 50,
        width: 200,
        background: "rgb(38.6%, 88.8%, 100%)",
        // variant: "contained",
        color: "primary",
        size: "medium",
        fontWeight: 800,
    });
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <h1>集中度測定器</h1>
            <p>
                <MyButton
                    onClick={() => {
                        history.push("/Recording");
                    }}
                >
                    開始
                </MyButton>
            </p>
            <p>
                <MyButton>使い方</MyButton>
            </p>
        </div>
    );
};

export default TopPage;
