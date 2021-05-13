import React, { useState, useEffect, useLayoutEffect } from "react";
import { Button, makeStyles, styled } from "@material-ui/core";
import { useHistory } from "react-router";
import { TopPageStyle, TopPageButton } from "../Styles";
import TopMenuComponent from "../components/TopMenuComponent";
import { checkSession } from "../apis/backendAPI/userAuth";
import { signout } from "../apis/backendAPI/userAuth";

const TopPage: React.FC = () => {
    const history = useHistory();

    const classes = TopPageStyle();

    useLayoutEffect(() => {
        checkSession()
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                history.push("/Signin");
            });
    }, []);

    return (
        <div className={classes.root}>
            <h1>集中度測定器</h1>
            <TopMenuComponent></TopMenuComponent>
        </div>
    );
};

export default TopPage;
