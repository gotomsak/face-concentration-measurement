import React, { useState } from "react";
import "./CalculatorComponent.css";

const CalculatorComponent: React.FC<{ calculatorResult: any }> = ({
    calculatorResult,
}) => {
    const [result, setResult] = useState("");
    const edit = (elem: any) => {
        setResult(result + elem.value);
    };

    const calc = () => {
        const FunctionReturn = new Function("return " + result)();
        setResult(result + "=" + FunctionReturn);
        calculatorResult(result + "=" + FunctionReturn);
    };

    const clear = () => {
        setResult("");
    };
    return (
        <div className="CalculatorContainer">
            <input type="text" value={result} readOnly />
            <div className="CalculatorGrid">
                <input
                    type="button"
                    value="1"
                    onClick={(e) => edit(e.target)}
                />
                <input
                    type="button"
                    value="2"
                    onClick={(e) => edit(e.target)}
                />
                <input
                    type="button"
                    value="3"
                    onClick={(e) => edit(e.target)}
                />
                <input
                    type="button"
                    value="+"
                    onClick={(e) => edit(e.target)}
                />

                <input
                    type="button"
                    value="4"
                    onClick={(e) => edit(e.target)}
                />
                <input
                    type="button"
                    value="5"
                    onClick={(e) => edit(e.target)}
                />
                <input
                    type="button"
                    value="6"
                    onClick={(e) => edit(e.target)}
                />
                <input
                    type="button"
                    value="-"
                    onClick={(e) => edit(e.target)}
                />

                <input
                    type="button"
                    value="7"
                    onClick={(e) => edit(e.target)}
                />
                <input
                    type="button"
                    value="8"
                    onClick={(e) => edit(e.target)}
                />
                <input
                    type="button"
                    value="9"
                    onClick={(e) => edit(e.target)}
                />
                <input
                    type="button"
                    value="/"
                    onClick={(e) => edit(e.target)}
                />

                <input
                    type="button"
                    value="0"
                    onClick={(e) => edit(e.target)}
                />
                <input
                    type="button"
                    value="."
                    onClick={(e) => edit(e.target)}
                />
                <input
                    type="button"
                    value="*"
                    onClick={(e) => edit(e.target)}
                />
                <input type="button" value="=" onClick={() => calc()} />

                <input
                    type="button"
                    value="clear"
                    className="clear"
                    onClick={() => clear()}
                />
            </div>
        </div>
    );
};

export default CalculatorComponent;
