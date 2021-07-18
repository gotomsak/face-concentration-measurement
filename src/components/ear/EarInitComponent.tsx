import React, { useState, useEffect, useRef } from "react";

const EarInitComponent: React.FC<{
    setFinishCheck: any;
}> = ({ setFinishCheck }) => {
    const [windowTimer, setWindowTimer] = useState(0);
    const refWindowTimer = useRef(windowTimer);
    const [windowTimeFlag, setWindowTimeFlag] = useState<NodeJS.Timeout | null>(
        null
    );

    useEffect(() => {
        refWindowTimer.current = windowTimer;
        if (windowTimer === 7) {
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
        <div>
            <h1>瞬きしないでください</h1>
        </div>
    );
};

export default EarInitComponent;
