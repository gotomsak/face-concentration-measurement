import React, { useState } from "react";
import { signup } from "../apis/backendAPI/userAuth";
import { User } from "../apis/backendAPI/interfaces";
import { Input, Button } from "@material-ui/core";
import "./SignupPage.css";

function SignupPage() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [signupMessage, setSignupMessage] = useState("");
    // e.currentTarget.valueじゃないの？？？
    const formChange = (e: any) => {
        switch (e.target.name) {
            case "username":
                setUsername(e.target.value);
                break;
            case "email":
                setEmail(e.target.value);
                break;
            case "password":
                setPassword(e.target.value);
                break;
        }
    };
    const signupSubmit = () => {
        const user: User = {
            username: username,
            email: email,
            password: password,
        };
        signup(user)
            .then((res) => {
                setSignupMessage("signupしました");
            })
            .catch((err) => {
                setSignupMessage(err);
            });
    };

    return (
        <div className="SignupPageContainer">
            <div className="SignupForm">
                <h1>サインアップ</h1>
                <p>
                    <Input
                        type="text"
                        placeholder="username"
                        name="username"
                        onChange={formChange}
                        value={username}
                    ></Input>
                </p>
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
                        placeholder="password"
                        name="password"
                        onChange={formChange}
                        value={password}
                    ></Input>
                </p>
                <p>
                    <Button
                        type="submit"
                        value="submit"
                        onClick={signupSubmit}
                        color="secondary"
                    >
                        submit
                    </Button>
                </p>
            </div>

            <div>
                <h2>{signupMessage}</h2>
            </div>
        </div>
    );
}

export default SignupPage;
