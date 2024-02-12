import React, { useState, useEffect, useLayoutEffect } from "react";
import { Button, makeStyles, styled } from "@material-ui/core";
import { NavigateFunction, useNavigate } from "react-router";
import { TopPageStyle, TopPageButton } from "../../Styles";
import TopMenuComponent from "../../components/TopMenuComponent";
import {
  adminCheckSession,
  adminSignout,
} from "../../apis/backendAPI/admin/userAuth";

const AdminTopPage: React.FC = () => {
  const navigate: NavigateFunction = useNavigate();

  const classes = TopPageStyle();
  const [errorMessage, setErrorMessage] = useState("");
  useEffect(() => {
    console.log(errorMessage);
  }, [errorMessage]);

  useLayoutEffect(() => {
    adminCheckSession()
      .then((res: any) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
        navigate("/AdminSignin");
      });
  }, []);

  return (
    <div className={classes.root}>
      <h5>user_id: {localStorage.getItem("user_id")}</h5>
      <h1>admin</h1>
      <p>
        <TopPageButton
          onClick={() => {
            navigate("/AdminAnalysis");
          }}
        >
          分析
        </TopPageButton>
      </p>
      <p>
        <TopPageButton
          onClick={() => {
            navigate("/AdminSelectQuestion");
          }}
        >
          問題集作成
        </TopPageButton>
      </p>
      <p>
        <TopPageButton
          onClick={() => {
            navigate("/AdminLearningAnalysis");
          }}
        >
          learning分析
        </TopPageButton>
      </p>
      <p>
        <TopPageButton
          onClick={() => {
            adminSignout()
              .then((res: any) => {
                navigate("/AdminSignin");
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
