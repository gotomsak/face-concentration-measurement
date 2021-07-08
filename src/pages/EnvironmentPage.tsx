import React, { useState, useEffect, useLayoutEffect } from "react";
import { getEar } from "../apis/backendAPI/ear/getEar";
import { GetEar } from "../apis/backendAPI/ear/interfaces";
import { getFrequency } from "../apis/backendAPI/frequency/getFrequency";
import SetFrequencyComponent from "../components/utils/SetFrequencyComponent";
import SetEarComponent from "../components/utils/SetEarComponent";
import { GetFrequency } from "../apis/backendAPI/frequency/interfaces";
import {
    MaxFrequency,
    MinFrequency,
} from "../apis/backendAPI/frequency/interfaces";
import { Button } from "@material-ui/core";
import { saveEnvironment } from "../apis/backendAPI/environment/saveEnvironment";
import { TextField } from "@material-ui/core";
import store from "..";
const EnvironmentPage: React.FC = () => {
    const [frequencys, setFrequencys] = useState<GetFrequency>();
    const [ears, setEars] = useState<GetEar[]>([]);
    const [environment, setEnvironment] = useState("");
    useLayoutEffect(() => {
        getFrequency().then((res) => {
            console.log(res);
            setFrequencys(res.data);
        });
        getEar().then((res) => {
            console.log(res);
            setEars(res.data["earData"]);
        });
    }, []);
    const createEnvironment = (e: any) => {
        if (e.currentTarget.value == 1) {
            const date = new Date();
            date.setHours(date.getHours() + 9);
            saveEnvironment({
                name: environment,
                user_id: Number(localStorage.getItem("user_id")),
                ear_id: store.getState().concReducer.ear_id,
                max_freq_id: store.getState().concReducer.max_freq_id,
                min_freq_id: store.getState().concReducer.min_freq_id,
                date: date,
            }).then((res) => {
                console.log(res);
            });
        }
    };
    return (
        <div>
            <h1>EnvironmentCreate</h1>
            <TextField
                label="環境名"
                variant="outlined"
                onChange={(e: any) => {
                    setEnvironment(e.target.value);
                }}
            />
            <SetFrequencyComponent
                frequencys={frequencys}
            ></SetFrequencyComponent>
            <SetEarComponent ears={ears}></SetEarComponent>

            <Button onClick={createEnvironment} color="secondary" value={1}>
                create
            </Button>
        </div>
    );
};

export default EnvironmentPage;
