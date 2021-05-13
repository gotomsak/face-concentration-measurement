import { Button } from "@material-ui/core";
import React, { useState } from "react";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

import Grid, { GridSpacing } from "@material-ui/core/Grid";

const AnsImgComponent: React.FC<{
    ansImgList: string[];
    answerFinal: any;
}> = ({ ansImgList, answerFinal }) => {
    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            root: {
                flexGrow: 1,
            },
            paper: {
                textAlign: "center",
                color: theme.palette.text.secondary,
            },
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
            <Grid item xs={12}>
                <Grid container justify="center" spacing={spacing}>
                    {ansImgList?.map((i, index) => {
                        return (
                            <Grid key={i}>
                                <div className="AnsList" key={i}>
                                    <Paper className={classes.paper}>
                                        <Button
                                            variant="contained"
                                            onClick={choiceResult}
                                            value={i}
                                            key={i}
                                            size="small"
                                        >
                                            <img src={i} key={i} />
                                        </Button>
                                    </Paper>
                                </div>
                            </Grid>
                        );
                    })}
                </Grid>
            </Grid>
        </div>
    );
};

export default AnsImgComponent;
