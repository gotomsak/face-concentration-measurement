import React, { useState, useEffect, useRef, useMemo } from "react";
import { TextField, Button } from "@material-ui/core";
const QuestionComponent: React.FC<{ finishHandler: any }> = ({
    finishHandler,
}) => {
    const [qList, setQList] = useState<string[]>([]);
    const [ansList, setAnsList] = useState<Number[]>([]);
    const qListRef = useRef<string[]>([]);
    const ansListRef = useRef<Number[]>([]);
    const [finalAns, setFinalAns] = useState<string>();
    const [nowQ, setNowQ] = useState<number>(0);
    const [disCorrect, setDisCorrect] = useState<string>("");
    const disCorrectMessage = useRef("");
    useEffect(() => {
        for (var i: number = 0; 20 > i; i++) {
            const res = randomMethod(2);
            const n1 = createNumber(2);
            const n2 = createNumber(2);

            if (res == 1) {
                ansListRef.current = [...ansListRef.current, ansPlus(n1, n2)];
                qListRef.current = [
                    ...qListRef.current,
                    String(n1) + " + " + String(n2),
                ];
            }
            if (res == 2) {
                ansListRef.current = [...ansListRef.current, ansMinus(n1, n2)];
                qListRef.current = [
                    ...qListRef.current,
                    String(n1) + " - " + String(n2),
                ];
            }
            // if (res == 3) {
            //     ansListRef.current = [
            //         ...ansListRef.current,
            //         ansMultiply(n1, n2),
            //     ];
            //     qListRef.current = [
            //         ...qListRef.current,
            //         String(n1) + " × " + String(n2),
            //     ];
            // }

            // if (res == 4) {
            //     ansListRef.current = [
            //         ...ansListRef.current,
            //         ansDivision(n1, n2),
            //     ];
            //     qListRef.current = [
            //         ...qListRef.current,
            //         String(n1) + " ÷ " + String(n2),
            //     ];
            // }
        }
        setAnsList(ansListRef.current);
        setQList(qListRef.current);
    }, []);

    useEffect(() => {
        if (nowQ === 20) {
            finishHandler(true);
        }
    }, [nowQ]);

    const createNumber = (num_len: Number) => {
        let return_random = 0;
        while (true) {
            var random = Math.floor(Math.random() * 10000);
            if (random.toString().length === num_len) {
                return_random = random;
                break;
            }
        }
        return return_random;
    };
    const ansPlus = (n1: number, n2: number) => {
        return n1 + n2;
    };

    const ansMinus = (n1: number, n2: number) => {
        return n1 - n2;
    };
    const ansMultiply = (n1: number, n2: number) => {
        return n1 * n2;
    };
    const ansDivision = (n1: number, n2: number) => {
        return n1 / n2;
    };

    const randomMethod = (level: Number) => {
        var random = Math.random();
        if (level >= 3) {
            if (random < 0.25) {
                return 1;
            } else if (random < 0.5 && random >= 0.25) {
                return 2;
            } else if (random < 0.75 && random >= 0.5) {
                return 3;
            } else {
                return 4;
            }
        } else {
            if (random > 0.49) {
                return 1;
            } else {
                return 2;
            }
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFinalAns(event.target.value);
    };
    const disCorectAnswerView = () => {
        return <h1>{disCorrect}</h1>;
    };
    const qRenderView = () => {
        console.log(qList);

        return (
            <div>
                <p>
                    <h1>{qList[nowQ]}</h1>
                </p>
                <p>
                    <h1>{disCorrect}</h1>
                </p>
            </div>
        );
    };
    const checkAns = () => {
        console.log("checkans");
        if (finalAns === ansList[nowQ].toString()) {
            setNowQ(nowQ + 1);
            setDisCorrect("");
        } else {
            setDisCorrect("間違ってます");
        }
    };
    return (
        <div>
            {qRenderView()}
            <TextField
                id="standard-number"
                label="記入欄"
                type="number"
                InputLabelProps={{
                    shrink: true,
                }}
                onChange={handleChange}
                value={finalAns}
            />
            <Button color="secondary" onClick={checkAns}>
                解答
            </Button>
            {/* {disCorectAnswerView()} */}
        </div>
    );
};

export default QuestionComponent;
