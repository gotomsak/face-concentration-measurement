import React, { useState, useEffect } from "react";
import { adminSignin } from "../../apis/backendAPI/admin/userAuth";
import { AdminUser } from "../../apis/backendAPI/admin/interfaces";
import store from "../../index";
import { useHistory } from "react-router";
import ErrorViewComponent from "../../components/learning/ErrorViewComponent";
import { Input, InputLabel, Button } from "@material-ui/core";
import "../SigninPage.css";
import MenuBtnComponent from "../../components/learning/MenuBtnComponent";

const AdminSigninPage: React.FC = () => {
    const history = useHistory();
    const [errorMessage, setErrorMessage] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [token, setToken] = useState("");
    const formChange = (event: any) => {
        switch (event.target.name) {
            case "email":
                setEmail(event.target.value);
                break;
            case "password":
                setPassword(event.target.value);
                break;
            case "token":
                setToken(event.target.value);
                break;
        }
    };
    const adminSigninSubmit = () => {
        const user: AdminUser = {
            email: email,
            password: password,
            token: token,
        };
        adminSignin(user)
            .then((res) => {
                localStorage.setItem("user_id", res.data["user_id"]);
                localStorage.setItem("username", res.data["username"]);
                history.push("/Admin");
            })
            .catch((err) => {
                setErrorMessage(err.message);
            });
    };
    const changeHistory = () => {
        history.push("/AdminSignup");
    };
    const manual = () => {
        history.push("/manual");
    };

    return (
        <div className="AdminSigninPageContainer">
            <div className="AdminSigninForm">
                <h1>管理者サインイン</h1>
                <h3></h3>
                <p>
                    <Input
                        type="text"
                        placeholder="email"
                        name="email"
                        onChange={formChange}
                        value={email}
                    ></Input>
                </p>
                <p>
                    <Input
                        type="password"
                        name="password"
                        placeholder="password"
                        onChange={formChange}
                        value={password}
                    ></Input>
                </p>
                <p>
                    <Input
                        type="password"
                        name="token"
                        placeholder="token"
                        onChange={formChange}
                        value={token}
                    ></Input>
                </p>
                <p>
                    <Button
                        type="submit"
                        value="submit"
                        onClick={adminSigninSubmit}
                        color="secondary"
                    >
                        submit
                    </Button>
                </p>
            </div>

            <MenuBtnComponent
                btnText={"signup"}
                event={changeHistory}
            ></MenuBtnComponent>
            <MenuBtnComponent
                btnText={"使い方&紹介"}
                event={manual}
            ></MenuBtnComponent>
            {errorMessage !== "" && (
                <ErrorViewComponent
                    errMessage={errorMessage}
                ></ErrorViewComponent>
            )}
        </div>
    );
};
export default AdminSigninPage;
