import React, { useState, useEffect } from "react";
import { TopPageStyle, TopPageButton } from "../Styles";
import { useHistory } from "react-router";
import { signout } from "../apis/backendAPI/userAuth";

const TopMenuComponent: React.FC = () => {
    const history = useHistory();
    const classes = TopPageStyle();
    const [errorMessage, setErrorMessage] = useState("");
    useEffect(() => {
        console.log(errorMessage);
    }, [errorMessage]);

    return (
        <div className={classes.menu}>
            <p>
                <TopPageButton
                    onClick={() => {
                        history.push("/EarInit");
                    }}
                >
                    EAR初期化
                </TopPageButton>
            </p>
            <p>
                <TopPageButton
                    onClick={() => {
                        history.push("/Frequency");
                    }}
                >
                    頻度初期化
                </TopPageButton>
            </p>
            <p>
                <TopPageButton
                    onClick={() => {
                        history.push("/Environment");
                    }}
                >
                    環境設定
                </TopPageButton>
            </p>
            <p>
                <TopPageButton
                    onClick={() => {
                        history.push("/Recording");
                    }}
                >
                    集中度測定
                </TopPageButton>
            </p>

            <p>
                <TopPageButton
                    onClick={() => {
                        history.push("/Learning");
                    }}
                >
                    E-learning
                </TopPageButton>
            </p>
            <p>
                <TopPageButton
                    onClick={() => {
                        history.push("/Mathwork");
                    }}
                >
                    計算問題
                </TopPageButton>
            </p>
            <p>
                <TopPageButton
                    onClick={() => {
                        history.push("/Analysis");
                    }}
                >
                    分析
                </TopPageButton>
            </p>
            <p>
                <TopPageButton
                    onClick={() => {
                        history.push("/Manual");
                    }}
                >
                    使い方
                </TopPageButton>
            </p>
            <p>
                <TopPageButton
                    onClick={() => {
                        signout()
                            .then((res) => {
                                history.push("/signin");
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
export default TopMenuComponent;
