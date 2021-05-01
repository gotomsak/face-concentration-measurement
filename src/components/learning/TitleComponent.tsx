import React from "react";
import { deflate } from "zlib";

const TitleComponent: React.FC<{ title: string }> = ({ title }) => {
    return <div className="TitleContainer">{title}</div>;
};

export default TitleComponent;
