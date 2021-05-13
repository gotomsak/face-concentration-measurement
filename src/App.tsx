import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Switch, Route } from "react-router";
import TopPage from "./pages/TopPage";
import RecordingPage from "./pages/RecordingPage";
import MathWorkPage from "./pages/mathwork/MathWorkPage";
import LearningPage from "./pages/learning/LearningPage";
import SignupPage from "./pages/SignupPage";
import SigninPage from "./pages/SigninPage";
import FrequencyPage from "./pages/frequency/FrequencyPage";

function App() {
    return (
        <div className="App">
            <React.Fragment>
                <Switch>
                    <Route exact path="/" component={TopPage}></Route>
                    <Route path="/Frequency" component={FrequencyPage}></Route>
                    <Route path="/Recording" component={RecordingPage}></Route>
                    <Route path="/Learning" component={LearningPage}></Route>
                    <Route path="/Mathwork" component={MathWorkPage}></Route>
                    <Route path="/Signup" component={SignupPage} />
                    <Route path="/Signin" component={SigninPage} />
                </Switch>
            </React.Fragment>
        </div>
    );
}

export default App;
