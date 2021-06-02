import React, { useState, useRef, useEffect, useCallback } from "react";
import "./LogComponent.css";

const LogComponent: React.FC<{
    log: string;
    changeText: any;
}> = ({ log, changeText }) => {
    // const calculatorRef = useRef(calculatorResult);

    return (
        <div className="LogContainer">
            <textarea onChange={changeText} value={log}></textarea>
        </div>
    );
};

export default React.memo(LogComponent);
