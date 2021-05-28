import React, { useState, useEffect, useLayoutEffect } from "react";
import { Button, makeStyles, styled } from "@material-ui/core";
import { useHistory } from "react-router";
import { TopPageStyle, TopPageButton } from "../../Styles";
import TopMenuComponent from "../../components/TopMenuComponent";
import { adminCheckSession } from "../../apis/backendAPI/admin/userAuth";

const AdminTopPage: React.FC = () => {
    const history = useHistory();

    const classes = TopPageStyle();

    useLayoutEffect(() => {
        adminCheckSession()
            .then((res) => {
                console.log(res);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <div className={classes.root}>
            <h5>user_id: {localStorage.getItem("user_id")}</h5>
            <h1>admin</h1>
            <TopPageButton
                onClick={() => {
                    history.push("/AdminAnalysis");
                }}
            >
                分析
            </TopPageButton>
        </div>
    );
};

export default AdminTopPage;
