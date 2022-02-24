import React, { useState, useEffect } from "react";
import { Button, Checkbox, FormControlLabel } from "@material-ui/core";
import "./ReadyViewComponent.css";
import {
    GetQuestionIdQuery,
    GetSelectQuestionRes,
} from "../../apis/backendAPI/learning/interfaces";

const ReadyViewComponent: React.FC<{
    startCheckButton: any;
    readyViewCheckBox: JSX.Element;
    readyViewText: JSX.Element;
    readyViewSelectQuestion: JSX.Element;
    readyViewEnvironment: JSX.Element;
}> = (props) => {
    return (
        <div className="ReadyViewContainer">
            {props.readyViewText}
            {props.readyViewCheckBox}
            {props.readyViewSelectQuestion}
            {props.readyViewEnvironment}
            <Button
                onClick={props.startCheckButton}
                color="secondary"
                value={1}
            >
                start
            </Button>
        </div>
    );
};

export default React.memo(ReadyViewComponent);
