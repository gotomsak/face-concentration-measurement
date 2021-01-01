import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Switch, Route } from "react-router";
import TopPage from "./pages/TopPage";
import RecordingPage from "./pages/RecordingPage";

function App() {
    return (
        <div className="App">
            <React.Fragment>
                <Switch>
                    <Route exact path="/" component={TopPage}></Route>
                    <Route path="/Recording" component={RecordingPage}></Route>
                </Switch>
            </React.Fragment>
        </div>
    );
}

export default App;
