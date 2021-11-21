import React, { useState, useEffect } from 'react'
import { AdminGetIDLogUserRes } from "../../apis/backendAPI/admin/interfaces";
import { useHistory } from "react-router";
import { DataGrid, GridColDef } from "@material-ui/data-grid";
import { GetSelectQuestionRes } from '../../apis/backendAPI/learning/interfaces';


interface SelectQuestionView {
    id: number;
    select_question_ids: string;
    select_question_name: string;
}

const SelectQuestionViewComponent: React.FC<{ selectQuestionData: any }> = ({ selectQuestionData }) => {
    const [selectQuestionViewCol, setSelectQuestionViewCol] = useState<GridColDef[]>([
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

    const [selectQuestionViewData, setSelectQuestionViewData] = useState<SelectQuestionView[]>([]);
    const history = useHistory();
    useEffect(() => {
        if (selectQuestionData !== undefined) {
            console.log("yonda");
            setSelectQuestionViewData(getSelectQuestionFormating(selectQuestionData.select_question));
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
        <div style={{ height: "50%", width: "auto", maxWidth: "700px" }}>
            {/* <DataGridNoRender></DataGridNoRender> */}
            {selectQuestionViewData.length ? (
                <DataGrid
                    rows={selectQuestionViewData}
                    columns={selectQuestionViewCol}
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
    )
}

export default SelectQuestionViewComponent