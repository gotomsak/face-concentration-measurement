import React, { useState, useEffect } from "react";
// import { BtoFtoC, SonConc } from "../apis/backendAPI/interfaces";

const ConcentrationViewComponent: React.FC<{
    concData1: never[];
    concData2: never[];
}> = ({ concData1, concData2 }) => {
    const [concView1, setConcView1] = useState("");
    const [concView2, setConcView2] = useState("");

    useEffect(() => {
        const last = concData1[concData1.length - 1];
        if (concData1.length === 0 || last === "0") {
            setConcView1("NoConcData");
        } else {
            setConcView1(last["c3"]);
        }
    }, [concData1]);

    useEffect(() => {
        const last = concData2[concData2.length - 1];

        if (concData1.length === 0) {
            setConcView2("NoConcData");
        } else {
            setConcView2(last);
        }
    }, [concData2]);

    return (
        <div className="ConcentrationViewContainer">
            <h3>集中度Method1: {concView1}</h3>
            <h3>集中度Method2: {concView2}</h3>
        </div>
    );
};

export default ConcentrationViewComponent;
