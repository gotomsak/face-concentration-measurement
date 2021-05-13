import "react-markdown";
import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";

const MarkDownViewComponent: React.FC<{ text: any }> = ({ text }) => {
    return (
        <div className="MarkDownViewComponent">
            <ReactMarkdown source={text}></ReactMarkdown>
        </div>
    );
};

export default MarkDownViewComponent;
