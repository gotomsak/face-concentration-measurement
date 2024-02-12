import React, { useState, useEffect } from "react";
import { TopPageStyle, TopPageButton } from "../Styles";
import { NavigateFunction, useNavigate } from "react-router";
import { signout } from "../apis/backendAPI/userAuth";

const TopMenuComponent: React.FC = () => {
  const navigate: NavigateFunction = useNavigate();
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
            navigate("/EarInit");
          }}
        >
          EAR初期化
        </TopPageButton>
      </p>
      <p>
        <TopPageButton
          onClick={() => {
            navigate("/Frequency");
          }}
        >
          頻度初期化
        </TopPageButton>
      </p>
      <p>
        <TopPageButton
          onClick={() => {
            navigate("/Environment");
          }}
        >
          環境設定
        </TopPageButton>
      </p>
      <p>
        <TopPageButton
          onClick={() => {
            navigate("/Recording");
          }}
        >
          集中度測定
        </TopPageButton>
      </p>

      <p>
        <TopPageButton
          onClick={() => {
            navigate("/Learning");
          }}
        >
          E-learning
        </TopPageButton>
      </p>
      <p>
        <TopPageButton
          onClick={() => {
            navigate("/Mathwork");
          }}
        >
          計算問題
        </TopPageButton>
      </p>

      <p>
        <TopPageButton
          onClick={() => {
            navigate("/Analysis");
          }}
        >
          分析
        </TopPageButton>
      </p>
      <p>
        <TopPageButton
          onClick={() => {
            navigate("/Manual");
          }}
        >
          使い方
        </TopPageButton>
      </p>
      <p>
        <TopPageButton
          onClick={() => {
            signout()
              .then((res: any) => {
                navigate("/signin");
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
