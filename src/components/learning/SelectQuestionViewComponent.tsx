import React, { useState, useEffect } from "react";
import { AdminGetIDLogUserRes } from "../../apis/backendAPI/admin/interfaces";
import { useHistory } from "react-router";
import { DataGrid, GridColDef } from "@material-ui/data-grid";
import {
    GetQuestionIdQuery,
    GetSelectQuestionRes,
} from "../../apis/backendAPI/learning/interfaces";
import { getQuestionIds } from "../../apis/backendAPI/learning/getQuestionIds";

interface SelectQuestionView {
    id: number;
    select_question_ids: string;
    select_question_name: string;
}

const SelectQuestionViewComponent: React.FC<{
    selectQuestionData: any;
    selectedQuestion: GetQuestionIdQuery;
}> = ({ selectQuestionData, selectedQuestion }) => {
    const [selectQuestionViewCol, setSelectQuestionViewCol] = useState<
        GridColDef[]
    >([
        {
            field: "id",
            headerName: "ID",
            width: 100,
        },
        {
            field: "select_question_name",
            headerName: "問題名",
            width: 300,
        },
        {
            field: "select_question_ids",
            headerName: "問題ID",
            width: 300,
        },
    ]);

    const [selectQuestionViewData, setSelectQuestionViewData] = useState<
        SelectQuestionView[]
    >([]);
    const history = useHistory();
    useEffect(() => {
        if (selectQuestionData.select_question !== null) {
            console.log("yonda");
            setSelectQuestionViewData(
                getSelectQuestionFormating(selectQuestionData.select_question)
            );
        }
    }, [selectQuestionData]);

    const getSelectQuestionFormating = (listData: GetSelectQuestionRes[]) => {
        console.log(listData);
        const newListData: SelectQuestionView[] = listData.map(
            (value: GetSelectQuestionRes): SelectQuestionView => {
                return {
                    id: value.ID,
                    select_question_name: value.select_question_name,
                    select_question_ids: value.select_question_ids,
                };
            }
        );
        return newListData;
    };

    return (
        <div
            style={{
                height: "500px",
                minWidth: "700px",
                maxWidth: "700px",
                margin: "30px",
            }}
        >
            {/* <DataGridNoRender></DataGridNoRender> */}
            {selectQuestionViewData.length ? (
                <DataGrid
                    rows={selectQuestionViewData}
                    columns={selectQuestionViewCol}
                    onRowClick={(params: any) => {
                        console.log(params);
                        selectedQuestion.select_question_id =
                            params.row.select_question_ids;
                    }}
                    // checkboxSelection
                    // onCellClick={(params: any) => {
                    //     // console.log(params);
                    //     // console.log(selectQuestionViewData);
                    //     // console.log(history.location);
                    //     // console.log(
                    //     //     history.location.pathname +
                    //     //         "/" +
                    //     //         params.row.question_list
                    //     // );
                    //     // history.push(
                    //     //     history.location.pathname +
                    //     //         "/" +
                    //     //         params.row.conc_data_id
                    //     // );
                    // }}
                />
            ) : (
                <div>nodata</div>
            )}
        </div>
    );
};

export default SelectQuestionViewComponent;
