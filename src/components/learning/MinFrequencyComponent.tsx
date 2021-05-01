import React, { useState, useEffect, useRef } from "react";
import "./MinFrequencyComponent.css";
// import ReadyViewComponent from "./ReadyViewComponent";

const MinFrequencyComponent: React.FC<{ setFinishCheck: any }> = ({
    setFinishCheck,
}) => {
    const [startCheck, setStartCheck] = useState(false);
    const [windowTimer, setWindowTimer] = useState(0);
    const refWindowTimer = useRef(windowTimer);
    const [startTime, setStartTime] = useState("");
    const [windowTimeFlag, setWindowTimeFlag] = useState<NodeJS.Timeout | null>(
        null
    );

    useEffect(() => {
        refWindowTimer.current = windowTimer;
        if (windowTimer == 60) {
            clearInterval(windowTimeFlag!);
            setFinishCheck(true);
        }
    }, [windowTimer]);
    useEffect(() => {
        setWindowTimeFlag(
            setInterval(() => {
                setWindowTimer(refWindowTimer.current + 1);
            }, 1000)
        );
    }, []);

    return (
        <div className="MixFrequencyContainer">
            <div className="blue"></div>
        </div>
    );
};

export default MinFrequencyComponent;
