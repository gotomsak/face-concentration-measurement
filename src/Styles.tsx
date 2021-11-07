import {
    Button,
    makeStyles,
    styled,
    createStyles,
    Theme,
} from "@material-ui/core";

export const TopPageStyle = makeStyles({
    root: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",

        alignItems: "center",
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

export const LearningPageStyle = makeStyles({
    root: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",

        alignItems: "center",
    },
});

export const QuestionViewComponentStyle = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            margin: theme.spacing(2),
        },
        paper: {
            color: theme.palette.text.secondary,
        },
    })
);

export const EarInitPageStyle = makeStyles({
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

export const RecordingPageStyle = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexDirection: "column",
        // textAlign: "center",
        // width: "100%",
        // height: "100%",
    },
    rBPB: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    fID: {
        display: "flex",
        // flexDirection: "row",
        justifyContent: "center",
        textAlign: "center",
        width: "auto",
        height: "auto",
        margin: "10px",
    },
    tID: {
        display: "flex",
        // width: "80%",
        // height: 50,
        justifyContent: "center",
        // WebkitJustifyContent: "center",

        alignItems: "center",
    },
    textFieldMemo: {
        height: "auto",
        position: "relative",
        "& .MuiTextField-root": {
            margin: theme.spacing(1),
            width: 200,
            height: "auto",
            "& .MuiOutlinedInput-multiline": {
                // height: "auto",
                "& textarea": {
                    minHeight: 15,
                    // height: "auto",
                    // maxHeight: "50px",
                    // "& .MuiOutlinedInput-inputMultiline": { height: 50 },
                },
            },
        },
        // margin: "10px",

        // width: 1000,
    },

    setFreqComp: {
        display: "flex",
        justifyContent: "space-evenly",

        // justifyContent: "space-evenly",
    },
    concentTextView: { display: "flex", justifyContent: "space-evenly" },
    arcGauge: {
        // position: "absolute",

        width: 200,
        height: 100,
    },
    // gaugeChart: {
    //     height: 50,
    // },
}));
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

export const EnvironmentPageStyle = makeStyles({
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
