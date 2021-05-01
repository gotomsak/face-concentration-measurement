import React, { useState, useEffect } from "react";
import { Button, Checkbox, FormControlLabel } from "@material-ui/core";
import "./ReadyViewComponent.css";
const ReadyViewComponent: React.FC<{
    cameraState: any;
    changeMethod: any;
    startCheckButton: any;
}> = ({ cameraState, changeMethod, startCheckButton }) => {
    return (
        <div className="ReadyViewContainer">
            <h1>準備は良いですか？</h1>
            <h2>良ければスタートボタンを押してください</h2>
            <h3>10問おきに継続，終了を選べます</h3>
            <h3>終了後アンケートにお答えください</h3>
            <FormControlLabel
                control={
                    <Checkbox
                        checked={cameraState}
                        onChange={changeMethod}
                        inputProps={{ "aria-label": "primary checkbox" }}
                        name="camera"
                    />
                }
                label="UseCamera"
            />
            <Button onClick={startCheckButton} color="secondary" value={1}>
                start
            </Button>
        </div>
    );
};

export default ReadyViewComponent;
