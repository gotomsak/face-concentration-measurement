import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Botton from "@material-ui/core/Button";

const AnsResultComponent: React.FC<{ ansResult: string }> = ({ ansResult }) => {
    if (!ansResult.match("./kakomon")) {
        return (
            <div className="AnsResultContainer">
                <Box component="span" m={1} color="blue">
                    <h1>答えは？</h1>
                    {ansResult}
                </Box>
            </div>
        );
    }
    return (
        <div className="AnsResultContainer">
            <Box component="span" m={1} color="blue">
                <h1>答えは？</h1>
                <img src={ansResult}></img>
            </Box>
        </div>
    );
};

export default AnsResultComponent;
