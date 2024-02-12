import React, { useState, useEffect, useLayoutEffect } from "react";
import { Button, makeStyles, styled } from "@material-ui/core";
import { NavigateFunction, useNavigate } from "react-router";
import { TopPageStyle, TopPageButton } from "../Styles";
import TopMenuComponent from "../components/TopMenuComponent";
import { checkSession } from "../apis/backendAPI/userAuth";
import { signout } from "../apis/backendAPI/userAuth";
import { getJinsMemeToken } from "../apis/backendAPI/jinsmeme/getJinsMemeToken";
import { useDispatch } from "react-redux";

const TopPage: React.FC = (props: any) => {
  const navigate: NavigateFunction = useNavigate();

  const classes = TopPageStyle();
  const [error, setError] = useState();
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("jinsAccessToken")
  );
  const [queryParams, setQueryParams] = useState(
    new URLSearchParams(window.location.search)
  );
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    checkSession()
      .then((response: any) => {
        console.log(response);
      })
      .catch((error: any) => {
        navigate("/Signin");
      });
  }, []);
  // useEffect(() => {
  //     console.log(queryParams.get("code"));
  //     if (queryParams.get("code") != null) {
  //         getJinsMemeToken({
  //             code: queryParams.get("code"),
  //             user_id: Number(localStorage.getItem("user_id")),
  //         }).then((res:any) => {
  //             dispatch({
  //                 type: "jinsAccessTokenSet",
  //                 jinsAccessTokenSet: res.data.access_token,
  //             });
  //         });
  //     }
  // }, []);

  return (
    <div className={classes.root}>
      <h5>user_id: {localStorage.getItem("user_id")}</h5>
      <h1>集中度測定器</h1>
      <TopMenuComponent></TopMenuComponent>
      {/* <p>
                <div>
                    {error && `Error occurred: ${error}`}
                    {!token && (
                        <div
                            onClick={() => {
                                window.location.href =
                                    "https://accounts.jins.com/jp/ja/oauth/authorize?response_type=code&client_id=395372689910613&redirect_uri=https://fland.kait-matsulab.com/callback&state=nyan&scope=official&service_id=meme";
                            }}
                        >
                            login with JinsMeme
                        </div>
                    )}
                    {token && ` Your Saved Tracks: ${JSON.stringify(token)}`}
                </div>
            </p> */}
    </div>
  );
};

export default TopPage;
