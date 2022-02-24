import React, { useState, useEffect, useLayoutEffect } from "react";
import { Button, makeStyles, styled } from "@material-ui/core";
import { useHistory } from "react-router";
import { TopPageStyle, TopPageButton } from "../../Styles";
import TopMenuComponent from "../../components/TopMenuComponent";
import {
    adminCheckSession,
    adminSignout,
} from "../../apis/backendAPI/admin/userAuth";

const AdminTopPage: React.FC = () => {
    const history = useHistory();

    const classes = TopPageStyle();
    const [errorMessage, setErrorMessage] = useState("");
    useEffect(() => {
        console.log(errorMessage);
    }, [errorMessage]);

    useLayoutEffect(() => {
        adminCheckSession()
            .then((res) => {
                console.log(res);
            })
            .catch((error) => {
                console.log(error);
                history.push("/AdminSignin");
            });
    }, []);

    return (
        <div className={classes.root}>
            <h5>user_id: {localStorage.getItem("user_id")}</h5>
            <h1>admin</h1>
            <p>
                <TopPageButton
                    onClick={() => {
                        history.push("/AdminAnalysis");
                    }}
                >
                    分析
                </TopPageButton>
            </p>
            <p>
                <TopPageButton
                    onClick={() => {
                        history.push("/AdminSelectQuestion");
                    }}
                >
                    問題集作成
                </TopPageButton>
            </p>
            <p>
                <TopPageButton
                    onClick={() => {
                        history.push("/AdminAddQuestion");
                    }}
                >
                    問題の追加
                </TopPageButton>
            </p>
            <p>
                <TopPageButton
                    onClick={() => {
                        history.push("/AdminLearningAnalysis");
                    }}
                >
                    learning分析
                </TopPageButton>
            </p>
            <p>
                <TopPageButton
                    onClick={() => {
                        adminSignout()
                            .then((res) => {
                                history.push("/AdminSignin");
                                setErrorMessage("ok");
                            })
                            .catch((err) => {
                                setErrorMessage(err.data);
                            });
                    }}
                >
                    サインアウト
                </TopPageButton>
            </p>
        </div>
    );
};

export default AdminTopPage;
