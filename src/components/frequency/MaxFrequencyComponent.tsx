import React, { useState, useEffect, useRef } from "react";
import "./MaxFrequencyComponent.css";
// import ReadyViewComponent from "../../utils/ReadyViewComponent";

const MaxFrequencyComponent: React.FC<{
    setFinishCheck: any;
}> = ({ setFinishCheck }) => {
    // const [startCheck, setStartCheck] = useState(false);
    const [windowTimer, setWindowTimer] = useState(0);
    const refWindowTimer = useRef(windowTimer);
    const [startTime, setStartTime] = useState("");
    const [windowTimeFlag, setWindowTimeFlag] =
        useState<NodeJS.Timeout | null>(null);

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
        <div className="MaxFrequencyContainer">
            <div className="b_frec_max">
                <div className="swing">
                    <h1 id="randomMove2"></h1>
                </div>
            </div>
        </div>
    );
};

export default React.memo(MaxFrequencyComponent);
