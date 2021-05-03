import { Button } from "@material-ui/core";
import React, { useState, useEffect } from "react";

const FinishViewComponent: React.FC<{ setFinishFlag: any }> = ({
    setFinishFlag,
}) => {
    // const FinishButton = () => {
    //     setFinishFlag(2);
    // };
    const NextButton = () => {
        setFinishFlag(true);
    };
    return (
        <div>
            <h1>10問終了しました</h1>
            <Button onClick={NextButton} color="secondary">
                次へ
            </Button>
            {/* <button onClick={FinishButton}>やめる</button> */}
        </div>
    );
};

export default FinishViewComponent;
