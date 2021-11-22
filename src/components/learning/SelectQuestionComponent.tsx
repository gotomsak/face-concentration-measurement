import React, { useState, useEffect, useLayoutEffect } from "react";

import { DataGrid, GridColDef } from "@material-ui/data-grid";
import { useHistory } from "react-router";
import { Button } from "@material-ui/core";
import { adminGetIDLogUser } from "../../apis/backendAPI/admin/getIDLogUser";
import {
    AdminGetIDLogUserRes,
    GetQuestionAllRes,
} from "../../apis/backendAPI/admin/interfaces";

import { adminGetSelectQuestion } from "../../apis/backendAPI/admin/getSelectQuestion";
import { adminGetQuestionAll } from "../../apis/backendAPI/admin/getQuestionAll";

import { adminSaveSelectQuestion } from "../../apis/backendAPI/admin/saveSelectQuestion";
import { TextField } from "@material-ui/core";

interface selectQuestion {
    id: number;
    question: string;
    genre: string;
    season: string;
}

const SelectQuestionComponent: React.FC = () => {
    const [questions, setQuestions] = useState(undefined);
    const [selectedQuestion, setSelectedQuestion] = useState<number[]>([]);
    const [selectQuestionRow, setselectQuestionRow] = useState<
        selectQuestion[]
    >([]);
    const [questionAll, setQuestionAll] = useState();
    const [selectQuestionCol, setSelectQuestionCol] = useState<GridColDef[]>([
        {
            field: "id",
            headerName: "ID",
            width: 100,
        },

        { field: "question", headerName: "問題", width: 800 },
        {
            field: "genre",
            headerName: "ジャンル",
            width: 300,
        },
        { field: "season", headerName: "シーズン", width: 150 },
    ]);
    const [selectQuestionName, setSelectQuestionName] = useState<null | string>(
        null
    );

    useEffect(() => {
        adminGetQuestionAll().then((res: any) => {
            console.log(res.data.question_all);
            setselectQuestionRow(
                getQuestionAllFormatting(res.data.question_all)
            );
        });
    }, []);

    useEffect(() => {
        console.log(selectedQuestion);
    }, [selectedQuestion]);

    const getQuestionAllFormatting = (
        listData: GetQuestionAllRes[]
    ): selectQuestion[] => {
        const newListData: selectQuestion[] = listData.map(
            (value: GetQuestionAllRes): selectQuestion => {
                return {
                    id: value.ID,
                    question: value.question,
                    genre: value.genre,
                    season: value.season,
                };
            }
        );
        return newListData;
    };

    const sendCreate = () => {
        if (selectQuestionName !== null && selectedQuestion.length !== 0) {
            adminSaveSelectQuestion({
                select_question_name: selectQuestionName,
                select_question_ids: selectedQuestion,
            }).then((res: any) => {
                console.log(res);
            });
        }
    };

    // maxWidth: "1450px", minWidth: "1450px"
    return (
        <div
            style={{
                height: "auto",
                width: "auto",
                maxWidth: "1450px",
                margin: "30px",
            }}
        >
            <DataGrid
                autoHeight
                rows={selectQuestionRow}
                columns={selectQuestionCol}
                pageSize={50}
                rowsPerPageOptions={[50]}
                checkboxSelection
                onSelectionModelChange={(newSelect: any) => {
                    setSelectedQuestion(newSelect);
                }}
            />
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "30px",
                    margin: "30px",
                    padding: "30px",
                }}
            >
                <TextField
                    id="standard-basic"
                    label="問題名"
                    variant="standard"
                    onChange={(e: any) => {
                        setSelectQuestionName(e.target.value);
                        console.log(e.target.value);
                    }}
                />
                <Button variant="contained" onClick={sendCreate}>
                    Create
                </Button>
            </div>
        </div>
    );
};

export default React.memo(SelectQuestionComponent);
