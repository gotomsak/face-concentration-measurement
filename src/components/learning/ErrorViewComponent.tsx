import React, { useState } from "react";

const ErrorViewComponent: React.FC<{ errMessage: any }> = ({ errMessage }) => {
    return (
        <div>
            <h1>{errMessage}</h1>
        </div>
    );
};

export default ErrorViewComponent;
