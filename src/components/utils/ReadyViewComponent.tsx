import React, { useState, useEffect } from "react";
import { Button, Checkbox, FormControlLabel } from "@material-ui/core";
import "./ReadyViewComponent.css";
const ReadyViewComponent: React.FC<{
    cameraState: any;
    changeMethod: any;
    startCheckButton: any;
    readyViewText: any;
}> = ({ cameraState, changeMethod, startCheckButton, readyViewText }) => {
    return (
        <div className="ReadyViewContainer">
            {readyViewText}

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
