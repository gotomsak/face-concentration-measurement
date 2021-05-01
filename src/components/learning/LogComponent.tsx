import React, { useState, useRef, useEffect } from "react";
import "./LogComponent.css";

const LogComponent: React.FC<{
    calculatorResult: string;
    log: string;
    setLog: any;
}> = ({ calculatorResult, log, setLog }) => {
    const calculatorRef = useRef(calculatorResult);
    useEffect(() => {
        calculatorRef.current = calculatorResult;
        if (log === "") {
            setLog(calculatorRef.current);
        }
        if (calculatorResult !== "") {
            setLog(log + "\n" + calculatorRef.current);
        }
    }, [calculatorResult]);
    const changeText = (e: any) => {
        console.log(e.target.value);
        setLog(String(e.target.value));
    };
    return (
        <div className="LogContainer">
            <textarea onChange={changeText} value={log}></textarea>
        </div>
    );
};

export default LogComponent;
