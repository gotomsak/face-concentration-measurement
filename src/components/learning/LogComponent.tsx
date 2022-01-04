import React, { useState, useRef, useEffect, useCallback } from "react";
import "./LogComponent.css";
import { makeStyles, Theme, createStyles } from "@material-ui/core";

const LogComponent: React.FC<{
    log: string;
    changeText: any;
}> = ({ log, changeText }) => {
    // const calculatorRef = useRef(calculatorResult);
    const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root:{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems:"center",
            width: "auto",
            height: "100%"
        },
        
    })
);
    return (
        <div className="LogContainer">
            <textarea onChange={changeText} value={log}></textarea>
        </div>
    );
};

export default React.memo(LogComponent);
