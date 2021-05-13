import { Button } from "@material-ui/core";
import React, { useState, useEffect } from "react";

const FinishViewComponent: React.FC<{ nextButton: any }> = ({ nextButton }) => {
    // const FinishButton = () => {
    //     setFinishFlag(2);
    // };

    return (
        <div>
            <h1>10問終了しました</h1>
            <Button onClick={nextButton} color="secondary">
                次へ
            </Button>
            {/* <button onClick={FinishButton}>やめる</button> */}
        </div>
    );
};

export default FinishViewComponent;
