import { Button } from "@material-ui/core";
import React, { useState } from "react";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import "./AnsTextComponent.css";
import Grid, { GridSpacing } from "@material-ui/core/Grid";

const AnsTextComponent: React.FC<{
    ansTextList: string[];
    answerFinal: any;
}> = ({ ansTextList, answerFinal }) => {
    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            root: {
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                margin: "5px",
                alignItems: "center",
                width: "500px"
                // flexGrow: 1,
                // width: "1000px",
            },
            paper: {
                // textAlign: "center",
                display: "inline-block",
                color: theme.palette.text.secondary,
                width: "500px",
                // minWidth:"500px",
                // // maxWidth: "800px",
                margin: "1px"
            },
            ansList:{
                display: "flex",
                // justifyContent: "space-between",
               
                // margin: "10px"
            },
            ansButton: {
                // display: "inlineBlock",
                // fontSize: "16px",
                width: "64px",
                height: "64px",
                display: "flex"
            }
        })
    );
 
    const [spacing, setSpacing] = useState<GridSpacing>(2);
    const classes = useStyles();

    const choiceResult: any = (e: any) => {
        console.log(e.currentTarget.value);
        answerFinal(e.currentTarget.value);
    };

    return (
        <div className={classes.root}>
            {/* <Grid item xs={12}>
                <Grid container justify="center"> */}
                    {ansTextList?.map((i, index) => {
                        return (
                            // <Grid key={i}>
                                
                                    <Paper className={classes.paper}>
                                        <div className={classes.ansList} key={i}>
                                            {/* <div className={classes.ansButton}> */}
                                            <Button
                                                variant="contained"
                                                onClick={choiceResult}
                                                value={i}
                                                key={i}
                                                size="small"
                                            >
                                                <h4> {index}</h4>
                                            </Button>
                                            {/* </div> */}
                                            <h4>{i}</h4>
                                        </div>
                                    </Paper>
                                
                            // </Grid>
                        );
                    })}
                {/* </Grid>
            </Grid> */}
        </div>
    );
};

export default AnsTextComponent;
