import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Switch, Route, Redirect } from "react-router";
import TopPage from "./pages/TopPage";
import RecordingPage from "./pages/RecordingPage";
import MathWorkPage from "./pages/mathwork/MathWorkPage";
import LearningPage from "./pages/learning/LearningPage";
import SignupPage from "./pages/SignupPage";
import SigninPage from "./pages/SigninPage";
import FrequencyPage from "./pages/frequency/FrequencyPage";
import AnalysisPage from "./pages/analysis/AnalysisPage";
import AdminTopPage from "./pages/admin/AdminTopPage";
import AdminSigninPage from "./pages/admin/AdminSigninPage";
import AdminSignupPage from "./pages/admin/AdminSignupPage";
import AdminAnalysisPage from "./pages/admin/AdminAnalysisPage";
import QuestionnairePage from "./pages/learning/QuestionnairePage";
import EarInitPage from "./pages/ear/EarInitPage";
import LineOfSightPage from "./pages/line_of_sight/LineOfSightPage";
import EnvironmentPage from "./pages/EnvironmentPage";
import ManualPage from "./pages/ManualPage";
import AdminSelectQuestionPage from "./pages/admin/AdminSelectQuestionPage";
import AdminLearningAnalysisPage from "./pages/admin/AdminLearningAnalysisPage";
import AdminAddQuestionPage from "./pages/admin/AdminAddQusetionPage";

function App() {
    return (
        <div className="App">
            <React.Fragment>
                <Switch>
                    <Route exact path="/" component={TopPage}></Route>
                    <Route path="/callback" component={TopPage}></Route>
                    <Route path="/EarInit" component={EarInitPage}></Route>
                    <Route path="/Frequency" component={FrequencyPage}></Route>
                    <Route
                        path="/Environment"
                        component={EnvironmentPage}
                    ></Route>
                    <Route path="/Recording" component={RecordingPage}></Route>
                    <Route path="/Learning" component={LearningPage}></Route>
                    <Route path="/Mathwork" component={MathWorkPage}></Route>
                    <Route
                        path="/LineOfSight"
                        component={LineOfSightPage}
                    ></Route>
                    <Route
                        exact
                        path="/Analysis"
                        component={AnalysisPage}
                    ></Route>
                    <Route
                        path="/Analysis/:conc_id"
                        component={AnalysisPage}
                    ></Route>
                    <Route
                        path="/Questionnaire"
                        component={QuestionnairePage}
                    ></Route>
                    <Route path="/Manual" component={ManualPage}></Route>
                    <Route path="/Signup" component={SignupPage} />
                    <Route path="/Signin" component={SigninPage} />
                    <Route path="/Admin" component={AdminTopPage}></Route>
                    <Route
                        path="/AdminSignin"
                        component={AdminSigninPage}
                    ></Route>
                    <Route
                        path="/AdminSignup"
                        component={AdminSignupPage}
                    ></Route>
                    <Route
                        exact
                        path="/AdminAnalysis"
                        component={AdminAnalysisPage}
                    ></Route>
                    <Route
                        path="/AdminAnalysis/:user_id/:conc_id"
                        component={AdminAnalysisPage}
                    ></Route>
                    <Route
                        path="/AdminAnalysis/:user_id"
                        component={AdminAnalysisPage}
                    ></Route>
                    <Route
                        path="/AdminSelectQuestion"
                        component={AdminSelectQuestionPage}
                    ></Route>
                    <Route
                        path="/AdminLearningAnalysis"
                        component={AdminLearningAnalysisPage}
                    ></Route>
                    <Route
                        path="/AdminAddQuestion"
                        component={AdminAddQuestionPage}
                    ></Route>
                    {/* <Route path="/AdminCreateQuestion"></Route> */}
                </Switch>
            </React.Fragment>
        </div>
    );
}

export default App;
