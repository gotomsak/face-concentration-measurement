import { Button, makeStyles, styled } from "@material-ui/core";
export const TopPageStyle = makeStyles({
    root: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        // textAlign: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
    },
    menu: {
        display: "flex",
        // justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        width: "400px",
        height: "auto",
    },
});

export const FrequencyPageStyle = makeStyles({
    root: {
        display: "flex",
        flexDirection: "column",
        // justifyContent: "center",
        // textAlign: "center",
        alignItems: "center",

        width: "100%",
        height: "100%",
    },
    head: {
        // width: "100%",
        // height: "10%",
        // display: "flex",
        // flexDirection: "column",
        // // justifyContent: "center",
    },
    menu: {
        padding: "40px",
        display: "flex",
        // flexDirection: "column",
        // justifyContent: "center",
        width: "100%",
        // height: "10%",
    },
});

export const MathWorkPageStyle = makeStyles({
    root: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        // textAlign: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
    },
    question: {
        height: "10%",
        width: "80%",
    },
});
export const RecordingPageStyle = makeStyles({
    root: {
        display: "flex",
        flexDirection: "column",
        // textAlign: "center",
        // width: "100%",
        // height: "100%",
    },
    fID: {
        display: "flex",
        // flexDirection: "row",
        justifyContent: "center",
        textAlign: "center",
        width: "100%",
    },
    tID: {
        display: "flex",
        width: "50%",
        height: 50,
        justifyContent: "space-evenly",
        // WebkitJustifyContent: "center",

        alignItems: "center",
    },
    setFreqComp: {
        display: "flex",
        justifyContent: "space-evenly",

        // justifyContent: "space-evenly",
    },
});
export const TopPageButton = styled(Button)({
    height: 50,
    width: 200,
    background: "rgb(38.6%, 88.8%, 100%)",
    // variant: "contained",
    color: "primary",
    size: "medium",
    fontWeight: 800,
});

export const RecordingPageButton = styled(Button)({
    height: 50,
    width: 100,
    background: "rgb(38.6%, 88.8%, 100%)",
    color: "primary",
    fontWeight: 800,
});

export const AdminAnalysisPageStyle = makeStyles({
    root: {
        display: "flex",
        flexDirection: "column",
        // justifyContent: "center",
        // textAlign: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
    },
    menu: {
        display: "flex",
        // justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        width: "400px",
        height: "auto",
    },
    userconcview: {
        boxSizing: "border-box",
    },
});
