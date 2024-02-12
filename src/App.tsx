import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
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
import EnvironmentPage from "./pages/EnvironmentPage";
import ManualPage from "./pages/ManualPage";
import AdminSelectQuestionPage from "./pages/admin/AdminSelectQuestionPage";
import AdminLearningAnalysisPage from "./pages/admin/AdminLearningAnalysisPage";

function App() {
  return (
    <div className="App">
      {/* <React.Fragment> */}
      <Routes>
        <Route path="/" element={<TopPage></TopPage>}></Route>
        <Route path="/callback" element={<TopPage></TopPage>}></Route>
        <Route path="/EarInit" element={<EarInitPage></EarInitPage>}></Route>
        <Route
          path="/Frequency"
          element={<FrequencyPage></FrequencyPage>}
        ></Route>
        <Route
          path="/Environment"
          element={<EnvironmentPage></EnvironmentPage>}
        ></Route>
        <Route
          path="/Recording"
          element={<RecordingPage></RecordingPage>}
        ></Route>
        <Route path="/Learning" element={<LearningPage></LearningPage>}></Route>
        <Route path="/Mathwork" element={<MathWorkPage></MathWorkPage>}></Route>
        <Route path="/Analysis" element={<AnalysisPage></AnalysisPage>}></Route>
        <Route
          path="/Analysis/:conc_id"
          element={<AnalysisPage></AnalysisPage>}
        ></Route>
        <Route
          path="/Questionnaire"
          element={<QuestionnairePage></QuestionnairePage>}
        ></Route>
        <Route path="/Manual" element={<ManualPage></ManualPage>}></Route>
        <Route path="/Signup" element={<SignupPage></SignupPage>} />
        <Route path="/Signin" element={<SigninPage></SigninPage>} />
        <Route path="/Admin" element={<AdminTopPage></AdminTopPage>}></Route>
        <Route
          path="/AdminSignin"
          element={<AdminSigninPage></AdminSigninPage>}
        ></Route>
        <Route
          path="/AdminSignup"
          element={<AdminSignupPage></AdminSignupPage>}
        ></Route>
        <Route
          path="/AdminAnalysis"
          element={<AdminAnalysisPage></AdminAnalysisPage>}
        ></Route>
        <Route
          path="/AdminAnalysis/:user_id/:conc_id"
          element={<AdminAnalysisPage></AdminAnalysisPage>}
        ></Route>
        <Route
          path="/AdminAnalysis/:user_id"
          element={<AdminAnalysisPage></AdminAnalysisPage>}
        ></Route>
        <Route
          path="/AdminSelectQuestion"
          element={<AdminSelectQuestionPage></AdminSelectQuestionPage>}
        ></Route>
        <Route
          path="/AdminLearningAnalysis"
          element={<AdminLearningAnalysisPage></AdminLearningAnalysisPage>}
        ></Route>
        {/* <Route path="/AdminCreateQuestion"></Route> */}
      </Routes>
      {/* </React.Fragment> */}
    </div>
  );
}

export default App;
