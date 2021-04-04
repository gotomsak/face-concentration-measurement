import React, { useState, useEffect } from "react";
// import { BtoFtoC, SonConc } from "../apis/backendAPI/interfaces";

const ConcentrationViewComponent: React.FC<{
    concData1: never[];
}> = ({ concData1 }) => {
    const [concView1, setConcView1] = useState("");

    useEffect(() => {
        console.log("check");
        const last = concData1[concData1.length - 1];
        if (concData1.length === 0 || last === "0") {
            setConcView1("NoConcData");
        } else {
            setConcView1(last["c3"]);
        }
    }, [concData1]);
    return (
        <div className="ConcentrationViewContainer">
            <h3>集中度: {concView1}</h3>
        </div>
    );
};

export default ConcentrationViewComponent;
