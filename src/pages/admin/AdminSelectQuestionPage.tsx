import React, { useState, useEffect, useLayoutEffect } from "react";

import { DataGrid, GridColDef } from "@material-ui/data-grid";
import { useHistory } from "react-router";
import { Button } from "@material-ui/core";
import { adminGetIDLogUser } from "../../apis/backendAPI/admin/getIDLogUser";
import { AdminGetIDLogUserRes } from "../../apis/backendAPI/admin/interfaces";
import SelectQuestionViewComponent from "../../components/learning/SelectQuestionViewComponent";
import { adminGetSelectQuestion } from "../../apis/backendAPI/admin/getSelectQuestion";
import { adminGetQuestionAll } from "../../apis/backendAPI/admin/getQuestionAll";
import SelectQuestionComponent from "../../components/learning/SelectQuestionComponent";
import { AdminAnalysisPageStyle , AdminSelectQuestionPageStyle} from "../../Styles";

const AdminSelectQuestionPage: React.FC = () => {
    // const [userLogData, setUserLogData] = useState();
    const [selectQuestion, setSelectQuestion] = useState(undefined)
    const [questionCreate, setQuestionCreate] = useState(false)
    const classes = AdminSelectQuestionPageStyle()    
    useEffect(()=>{
        adminGetSelectQuestion().then((res:any)=>{
            console.log(res)
            if(res.data!==null){
                setSelectQuestion(res.data) 
            }
            
        })
        // adminGetQuestionAll().then((res:any)=>{
        //     console.log(res)
        // })
    },[])

    const createButton=()=>{
        adminGetQuestionAll().then((res:any)=>{
            console.log(res)
        })
    }


    return (
        <div className={classes.root}>
            {questionCreate ? (
                <div className={classes.select_question}>
                    <SelectQuestionComponent ></SelectQuestionComponent>
                </div>
            ):(
                <div className={classes.select_question}>
                    <SelectQuestionViewComponent selectQuestionData={selectQuestion}></SelectQuestionViewComponent>
                    <Button variant="contained" onClick={()=>{setQuestionCreate(true)}}>create</Button>
                </div>    
            )}
            
        </div>
    );
};

export default React.memo(AdminSelectQuestionPage);
